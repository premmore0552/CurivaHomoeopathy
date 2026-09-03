import React from 'react';
import { Pill, Users, ChevronRight, BookOpen, Microscope, Book, Beaker, Activity, ShieldAlert, HeartPulse, Brain, Zap, Stethoscope, AlertTriangle } from 'lucide-react';
import { Disease, ImportantRemedy } from '../../data/diseaseHubData';
import { Link } from 'react-router-dom';

interface SectionProps {
  disease: Disease;
}

export const SectionHomoeopathy: React.FC<SectionProps> = ({ disease }) => (
  <section id="homoeopathy" className="scroll-mt-32 space-y-24">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-border"></div>
      <h2 className="text-3xl font-display font-black uppercase italic tracking-tight text-text-primary">🌿 Homoeopathic Approach</h2>
    </div>

    {/* Phase 4: Educational Module */}
    {disease.homoeopathicModule && (
      <div className="space-y-24">
        {/* STEP 1: MEDICAL ASSESSMENT */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary">Step 1 — Medical Assessment</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Importance of Medical Diagnosis</h4>
                <p className="text-base font-bold text-text-primary leading-relaxed">{disease.homoeopathicModule.medicalAssessment.importanceOfDiagnosis}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Severity Assessment</h4>
                <p className="text-base font-bold text-text-primary leading-relaxed">{disease.homoeopathicModule.medicalAssessment.severityAssessment}</p>
              </div>
            </div>

            <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Referral & Emergency Criteria
              </h4>
              <ul className="space-y-4">
                {(disease.homoeopathicModule.medicalAssessment.referralCriteria || []).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-black text-rose-600 uppercase tracking-tight">
                    <span className="shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* STEP 2: INDIVIDUALIZATION */}
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary">Step 2 — Individualization</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mental Generals */}
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-6 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Mental Generals
              </h4>
              <ul className="space-y-3">
                {(disease.homoeopathicModule.individualization.mentalGenerals || []).map((item, i) => (
                  <li key={i} className="text-sm font-bold text-text-primary flex gap-2">
                    <span className="text-purple-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Physical Generals */}
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Physical Generals
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <IndividualizationItem label="Thermal State" value={disease.homoeopathicModule.individualization.physicalGenerals.thermalState} />
                  <IndividualizationItem label="Thirst" value={disease.homoeopathicModule.individualization.physicalGenerals.thirst} />
                  <IndividualizationItem label="Appetite" value={disease.homoeopathicModule.individualization.physicalGenerals.appetite} />
                </div>
                <div className="space-y-4">
                  <IndividualizationItem label="Desires" value={(disease.homoeopathicModule.individualization.physicalGenerals.desires || []).join(', ')} />
                  <IndividualizationItem label="Aversions" value={(disease.homoeopathicModule.individualization.physicalGenerals.aversions || []).join(', ')} />
                  <IndividualizationItem label="Sleep & Dreams" value={disease.homoeopathicModule.individualization.physicalGenerals.sleep} />
                  <IndividualizationItem label="Perspiration" value={disease.homoeopathicModule.individualization.physicalGenerals.perspiration} />
                </div>
              </div>
            </div>

            {/* Modalities & Concomitants */}
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Modalities
              </h4>
              <ul className="space-y-3">
                {(disease.homoeopathicModule.individualization.modalities || []).map((item, i) => (
                  <li key={i} className="text-sm font-bold text-text-primary flex gap-2">
                    <span className="text-amber-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Concomitants
              </h4>
              <ul className="space-y-3">
                {(disease.homoeopathicModule.individualization.concomitants || []).map((item, i) => (
                  <li key={i} className="text-sm font-bold text-text-primary flex gap-2">
                    <span className="text-blue-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-6 flex items-center gap-2">
                <HeartPulse className="w-4 h-4" />
                Characteristic Particulars
              </h4>
              <ul className="space-y-3">
                {(disease.homoeopathicModule.individualization.characteristicParticulars || []).map((item, i) => (
                  <li key={i} className="text-sm font-bold text-text-primary flex gap-2">
                    <span className="text-rose-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* STEP 3: CHARACTERISTIC FEATURES */}
        <div className="bg-primary p-12 rounded-[3rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
            <Microscope className="w-64 h-64" />
          </div>
          <div className="relative max-w-3xl">
            <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-8 italic">
              What Makes This Patient Different?
            </h3>
            <p className="text-xl font-black uppercase tracking-tight text-white/80 mb-10 leading-tight">
              In Homoeopathy, the diagnosis "{disease.name}" is only the beginning. The prescription depends on the unique individual expression of the disease.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Peculiar Symptoms (P.Q.R.S)</h4>
                <ul className="space-y-3">
                  {(disease.homoeopathicModule.characteristicFeatures.peculiarSymptoms || []).map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm font-black uppercase tracking-tight">
                      <span className="text-white/40">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-3">Individual Expression</h4>
                <p className="text-base font-bold leading-relaxed italic">
                  "{disease.homoeopathicModule.characteristicFeatures.individualExpression}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: REPERTORIAL STUDY */}
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary">Step 4 — Repertorial Study</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-6">Important Rubrics</h4>
              <div className="space-y-4">
                {(disease.homoeopathicModule.repertorialStudy.importantRubrics || []).map((item, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-zinc-800 border border-border rounded-xl flex items-center justify-between group hover:border-primary transition-all">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-primary">{item.chapter}</p>
                      <p className="text-sm font-bold text-text-primary">{item.rubric}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-2 border-dashed border-border rounded-3xl flex flex-col justify-center">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">Symptom Analysis & Totality</h4>
              <p className="text-lg font-serif italic text-text-primary leading-relaxed">
                "{disease.homoeopathicModule.repertorialStudy.symptomAnalysis}"
              </p>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Existing Clinical Remedies Section */}
    <div className="space-y-12 pt-12 border-t border-border">
      <div className="p-10 bg-primary/5 border border-primary/20 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <BookOpen className="w-48 h-48" />
        </div>
        <div className="relative">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Miasmatic & Clinical Perspective</h4>
          <p className="text-2xl font-display font-black tracking-tight text-text-primary leading-tight max-w-4xl italic">
            "{disease.homoeopathicApproach}"
          </p>
        </div>
      </div>

      <div id="remedies" className="scroll-mt-32 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary flex items-center gap-3">
            <Pill className="w-6 h-6 text-primary" />
            Leading Clinical Remedies
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary border border-border px-4 py-2 rounded-xl">
            {disease.relatedRemedies.length} Therapeutic Options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(disease.relatedRemedies || []).map((remedy, i) => (
            <RemedyCard key={i} remedy={remedy} />
          ))}
        </div>
      </div>

      {disease.remedyDifferentials && (
        <div id="differentials" className="scroll-mt-32 space-y-8">
          <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary flex items-center gap-3">
            <Microscope className="w-6 h-6 text-primary" />
            Remedy Differentiation Table
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-border rounded-3xl overflow-hidden">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Remedy</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Core Differentiation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(disease.remedyDifferentials || []).map((diff, i) => (
                  <tr key={i}>
                    <td className="p-6 font-black text-primary uppercase tracking-widest text-xs">{diff.remedy}</td>
                    <td className="p-6 text-sm font-bold text-text-secondary leading-relaxed">{diff.differentiation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div id="exam" className="scroll-mt-32 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 text-zinc-100">
        <h3 className="text-xl font-display font-black uppercase tracking-tight text-primary mb-8 flex items-center gap-3">
          <Book className="w-6 h-6" />
          BHMS Exam Corner (High Yield)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Probable Questions</h4>
            <ul className="space-y-4">
              <li className="text-sm font-black text-zinc-300 flex gap-3">
                <span className="text-primary tracking-tighter">Q.</span> Define {disease.name}, explain its pathophysiology and Homoeopathic management. (15 marks)
              </li>
              <li className="text-sm font-black text-zinc-300 flex gap-3">
                <span className="text-primary tracking-tighter">Q.</span> Differential diagnosis of {disease.name} from {disease.differentialDiagnosis[0]?.condition || 'related conditions'}. (5 marks)
              </li>
            </ul>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 italic">Clinical Pearl</h4>
            <p className="text-base font-bold text-zinc-400 leading-relaxed italic">
              "Never forget to evaluate the thermal state and miasmatic background even in acute exacerbations of {disease.name}. The acute is but an explosion of the chronic."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const IndividualizationItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <span className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{label}</span>
    <span className="block text-sm font-bold text-text-primary leading-tight">{value}</span>
  </div>
);

const RemedyCard = ({ remedy }: { remedy: ImportantRemedy }) => (
  <div className="group p-8 bg-white dark:bg-zinc-900 border border-border rounded-3xl hover:border-primary transition-all">
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-xl font-display font-black uppercase tracking-tight text-text-primary group-hover:text-primary transition-colors">
        {remedy.name}
      </h4>
      {remedy.id && (
        <Link 
          to={`/materia-medica/${remedy.id}`}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-white transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
    
    <div className="space-y-6">
      <RemedyDetailItem label="Key Indications" value={remedy.keyIndications} />
      <RemedyDetailItem label="Modalities" value={remedy.modalities} />
      <div className="grid grid-cols-2 gap-4">
        <RemedyDetailItem label="Constitution" value={remedy.constitution} />
        <RemedyDetailItem label="Potency Tips" value={remedy.potencyTips} />
      </div>
    </div>
  </div>
);

const RemedyDetailItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <span className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{label}</span>
    <span className="block text-sm font-bold text-text-primary leading-relaxed">{value}</span>
  </div>
);

// --- RELATED CONTENT ---
export const RelatedContent: React.FC<SectionProps> = ({ disease }) => (
  <section id="related" className="scroll-mt-32 pt-20 border-t border-border">
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary">Related Topics</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RelatedBlock title="Related Diseases" items={disease.relatedDiseases || []} icon={Activity} path="/disease-hub" />
      <RelatedBlock title="Related Remedies" items={(disease.relatedRemedies || []).map(r => r.name)} icon={Pill} path="/materia-medica" />
      <RelatedBlock title="Investigations" items={disease.relatedInvestigations || ['CBC', 'X-Ray', 'Biopsy']} icon={Microscope} path="/disease-hub" />
      <RelatedBlock title="Core Concepts" items={disease.relatedConcepts || ['Miasms', 'Susceptibility']} icon={Beaker} path="/organon-philosophy" />
    </div>
  </section>
);

const RelatedBlock = ({ title, items, icon: Icon, path }: any) => (
  <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-border rounded-2xl">
    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
      <Icon className="w-3 h-3" />
      {title}
    </h4>
    <ul className="space-y-2">
      {(items || []).map((item: string, i: number) => (
        <li key={i}>
          <Link to={path} className="text-xs font-black uppercase tracking-widest text-text-primary hover:text-primary transition-colors flex items-center gap-2">
            <span className="w-1 h-1 bg-border rounded-full"></span>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
