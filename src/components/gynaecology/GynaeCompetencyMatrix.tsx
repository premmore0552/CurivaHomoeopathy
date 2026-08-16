import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Layers, 
  BookOpen, 
  Baby, 
  Tag, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { nchGynaeCompetencies, NchGynaeCompetency } from '../../data/nchGynecologyCurriculum';

export function GynaeCompetencyMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<'all' | 'unit1' | 'unit2'>('all');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<'all' | 'Cognitive' | 'Psychomotor' | 'Affective'>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | 'K' | 'KH' | 'SH' | 'P'>('all');

  const filteredCompetencies = nchGynaeCompetencies.filter(comp => {
    // Unit filter
    if (selectedUnitFilter === 'unit1' && comp.unit !== 'Unit 1: Gynaecology') return false;
    if (selectedUnitFilter === 'unit2' && comp.unit !== 'Unit 2: Obstetrics & Newborn Care') return false;

    // Domain filter
    if (selectedDomainFilter !== 'all' && comp.domain !== selectedDomainFilter) return false;

    // Level filter
    if (selectedLevelFilter !== 'all' && comp.level !== selectedLevelFilter) return false;

    // Search query
    const q = searchQuery.toLowerCase();
    return (
      comp.code.toLowerCase().includes(q) ||
      comp.topic.toLowerCase().includes(q) ||
      comp.specificLearningObjective.toLowerCase().includes(q) ||
      comp.teachingLearningMethods.some(m => m.toLowerCase().includes(q)) ||
      comp.assessmentMethods.some(a => a.toLowerCase().includes(q)) ||
      (comp.horizontalIntegration && comp.horizontalIntegration.some(h => h.toLowerCase().includes(q))) ||
      (comp.verticalIntegration && comp.verticalIntegration.some(v => v.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="w-4 h-4" />
              NCH Competency Matrix
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Competency-Based Dynamic Learning Objectives
            </h2>
            <p className="text-xs text-text-secondary">
              Official mapping of competencies, domains, Guilbert levels (K/KH/SH/P), T-L methods, assessment, and subject integrations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 rounded-full text-xs font-bold">
              {filteredCompetencies.length} Competencies Displayed
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, topic, objective..."
              className="w-full pl-9 pr-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Unit Filter */}
          <div>
            <select
              value={selectedUnitFilter}
              onChange={(e) => setSelectedUnitFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">All Units (Gynae & Obs)</option>
              <option value="unit1">Unit 1: Gynaecology</option>
              <option value="unit2">Unit 2: Obstetrics & Newborn</option>
            </select>
          </div>

          {/* Domain Filter */}
          <div>
            <select
              value={selectedDomainFilter}
              onChange={(e) => setSelectedDomainFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">All Domains (Cognitive / Psychomotor / Affective)</option>
              <option value="Cognitive">Cognitive (Knowledge)</option>
              <option value="Psychomotor">Psychomotor (Skills)</option>
              <option value="Affective">Affective (Attitudes/Ethics)</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">All Guilbert Levels (K, KH, SH, P)</option>
              <option value="K">K - Knows</option>
              <option value="KH">KH - Knows How</option>
              <option value="SH">SH - Shows How</option>
              <option value="P">P - Performs</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-text-secondary">
          <span className="font-bold text-text-primary">Legend:</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">Cognitive (Knowledge)</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">Psychomotor (Hands-on Skill)</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold">Affective (Counseling/Ethics)</span>
          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold">Core (Mandatory)</span>
        </div>
      </div>

      {/* Desktop/Tablet Table Layout with Mobile Horizontal Scroll */}
      <div className="bg-bg-secondary border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-bg-primary border-b border-border text-[11px] font-bold text-text-primary uppercase tracking-wider">
                <th className="p-4 w-28">Code</th>
                <th className="p-4 w-44">Topic & Unit</th>
                <th className="p-4">Specific Learning Objective (SLO)</th>
                <th className="p-4 w-28">Domain & Level</th>
                <th className="p-4 w-44">Teaching-Learning</th>
                <th className="p-4 w-36">Assessment</th>
                <th className="p-4 w-48">Integration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {filteredCompetencies.map((comp) => (
                <tr 
                  key={comp.code} 
                  className="hover:bg-primary/5 transition-colors"
                >
                  {/* Code */}
                  <td className="p-4 align-top">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold rounded-lg border border-primary/20 whitespace-nowrap block text-center">
                      {comp.code}
                    </span>
                    {comp.core && (
                      <span className="block text-center mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        CORE
                      </span>
                    )}
                  </td>

                  {/* Topic & Unit */}
                  <td className="p-4 align-top">
                    <div className="font-bold text-text-primary font-serif">{comp.topic}</div>
                    <div className="text-[11px] text-text-tertiary mt-0.5">
                      {comp.unit.includes('Unit 1') ? 'Unit 1 (Gynae)' : 'Unit 2 (Obstetrics)'}
                    </div>
                  </td>

                  {/* Specific Learning Objective */}
                  <td className="p-4 align-top text-text-secondary leading-relaxed">
                    {comp.specificLearningObjective}
                    {comp.homoeopathicTherapeuticsLink && (
                      <div className="mt-2 p-2 bg-purple-500/5 rounded-lg border border-purple-500/20 text-[11px] text-purple-700 dark:text-purple-300">
                        <strong>Homoeopathy Link:</strong> {comp.homoeopathicTherapeuticsLink}
                      </div>
                    )}
                  </td>

                  {/* Domain & Level */}
                  <td className="p-4 align-top space-y-1.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      comp.domain === 'Cognitive' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' :
                      comp.domain === 'Psychomotor' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' :
                      'bg-purple-500/10 text-purple-700 dark:text-purple-300'
                    }`}>
                      {comp.domain}
                    </span>
                    <div className="text-[11px] font-semibold text-text-tertiary">
                      Level: <strong className="text-text-primary">{comp.level}</strong>
                    </div>
                  </td>

                  {/* Teaching Learning Methods */}
                  <td className="p-4 align-top text-text-secondary">
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {comp.teachingLearningMethods.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </td>

                  {/* Assessment */}
                  <td className="p-4 align-top text-text-secondary">
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {comp.assessmentMethods.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </td>

                  {/* Integration */}
                  <td className="p-4 align-top text-[11px] space-y-1">
                    {comp.horizontalIntegration && (
                      <div>
                        <span className="text-text-tertiary block font-semibold text-[10px] uppercase">Horizontal:</span>
                        <span className="text-text-secondary">{comp.horizontalIntegration.join(', ')}</span>
                      </div>
                    )}
                    {comp.verticalIntegration && (
                      <div className="mt-1">
                        <span className="text-text-tertiary block font-semibold text-[10px] uppercase">Vertical:</span>
                        <span className="text-primary font-medium">{comp.verticalIntegration.join(', ')}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
