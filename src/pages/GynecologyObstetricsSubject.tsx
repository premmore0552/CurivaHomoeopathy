import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Baby, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  ShieldAlert,
  BookMarked,
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Scissors,
  Flame,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { GynaeHeader } from '../components/gynaecology/GynaeHeader';
import { GynaePreambleOutcomes } from '../components/gynaecology/GynaePreambleOutcomes';
import { GynaeSyllabusViewer } from '../components/gynaecology/GynaeSyllabusViewer';
import { GynaeCompetencyMatrix } from '../components/gynaecology/GynaeCompetencyMatrix';
import { GynaeTherapeuticsGuide } from '../components/gynaecology/GynaeTherapeuticsGuide';
import { GynaeExaminationBlueprint } from '../components/gynaecology/GynaeExaminationBlueprint';
import { GynaeSafetyAndReferrals } from '../components/gynaecology/GynaeSafetyAndReferrals';
import { GynaeTextbooksAndFaqs } from '../components/gynaecology/GynaeTextbooksAndFaqs';

export default function GynecologyObstetricsSubject() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'syllabus' | 'competencies' | 'therapeutics' | 'examination' | 'safety' | 'textbooks'
  >('overview');

  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (
    tab: 'overview' | 'syllabus' | 'competencies' | 'therapeutics' | 'examination' | 'safety' | 'textbooks'
  ) => {
    setActiveTab(tab);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO 
        title="2nd BHMS Gynaecology & Obstetrics — Official NCH CBDC Curriculum & Therapeutics | Curiva Homoeopathy"
        description="Complete digital NCH Competency-Based Dynamic Curriculum (CBDC) for 2nd BHMS Gynaecology, Obstetrics, Neonatology, and Homoeopathic Therapeutics. Subject Code: HomUG-ObGy-I, revised 18-05-2024."
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/portal/2nd-bhms" className="hover:text-primary transition-colors">2nd BHMS</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-primary font-bold">Gynaecology & Obstetrics (HomUG-ObGy-I)</span>
      </div>

      {/* 1. HERO / HEADER */}
      <GynaeHeader 
        onExploreSyllabus={() => handleTabChange('syllabus')}
        onExploreCompetencies={() => handleTabChange('competencies')}
        onExploreTherapeutics={() => handleTabChange('therapeutics')}
      />

      {/* 2. STICKY / RESPONSIVE NAVIGATION TABS */}
      <div ref={contentRef} className="sticky top-20 z-30 bg-bg-primary/95 backdrop-blur-md py-3 border-b border-border">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'overview', label: 'Overview & Outcomes', icon: Building2 },
            { id: 'syllabus', label: 'Complete Syllabus', icon: BookOpen },
            { id: 'competencies', label: 'CBDC Competency Matrix', icon: ShieldCheck },
            { id: 'therapeutics', label: 'OBG Therapeutics Guide', icon: Activity },
            { id: 'examination', label: 'Exam Scheme & Instruments', icon: Award },
            { id: 'safety', label: 'Safety & Referral Protocols', icon: ShieldAlert },
            { id: 'textbooks', label: 'Textbooks & FAQs', icon: BookMarked }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-700 text-white shadow-md'
                    : 'bg-bg-secondary text-text-secondary hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-tertiary'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE TAB CONTENT VIEW */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaePreambleOutcomes />
            <GynaeSafetyAndReferrals />
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeSyllabusViewer />
          </div>
        )}

        {activeTab === 'competencies' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeCompetencyMatrix />
          </div>
        )}

        {activeTab === 'therapeutics' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeTherapeuticsGuide />
          </div>
        )}

        {activeTab === 'examination' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeExaminationBlueprint />
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeSafetyAndReferrals />
          </div>
        )}

        {activeTab === 'textbooks' && (
          <div className="space-y-10 animate-fadeIn">
            <GynaeTextbooksAndFaqs />
          </div>
        )}
      </div>

      {/* 4. FOOTER QUICK NAV */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-text-primary text-sm font-serif">
            Curiva BHMS Academic Knowledge Platform
          </div>
          <div>
            Derived from the official National Commission for Homoeopathy (NCH) Competency-Based Dynamic Curriculum (CBDC).
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/portal/2nd-bhms"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-bg-primary hover:bg-rose-500/10 border border-border rounded-xl font-bold text-text-primary transition-colors"
          >
            2nd BHMS Hub
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </Link>
          <Link
            to="/student-academy"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold shadow-md transition-colors"
          >
            Student Academy
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
