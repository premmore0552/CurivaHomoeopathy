import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, LayoutGrid, List } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import type { DiseaseSummary } from '../data/diseaseHubTypes';
import { DISEASE_SYSTEMS } from '../data/diseaseHubSystems';
import { loadDiseaseHubCatalog } from '../data/diseaseHubAssets';
import { DiseaseCard } from '../components/disease-hub/DiseaseCard';
import { Link, useNavigate } from 'react-router-dom';

const DiseaseDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'priority'>('name');
  const [diseases, setDiseases] = useState<DiseaseSummary[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [catalogAttempt, setCatalogAttempt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    setCatalogError('');
    setCatalogLoading(true);
    loadDiseaseHubCatalog()
      .then((catalog) => {
        if (active) setDiseases(catalog.diseases);
      })
      .catch((error: unknown) => {
        if (active) setCatalogError(error instanceof Error ? error.message : 'The disease directory could not be loaded.');
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });
    return () => { active = false; };
  }, [catalogAttempt]);

  const filteredDiseases = useMemo(() => {
    let result = [...diseases];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.simpleExplanation.toLowerCase().includes(q) ||
        d.system.toLowerCase().includes(q)
      );
    }

    if (selectedSystem) {
      result = result.filter(d => d.system === selectedSystem);
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      result.sort((a, b) => priorityMap[b.examPriority] - priorityMap[a.examPriority]);
    }

    return result;
  }, [diseases, searchQuery, selectedSystem, sortBy]);

  return (
    <>
      <SEO title="Disease Directory | Curiva Homoeopathy" description="Explore our comprehensive database of medical conditions categorized by clinical system." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs />
        
        <div className="mt-12 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary uppercase tracking-tight">
              Disease <span className="text-primary italic">Directory</span>
            </h1>
            <p className="text-sm font-bold text-text-secondary max-w-2xl leading-relaxed">
              Explore our comprehensive database of medical conditions, categorized by clinical system and prioritized for academic excellence.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search diseases, symptoms, or systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white dark:bg-zinc-900 border border-border focus:border-primary rounded-xl text-sm font-bold outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <select
                value={selectedSystem || ''}
                onChange={(e) => setSelectedSystem(e.target.value || null)}
                className="bg-white dark:bg-zinc-900 border border-border rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all"
              >
                <option value="">All Systems</option>
                {DISEASE_SYSTEMS.map(sys => (
                  <option key={sys.id} value={sys.id}>{sys.name}</option>
                ))}
              </select>

              <div className="flex bg-bg-secondary p-1 rounded-xl border border-border">
                <button
                  onClick={() => setSortBy('name')}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${sortBy === 'name' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-primary'}`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => setSortBy('priority')}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${sortBy === 'priority' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-primary'}`}
                >
                  Priority
                </button>
              </div>
            </div>
          </div>

          {catalogLoading && <p className="text-xs text-text-secondary" role="status">Loading disease index…</p>}
          {catalogError && (
            <div role="alert" className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-red-500/25 bg-red-500/5 p-3 text-xs text-red-600">
              <span>{catalogError}</span>
              <button type="button" onClick={() => setCatalogAttempt((attempt) => attempt + 1)} className="font-bold underline underline-offset-2">Retry disease index</button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <DiseaseCard 
                key={`${disease.system}/${disease.slug}`} 
                disease={disease} 
                onClick={(system, slug) => navigate(`/disease-hub/${system}/${slug}`)}
              />
            ))}
          </div>

          {!catalogLoading && !catalogError && filteredDiseases.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <p className="text-sm font-bold text-text-secondary">No diseases found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DiseaseDirectory;
