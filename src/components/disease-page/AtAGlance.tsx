import React from 'react';
import { Info, Users, AlertCircle, HeartPulse, Microscope, ShieldAlert, Zap } from 'lucide-react';
import { Disease } from '../../data/diseaseHubData';

interface AtAGlanceProps {
  disease: Disease;
}

export const AtAGlance: React.FC<AtAGlanceProps> = ({ disease }) => {
  return (
    <div id="glance" className="scroll-mt-32 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard 
          icon={Info} 
          title="Definition" 
          content={disease.definition} 
          color="text-blue-500" 
          bg="bg-blue-500/10"
        />
        <SummaryCard 
          icon={Users} 
          title="Common Age Group" 
          content={disease.epidemiology.ageDistribution} 
          color="text-purple-500" 
          bg="bg-purple-500/10"
        />
        <SummaryCard 
          icon={AlertCircle} 
          title="Hallmark Symptoms" 
          content={(disease.clinicalFeatures.localSymptoms || []).join(', ')} 
          color="text-amber-500" 
          bg="bg-amber-500/10"
        />
        <SummaryCard 
          icon={HeartPulse} 
          title="Important Risk Factors" 
          content={(disease.etiology.riskFactors || []).slice(0, 3).join(', ')} 
          color="text-rose-500" 
          bg="bg-rose-500/10"
        />
        <SummaryCard 
          icon={Microscope} 
          title="Key Investigations" 
          content={disease.investigations.goldStandard?.name || 'Clinical Diagnosis'} 
          color="text-emerald-500" 
          bg="bg-emerald-500/10"
        />
        <SummaryCard 
          icon={ShieldAlert} 
          title="Major Complications" 
          content={(disease.complications.common || []).slice(0, 2).join(', ')} 
          color="text-red-500" 
          bg="bg-red-500/10"
        />
      </div>

      {/* Quick Revision Box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-zinc-100 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32 transition-all group-hover:bg-primary/20"></div>
        
        <div className="relative flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-black uppercase tracking-tight">Quick Revision Box</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <RevisionItem label="Miasmatic Dominance" value={disease.quickRevisionBox.miasmaticDominance} />
              <RevisionItem label="Thermal State" value={disease.quickRevisionBox.thermalState} />
              <RevisionItem label="Organ Affinity" value={disease.quickRevisionBox.organAffinity} />
              <RevisionItem label="Memory Mnemonic" value={disease.quickRevisionBox.memoryMnemonic} />
            </div>
          </div>

          <div className="w-full md:w-72 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Key Academic Notes</h4>
            <ul className="space-y-3">
              {(disease.quickRevisionBox.keyNotes || []).map((note, idx) => (
                <li key={idx} className="text-xs font-bold leading-relaxed text-zinc-400 flex gap-2">
                  <span className="text-primary">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon: Icon, title, content, color, bg }: any) => (
  <div className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-2xl hover:border-primary transition-all group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">{title}</h3>
    <p className="text-sm font-bold text-text-primary leading-relaxed">{content}</p>
  </div>
);

const RevisionItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{label}</span>
    <span className="block text-sm font-black text-zinc-100">{value}</span>
  </div>
);
