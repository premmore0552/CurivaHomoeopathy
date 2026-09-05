import React, { useMemo, useEffect } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { diseaseHubData, DISEASE_SYSTEMS } from '../data/diseaseHubData';
import { DiseaseHero } from '../components/disease-page/DiseaseHero';
import { DiseaseTOC } from '../components/disease-page/DiseaseTOC';
import { AtAGlance } from '../components/disease-page/AtAGlance';
import { 
  SectionDefinition, 
  SectionEtiology, 
  SectionPathophysiology, 
  SectionClinicalFeatures, 
  SectionRedFlags, 
  SectionInvestigations, 
  SectionDifferentialDiagnosis, 
  SectionManagement 
} from '../components/disease-page/DiseaseSections';
import { SectionHomoeopathy, RelatedContent } from '../components/disease-page/DiseaseHomoeopathy';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AccordionSection } from '../components/ui/Accordion';
import { trackView } from '../lib/history';

const DiseasePage: React.FC = () => {
  const { systemSlug, diseaseSlug } = useParams();
  const location = useLocation();
  
  const disease = useMemo(() => {
    return diseaseHubData.find(d => d.slug === diseaseSlug);
  }, [diseaseSlug]);

  useEffect(() => {
    if (disease) {
      trackView(disease.id || disease.slug, disease.name, 'Therapeutics', location.pathname);
    }
  }, [disease, location.pathname]);

  const system = useMemo(() => {
    return DISEASE_SYSTEMS.find(s => s.id === systemSlug);
  }, [systemSlug]);

  if (!disease) {
    return <Navigate to="/disease-hub" replace />;
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <SEO 
        title={`${disease.name} | Study Guide | Curiva Homoeopathy`} 
        description={disease.simpleExplanation}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -ml-64 -mb-64"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Breadcrumbs />
          <Link 
            to={`/diseases/${systemSlug}`}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to {system?.name || 'Category'}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <DiseaseHero disease={disease} />
            
            <AtAGlance disease={disease} />

            <div className="mt-16 space-y-0">
              <AccordionSection title="Definition" number="02" defaultOpen={true}>
                <SectionDefinition disease={disease} />
              </AccordionSection>

              <AccordionSection title="Epidemiology" number="03" id="epidemiology">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <EpidemiologyItem label="Age Distribution" value={disease.epidemiology.ageDistribution} />
                  <EpidemiologyItem label="Sex Distribution" value={disease.epidemiology.sexDistribution} />
                  <EpidemiologyItem label="Risk Groups" value={(disease.epidemiology.riskGroups || []).join(', ')} />
                  <EpidemiologyItem label="Public Health" value={disease.epidemiology.publicHealthRelevance || 'Significant global impact'} />
                </div>
              </AccordionSection>

              <AccordionSection title="Etiology" number="04" id="etiology">
                <SectionEtiology disease={disease} />
              </AccordionSection>

              <AccordionSection title="Risk Factors" number="05" id="risk-factors">
                <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(disease.etiology.riskFactors || []).map((rf, i) => (
                      <li key={i} className="flex gap-3 text-sm font-bold text-text-primary uppercase tracking-tight">
                        <span className="text-primary">•</span>
                        {rf}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionSection>

              <AccordionSection title="Pathophysiology" number="06" id="pathophysiology">
                <SectionPathophysiology disease={disease} />
              </AccordionSection>

              {disease.classification && (
                <AccordionSection title="Classification" number="07" id="classification">
                  <div className="p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">{disease.classification.type}</h4>
                    
                    {disease.classification.table ? (
                      <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-border rounded-xl overflow-hidden">
                          <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                              {disease.classification.table.headers.map((header, i) => (
                                <th key={i} className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary border border-border">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {disease.classification.table.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                {row.map((cell, j) => (
                                  <td key={j} className="p-4 text-sm font-bold text-text-primary border border-border">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : Array.isArray(disease.classification.details) ? (
                      <ul className="space-y-4">
                        {(disease.classification?.details || []).map((d, i) => (
                          <li key={i} className="text-base font-bold text-text-secondary border-b border-border/50 pb-4 last:border-0">{d}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base font-bold text-text-secondary leading-relaxed">{disease.classification.details}</p>
                    )}
                  </div>
                </AccordionSection>
              )}

              <AccordionSection title="Clinical Features" number="08" id="clinical-features">
                <SectionClinicalFeatures disease={disease} />
              </AccordionSection>

              <AccordionSection title="Red Flags" number="09" id="red-flags">
                <SectionRedFlags disease={disease} />
              </AccordionSection>

              <AccordionSection title="Investigations" number="10" id="investigations">
                <SectionInvestigations disease={disease} />
              </AccordionSection>

              <AccordionSection title="Diagnosis" number="11" id="diagnosis">
                <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
                  <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary mb-6">{disease.diagnosticCriteria.title}</h3>
                  <ul className="space-y-4 mb-8">
                    {(disease.diagnosticCriteria.criteria || []).map((c, i) => (
                      <li key={i} className="flex gap-4 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-border text-sm font-bold text-text-secondary">
                        <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-black text-[10px] shrink-0">{i + 1}</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  {disease.diagnosticCriteria.pitfalls && (
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Common Diagnostic Pitfalls</h4>
                      <p className="text-xs font-bold text-amber-700 leading-relaxed">{disease.diagnosticCriteria.pitfalls.join(', ')}</p>
                    </div>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection title="Differential Diagnosis" number="12" id="differential-diagnosis">
                <SectionDifferentialDiagnosis disease={disease} />
              </AccordionSection>

              <AccordionSection title="Complications" number="13" id="complications">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ComplicationCard title="Common" items={disease.complications.common} color="blue" />
                  <ComplicationCard title="Serious" items={disease.complications.serious} color="amber" />
                  <ComplicationCard title="Life-Threatening" items={disease.complications.lifeThreatening} color="rose" />
                </div>
              </AccordionSection>

              <AccordionSection title="Management" number="14" id="management">
                <SectionManagement disease={disease} />
              </AccordionSection>

              <AccordionSection title="Homoeopathic Therapeutics" number="15" id="homoeopathy">
                <SectionHomoeopathy disease={disease} />
              </AccordionSection>

              {disease.clinicalCase && (
                <AccordionSection title="Clinical Case Study" number="18" id="case">
                  <div className="p-10 bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">Presentation</h4>
                        <p className="text-lg font-serif italic text-text-primary leading-relaxed">"{disease.clinicalCase.presentation}"</p>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Analysis</h4>
                          <p className="text-sm font-bold text-text-secondary leading-relaxed">{disease.clinicalCase.analysis}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Management</h4>
                          <p className="text-sm font-bold text-text-secondary leading-relaxed">{disease.clinicalCase.management}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionSection>
              )}
            </div>

            <section id="revision" className="scroll-mt-32 pt-16">
               <div className="p-8 bg-primary rounded-3xl text-white text-center">
                 <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-4 italic">20. One-Minute Revision</h2>
                 <p className="text-lg font-black tracking-tight leading-tight uppercase max-w-2xl mx-auto">
                   {(disease.name || 'This')} is a {(disease.category || '').toLowerCase()} condition of the {(disease.system || '').toLowerCase()} characterized by {(disease.clinicalFeatures.localSymptoms?.[0] || '').toLowerCase()}. Key remedies include {disease.relatedRemedies?.[0]?.name}.
                 </p>
               </div>
            </section>

            <RelatedContent disease={disease} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            <DiseaseTOC />
            
            {/* Quick Actions */}
            <div className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-2xl space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Study Aids</h4>
              <button className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-left flex items-center justify-between">
                Download PDF Guide
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-left flex items-center justify-between">
                Practice MCQs
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const EpidemiologyItem = ({ label, value }: { label: string, value: string }) => (
  <div className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-2xl">
    <span className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">{label}</span>
    <span className="block text-sm font-black text-text-primary">{value}</span>
  </div>
);

const ComplicationCard = ({ title, items, color }: any) => (
  <div className={`p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl relative overflow-hidden group hover:border-${color}-500 transition-all`}>
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-6">{title}</h4>
    <ul className="space-y-4">
      {items && items.length > 0 ? items.map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm font-bold text-text-primary leading-relaxed">
          <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-${color}-500`}></div>
          {item}
        </li>
      )) : <li className="text-xs font-bold text-text-secondary italic">None documented</li>}
    </ul>
  </div>
);

export default DiseasePage;
