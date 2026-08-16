import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  GraduationCap, 
  Award, 
  Link as LinkIcon, 
  ChevronRight,
  ShieldCheck,
  Target,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { NchCompetency, NchSection, NchPriority, AssessmentMethod } from '../../types/pathology';
import { allNchPathologyCompetencies } from '../../data/nchPathologyCurriculum';

interface NchCurriculumExplorerProps {
  onSelectCompetency: (competency: NchCompetency) => void;
}

export const NchCurriculumExplorer: React.FC<NchCurriculumExplorerProps> = ({
  onSelectCompetency
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAssessment, setSelectedAssessment] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Filter logic
  const filteredCompetencies = useMemo(() => {
    return allNchPathologyCompetencies.filter((comp) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = comp.code.toLowerCase().includes(q);
        const matchDomain = comp.domainName.toLowerCase().includes(q);
        const matchStatement = comp.competencyStatement.toLowerCase().includes(q);
        const matchContent = comp.content.toLowerCase().includes(q);
        const matchSlos = comp.sloList.some(s => s.toLowerCase().includes(q));
        if (!matchCode && !matchDomain && !matchStatement && !matchContent && !matchSlos) {
          return false;
        }
      }

      // 2. Section
      if (selectedSection !== 'all' && comp.section !== selectedSection) {
        return false;
      }

      // 3. Priority
      if (selectedPriority !== 'all' && comp.priority !== selectedPriority) {
        return false;
      }

      // 4. Assessment
      if (selectedAssessment !== 'all') {
        if (!comp.assessmentMethods.includes(selectedAssessment as AssessmentMethod)) {
          return false;
        }
      }

      // 5. Integration
      if (selectedIntegration !== 'all') {
        const horizontal = comp.integration.horizontal || [];
        const vertical = comp.integration.vertical || [];
        const combined = [...horizontal, ...vertical];
        if (!combined.some(item => item.toLowerCase().includes(selectedIntegration.toLowerCase()))) {
          return false;
        }
      }

      // 6. Tag (Official vs Supplementary)
      if (selectedTag === 'official' && !comp.official) return false;
      if (selectedTag === 'supplementary' && comp.official) return false;

      return true;
    });
  }, [searchQuery, selectedSection, selectedPriority, selectedAssessment, selectedIntegration, selectedTag]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSection('all');
    setSelectedPriority('all');
    setSelectedAssessment('all');
    setSelectedIntegration('all');
    setSelectedTag('all');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header and Search */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              NCH Competency Based Dynamic Curriculum (CBDC)
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Explore NCH Pathology Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Search by competency code (e.g. <span className="font-mono text-red-700 dark:text-red-400 font-bold">HomUG-PM I.6</span>), domain topic, SLOs, or assessment tags.
            </p>
          </div>

          <div className="text-xs font-mono px-3 py-2 bg-bg-primary border border-border rounded-xl text-text-secondary self-start md:self-auto">
            Showing <span className="font-bold text-text-primary">{filteredCompetencies.length}</span> of {allNchPathologyCompetencies.length} competencies
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code (e.g., HomUG-PM I.10, HomUG-PM II.3), topic, necrosis, inflammation, IHD, jaundice..."
            className="w-full pl-12 pr-4 py-3.5 bg-bg-primary border border-border rounded-2xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-red-800/40 focus:border-red-800 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary"
            >
              Clear
            </button>
          )}
        </div>

        {/* Multi-Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Section Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-tertiary uppercase">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-red-800"
            >
              <option value="all">All Sections (General + Systemic + Practical)</option>
              <option value="general">General Pathology (Paper I Sec A)</option>
              <option value="systemic">Systemic Pathology (Paper I Sec B)</option>
              <option value="practical">Pathology Practical</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-tertiary uppercase">NCH Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-red-800"
            >
              <option value="all">All Priorities</option>
              <option value="Must Know">Must Know (Core)</option>
              <option value="Knowledge">Knowledge</option>
              <option value="Higher-level knowledge">Higher-level knowledge</option>
            </select>
          </div>

          {/* Assessment Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-tertiary uppercase">Assessment Type</label>
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-red-800"
            >
              <option value="all">All Assessment Types</option>
              <option value="LAQ">LAQ (Long Answer Question)</option>
              <option value="SAQ">SAQ (Short Answer Question)</option>
              <option value="MCQ">MCQ (Multiple Choice Question)</option>
              <option value="Viva voce">Viva Voce</option>
              <option value="OSPE">OSPE (Practical Station)</option>
              <option value="Practical">Practical Examination</option>
            </select>
          </div>

          {/* Integration Subject Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-tertiary uppercase">Integration</label>
            <select
              value={selectedIntegration}
              onChange={(e) => setSelectedIntegration(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-red-800"
            >
              <option value="all">All Subject Integrations</option>
              <option value="Practice of Medicine">Practice of Medicine</option>
              <option value="Surgery">Surgery</option>
              <option value="Physiology">Physiology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Microbiology">Microbiology</option>
              <option value="Homoeopathic Materia Medica">Materia Medica</option>
              <option value="Organon">Organon & Philosophy</option>
            </select>
          </div>

          {/* Content Tag Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-tertiary uppercase">Content Tag</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-red-800"
            >
              <option value="all">All Tags (Official + Supplementary)</option>
              <option value="official">NCH CURRICULUM (Official)</option>
              <option value="supplementary">SUPPLEMENTARY (Concept Builder)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {(selectedSection !== 'all' || selectedPriority !== 'all' || selectedAssessment !== 'all' || selectedIntegration !== 'all' || selectedTag !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between pt-2 border-t border-border/80 text-xs">
            <span className="text-text-secondary">Active filters applied</span>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-red-700 dark:text-red-400 font-bold hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* 2. Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCompetencies.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onSelectCompetency(comp)}
            className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-lg hover:border-red-800/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Top Badges */}
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-red-800 text-white tracking-wider">
                    {comp.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    NCH CURRICULUM
                  </span>
                  <span className="px-2 py-0.5 bg-bg-primary border border-border text-text-tertiary text-[10px] font-semibold rounded">
                    {comp.section.toUpperCase()}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-[10px] font-bold rounded">
                  {comp.priority}
                </span>
              </div>

              {/* Domain Name */}
              <h3 className="text-lg font-serif font-bold text-text-primary group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors">
                {comp.domainName}
              </h3>

              {/* Statement Preview */}
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {comp.competencyStatement}
              </p>

              {/* Specific Objectives Count & Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px] text-text-tertiary">
                <span className="flex items-center gap-1 font-semibold text-text-secondary">
                  <Target className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                  {comp.sloList.length} Specific Learning Objectives
                </span>
                <span>•</span>
                <span>Miller: <strong className="text-text-primary">{comp.millerLevel}</strong></span>
                <span>•</span>
                <span>Bloom: <strong className="text-text-primary">{comp.bloomLevel}</strong></span>
              </div>

              {/* Assessment Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {comp.assessmentMethods.map((m, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-bg-primary border border-border text-[10px] font-medium text-text-secondary rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-amber-700 dark:text-amber-400 font-semibold text-[11px]">
                ● Status: {comp.contentStatus}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-red-800 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                View Full Competency & SLOs
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCompetencies.length === 0 && (
        <div className="text-center py-16 bg-bg-secondary rounded-3xl border border-border space-y-3">
          <BookOpen className="w-10 h-10 text-text-tertiary mx-auto opacity-50" />
          <h3 className="text-base font-bold text-text-primary">No competencies matched your filter</h3>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Try adjusting your search terms or clearing the active filters to see all official NCH curriculum nodes.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-red-800 text-white text-xs font-bold rounded-xl mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
