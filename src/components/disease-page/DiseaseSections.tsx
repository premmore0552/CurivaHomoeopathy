import React from 'react';
import { ArrowDown, AlertCircle, ShieldAlert, Stethoscope, Beaker, Pill, Activity, ChevronRight, Zap } from 'lucide-react';
import { Disease, InvestigationItem } from '../../data/diseaseHubData';
import { Link } from 'react-router-dom';

interface SectionProps {
  disease: Disease;
}

// --- DEFINITION ---
export const SectionDefinition: React.FC<SectionProps> = ({ disease }) => (
  <section id="definition" className="scroll-mt-32 space-y-8">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">02. Definition</h2>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Standard Medical Definition</h4>
          <p className="text-xl font-serif italic text-text-primary leading-relaxed">
            "{disease.definition}"
          </p>
        </div>
        
        <div className="p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">Simple Explanation</h4>
          <p className="text-base font-bold text-text-secondary leading-relaxed">
            {disease.simpleExplanation}
          </p>
        </div>
      </div>

      {disease.examKeywords && (
        <div className="p-8 border-2 border-dashed border-border rounded-3xl">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-text-primary mb-6 flex items-center gap-2">
            <Beaker className="w-4 h-4" />
            Exam Keywords for Recall
          </h4>
          <div className="flex flex-wrap gap-3">
            {(disease.examKeywords || []).map((kw, i) => (
              <span key={i} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-text-primary text-xs font-black uppercase tracking-widest rounded-xl border border-border">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

// --- ETIOLOGY ---
export const SectionEtiology: React.FC<SectionProps> = ({ disease }) => (
  <section id="etiology" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">04. Etiology</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <EtiologyCard 
        title="Predisposing Factors" 
        items={disease.etiology.predisposingFactors} 
        icon={Activity}
        color="text-blue-500"
      />
      <EtiologyCard 
        title="Precipitating Factors" 
        items={disease.etiology.precipitatingFactors} 
        icon={Zap}
        color="text-amber-500"
      />
      <EtiologyCard 
        title="Risk Factors" 
        items={disease.etiology.riskFactors} 
        icon={AlertCircle}
        color="text-rose-500"
      />
    </div>
  </section>
);

const EtiologyCard = ({ title, items, icon: Icon, color }: any) => (
  <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl hover:border-primary transition-all">
    <div className={`mb-6 ${color}`}>
      <Icon className="w-8 h-8" />
    </div>
    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-primary mb-6">{title}</h4>
    <ul className="space-y-4">
      {(items || []).map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm font-bold text-text-secondary leading-relaxed">
          <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${color.replace('text-', 'bg-')}`}></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- PATHOPHYSIOLOGY ---
export const SectionPathophysiology: React.FC<SectionProps> = ({ disease }) => (
  <section id="pathophysiology" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">06. Pathophysiology</h2>
    </div>

    <div className="relative space-y-6">
      {(disease.pathophysiology.steps || []).map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-start gap-8 group">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform z-10">
                {i + 1}
              </div>
              {i < (disease.pathophysiology.steps || []).length - 1 && (
                <div className="w-0.5 h-24 bg-gradient-to-b from-primary to-transparent"></div>
              )}
            </div>
            <div className="flex-1 pt-2">
              <h4 className="text-lg font-display font-black uppercase tracking-tight text-text-primary mb-2">
                {step.title}
              </h4>
              <p className="text-base font-bold text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
          {i < (disease.pathophysiology.steps || []).length - 1 && (
            <div className="flex justify-center py-4 text-primary/30">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
);

// --- CLINICAL FEATURES ---
export const SectionClinicalFeatures: React.FC<SectionProps> = ({ disease }) => (
  <section id="clinical-features" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">08. Clinical Features</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <FeatureBlock title="General Symptoms" items={disease.clinicalFeatures.generalSymptoms} color="blue" />
        <FeatureBlock title="Local Symptoms" items={disease.clinicalFeatures.localSymptoms} color="purple" />
      </div>
      <div className="space-y-8">
        <FeatureBlock title="Constitutional Features" items={disease.clinicalFeatures.constitutionalFeatures} color="amber" />
        <FeatureBlock title="Important Physical Signs" items={disease.clinicalFeatures.importantSigns} color="emerald" />
      </div>
    </div>

    {disease.clinicalFeatures.diseaseProgression && (
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Disease Progression & Natural History
        </h4>
        <p className="text-base font-bold text-zinc-400 leading-relaxed italic">
          {disease.clinicalFeatures.diseaseProgression}
        </p>
      </div>
    )}
  </section>
);

const FeatureBlock = ({ title, items, color }: any) => (
  <div className="p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl">
    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-${color}-500`}>
      <span className={`w-2 h-2 rounded-full bg-${color}-500`}></span>
      {title}
    </h4>
    <ul className="grid grid-cols-1 gap-4">
      {(items || []).map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm font-bold text-text-primary leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-border/50">
          <ChevronRight className={`w-4 h-4 mt-0.5 text-${color}-500`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- RED FLAGS ---
export const SectionRedFlags: React.FC<SectionProps> = ({ disease }) => (
  <section id="red-flags" className="scroll-mt-32">
    <div className="p-10 bg-rose-600 rounded-[2.5rem] text-white shadow-2xl shadow-rose-600/30 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
        <ShieldAlert className="w-48 h-48" />
      </div>
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-display font-black uppercase tracking-tight italic">🚨 Red Flags & Warnings</h2>
        </div>

        <p className="text-rose-100 font-bold mb-10 max-w-2xl text-lg leading-relaxed">
          The following clinical situations require urgent medical assessment and potentially life-saving interventions. Do not delay professional care.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(disease.redFlags || []).map((flag, i) => (
            <div key={i} className="p-6 bg-white/10 border border-white/20 rounded-2xl flex gap-4 items-start backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-full mt-2.5 shrink-0"></div>
              <span className="text-base font-black tracking-tight leading-tight uppercase">{flag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- INVESTIGATIONS ---
export const SectionInvestigations: React.FC<SectionProps> = ({ disease }) => (
  <section id="investigations" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">10. Investigations</h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-100 dark:bg-zinc-800/50">
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Type</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Investigation</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Expected Findings</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Clinical Importance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {disease.investigations.goldStandard && (
            <InvestigationRow type="Gold Standard" item={disease.investigations.goldStandard} highlight />
          )}
          {disease.investigations.screening?.map((item, i) => (
            <InvestigationRow key={i} type="Screening" item={item} />
          ))}
          {disease.investigations.diagnostic?.map((item, i) => (
            <InvestigationRow key={i} type="Diagnostic" item={item} />
          ))}
          {disease.investigations.confirmatory?.map((item, i) => (
            <InvestigationRow key={i} type="Confirmatory" item={item} />
          ))}
          {disease.investigations.laboratoryFindings?.map((item, i) => (
            <InvestigationRow key={i} type="Laboratory" item={item} />
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const InvestigationRow = ({ type, item, highlight }: { type: string, item: InvestigationItem, highlight?: boolean }) => (
  <tr className={`${highlight ? 'bg-primary/5' : ''} hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors`}>
    <td className="p-4 align-top">
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${highlight ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
        {type}
      </span>
    </td>
    <td className="p-4 align-top font-black text-sm text-text-primary">{item.name}</td>
    <td className="p-4 align-top text-sm font-bold text-text-secondary italic">"{item.findings}"</td>
    <td className="p-4 align-top text-sm font-bold text-text-secondary leading-relaxed">{item.importance}</td>
  </tr>
);

// --- DIFFERENTIAL DIAGNOSIS ---
export const SectionDifferentialDiagnosis: React.FC<SectionProps> = ({ disease }) => (
  <section id="differential-diagnosis" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">12. Differential Diagnosis</h2>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {(disease.differentialDiagnosis || []).map((dd, i) => (
        <div key={i} className="group p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl flex flex-col md:flex-row items-center gap-8 hover:border-primary transition-all">
          <div className="flex-1">
            <h4 className="text-xl font-display font-black uppercase tracking-tight text-text-primary mb-3">
              {dd.condition}
            </h4>
            <p className="text-base font-bold text-text-secondary leading-relaxed">
              {dd.distinguishingFeatures}
            </p>
          </div>
          {dd.slug ? (
            <Link 
              to={`/disease-hub/${disease.system}/${dd.slug}`} 
              className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-text-primary text-xs font-black uppercase tracking-widest rounded-xl border border-border hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 group/btn"
            >
              Compare Case
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          ) : (
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-border px-4 py-2 rounded-xl italic">
               Study Link Pending
             </span>
          )}
        </div>
      ))}
    </div>
  </section>
);

// --- MANAGEMENT ---
export const SectionManagement: React.FC<SectionProps> = ({ disease }) => (
  <section id="management" className="scroll-mt-32 space-y-12">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">14. Conventional Management</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <ManagementBlock title="General Management" items={disease.conventionalManagement.general} icon={Stethoscope} />
        <ManagementBlock title="Medical Management" items={disease.conventionalManagement.medical} icon={Pill} />
      </div>
      <div className="space-y-8">
        {disease.conventionalManagement.emergency && (
          <ManagementBlock title="Emergency / Acute Management" items={disease.conventionalManagement.emergency} icon={AlertCircle} isEmergency />
        )}
        <ManagementBlock title="Prevention & Lifestyle" items={disease.conventionalManagement.prevention} icon={ShieldAlert} />
      </div>
    </div>
  </section>
);

const ManagementBlock = ({ title, items, icon: Icon, isEmergency }: any) => (
  <div className={`p-8 border rounded-3xl ${isEmergency ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900/30' : 'bg-zinc-50 dark:bg-zinc-900 border-border'}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEmergency ? 'bg-rose-500 text-white' : 'bg-primary/10 text-primary'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className={`text-[10px] font-black uppercase tracking-widest ${isEmergency ? 'text-rose-600' : 'text-text-primary'}`}>{title}</h4>
    </div>
    <ul className="space-y-4">
      {(items || []).map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm font-bold text-text-secondary leading-relaxed">
          <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isEmergency ? 'bg-rose-500' : 'bg-primary'}`}></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);
