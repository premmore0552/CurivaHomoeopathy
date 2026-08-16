import React, { useState } from 'react';
import { 
  Microscope, 
  Layers, 
  FileSpreadsheet, 
  CheckCircle2, 
  Search, 
  Filter, 
  HelpCircle, 
  ChevronRight, 
  ShieldCheck, 
  Eye,
  Activity,
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  officialHistopathologySlides, 
  officialGrossSpecimens, 
  officialLabReports 
} from '../../data/nchPathologyCurriculum';
import { HistopathologySlide, GrossSpecimen, LabInterpretationReport } from '../../types/pathology';

export const PathologyPracticalHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'slides' | 'specimens' | 'reports'>('slides');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected detail modal states
  const [selectedSlide, setSelectedSlide] = useState<HistopathologySlide | null>(null);
  const [selectedSpecimen, setSelectedSpecimen] = useState<GrossSpecimen | null>(null);
  const [selectedReport, setSelectedReport] = useState<LabInterpretationReport | null>(null);

  // Filter slides
  const filteredSlides = officialHistopathologySlides.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.organ.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.diseaseCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter specimens
  const filteredSpecimens = officialGrossSpecimens.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.organ.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.pathologicalDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter reports
  const filteredReports = officialLabReports.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900">
              <Microscope className="w-3.5 h-3.5" />
              NCH Practical Pathology (100 Marks)
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Pathology Practical & Demonstration Hub
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-3xl leading-relaxed">
              Official syllabus requirements for Histopathology Slide Spotters, Gross Morbid Anatomy Specimens, and Clinical Diagnostic Laboratory Reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-bg-primary border border-border rounded-xl text-xs font-mono text-text-secondary">
              Total Practical Marks: <strong>100</strong>
            </span>
          </div>
        </div>

        {/* Practical Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-border overflow-x-auto scrollbar-none">
          {[
            { id: 'slides', label: `Histopathology Slides (${officialHistopathologySlides.length})`, icon: Microscope },
            { id: 'specimens', label: `Gross Specimens (${officialGrossSpecimens.length})`, icon: Layers },
            { id: 'reports', label: `Laboratory Interpretation (${officialLabReports.length})`, icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeSubTab === tab.id
                    ? 'bg-red-800 text-white shadow'
                    : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary hover:text-text-primary border border-border/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search inside practicals */}
        <div className="relative pt-2">
          <Search className="absolute left-3.5 top-1/2 translate-y-0.5 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeSubTab === 'slides' ? 'histopathology slides by organ or disease' : activeSubTab === 'specimens' ? 'gross specimens' : 'laboratory diagnostic profiles'}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-primary border border-border rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-red-800"
          />
        </div>
      </div>

      {/* 2. TAB 1: HISTOPATHOLOGY SLIDES */}
      {activeSubTab === 'slides' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Microscope className="w-5 h-5 text-red-800 dark:text-red-400" />
              Microscopic Histopathology Slides (Spotters & Identification)
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-text-secondary">
              15 Marks in Practical Exam
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSlides.map((slide) => (
              <div 
                key={slide.id}
                onClick={() => setSelectedSlide(slide)}
                className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-lg hover:border-red-800/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-red-800 text-white">
                        {slide.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bg-primary border border-border text-text-tertiary">
                        {slide.organ.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      NCH CURRICULUM
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-text-primary group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors">
                    {slide.name}
                  </h4>

                  <div className="text-xs text-text-secondary font-medium">
                    Category: <span className="text-text-primary">{slide.diseaseCategory}</span>
                  </div>

                  {/* 3 Key Identification Points Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      Key Identification Points (Minimum 3):
                    </div>
                    <ul className="space-y-1 text-xs text-text-primary">
                      {slide.identificationPoints.slice(0, 3).map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-700 dark:text-red-400 font-bold">•</span>
                          <span className="line-clamp-2 leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-text-tertiary">
                    {slide.vivaQuestions.length} Viva Questions
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-red-800 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    View Full Microscopic Features
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TAB 2: GROSS SPECIMENS */}
      {activeSubTab === 'specimens' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-800 dark:text-red-400" />
              Gross Pathology Specimens (Morbid Anatomy Spotters)
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-text-secondary">
              15 Marks in Practical Exam
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSpecimens.map((spec) => (
              <div 
                key={spec.id}
                onClick={() => setSelectedSpecimen(spec)}
                className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-lg hover:border-red-800/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-red-800 text-white">
                        {spec.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bg-primary border border-border text-text-tertiary">
                        {spec.organ.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      NCH CURRICULUM
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-text-primary group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors">
                    {spec.name}
                  </h4>

                  <div className="text-xs text-text-secondary">
                    Pathological Diagnosis: <strong className="text-text-primary">{spec.pathologicalDiagnosis}</strong>
                  </div>

                  {/* 3 Characteristic Features Preview */}
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      3 Characteristic Macroscopic Features:
                    </div>
                    <ul className="space-y-1 text-xs text-text-primary">
                      {spec.characteristicFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-700 dark:text-red-400 font-bold">•</span>
                          <span className="line-clamp-2 leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-text-tertiary">
                    {spec.vivaQuestions.length} Viva Questions
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-red-800 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    View Morbid Anatomy Details
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 3: LABORATORY REPORT INTERPRETATION */}
      {activeSubTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-text-primary flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-red-800 dark:text-red-400" />
              Clinical Diagnostic Charts & Laboratory Investigation Reports
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-text-secondary">
              15 Marks in OSPE / Practical
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReports.map((report) => (
              <div 
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-lg hover:border-red-800/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-red-800 text-white">
                      {report.code}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      NCH CURRICULUM
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-text-primary group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors">
                    {report.title}
                  </h4>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {report.clinicalSignificance}
                  </p>

                  <div className="space-y-1 text-xs text-text-tertiary pt-2 border-t border-border">
                    <div>Includes <strong>{report.parameters.length}</strong> standardized reference parameters</div>
                    <div>Includes <strong>{report.abnormalFindings.length}</strong> clinical abnormal patterns</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-red-800 dark:text-red-400">
                  <span>Interpret Panel</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HISTOPATHOLOGY SLIDE MODAL */}
      {selectedSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-bg-primary border border-border rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative my-8">
            <button
              onClick={() => setSelectedSlide(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-red-800 text-white">
                  {selectedSlide.code}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-bg-secondary border border-border rounded-md text-text-secondary">
                  Organ: {selectedSlide.organ}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  NCH CURRICULUM
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                {selectedSlide.name}
              </h3>
              <p className="text-xs text-text-secondary">
                Category: {selectedSlide.diseaseCategory}
              </p>
            </div>

            {/* Identification Points */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">
                Three Mandatory Identification Points (Spotters)
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-2">
                {selectedSlide.identificationPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinguishing Features */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Microscopic Distinguishing Features & Special Stains
              </div>
              <div className="bg-bg-secondary/60 border border-border rounded-2xl p-4 space-y-2">
                {selectedSlide.distinguishingFeatures.map((df, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-red-700 font-bold">•</span>
                    <span>{df}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Correlation */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-4 space-y-1 text-xs text-emerald-900 dark:text-emerald-300">
              <div className="font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-700" />
                Clinical Correlation
              </div>
              <p className="leading-relaxed">{selectedSlide.clinicalCorrelation}</p>
            </div>

            {/* Viva Voce Questions */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Common Spotter Viva Questions
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-2">
                {selectedSlide.vivaQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-text-primary flex items-start gap-2">
                    <span className="font-bold text-red-800 dark:text-red-400">Q{idx + 1}:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. GROSS SPECIMEN MODAL */}
      {selectedSpecimen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-bg-primary border border-border rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative my-8">
            <button
              onClick={() => setSelectedSpecimen(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-red-800 text-white">
                  {selectedSpecimen.code}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-bg-secondary border border-border rounded-md text-text-secondary">
                  Organ: {selectedSpecimen.organ}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  NCH CURRICULUM
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                {selectedSpecimen.name}
              </h3>
              <p className="text-xs text-text-secondary">
                Diagnosis: <strong className="text-text-primary">{selectedSpecimen.pathologicalDiagnosis}</strong>
              </p>
            </div>

            {/* Three Characteristic Macroscopic Features */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">
                Three Characteristic Macroscopic Features
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-2">
                {selectedSpecimen.characteristicFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary">
                    <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Pathology & Relevant Disease */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-1">
                <div className="text-[11px] font-bold text-text-tertiary uppercase">Relevant Disease</div>
                <div className="text-xs font-semibold text-text-primary">{selectedSpecimen.relevantDisease}</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-1">
                <div className="text-[11px] font-bold text-text-tertiary uppercase">Pathological Mechanism</div>
                <div className="text-xs text-text-secondary leading-relaxed">{selectedSpecimen.keyPathology}</div>
              </div>
            </div>

            {/* Viva Voce Questions */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Specimen Viva Questions
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-2">
                {selectedSpecimen.vivaQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-text-primary flex items-start gap-2">
                    <span className="font-bold text-red-800 dark:text-red-400">Q{idx + 1}:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. LAB REPORT MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-bg-primary border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative my-8">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-red-800 text-white">
                  {selectedReport.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  NCH CURRICULUM
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                {selectedReport.title}
              </h3>
              <p className="text-xs text-text-secondary">
                {selectedReport.clinicalSignificance}
              </p>
            </div>

            {/* Standardized Parameter Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Standard Diagnostic Parameters & Normal Reference Ranges
              </div>
              <div className="border border-border rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-bg-secondary text-text-primary font-bold border-b border-border">
                    <tr>
                      <th className="p-3">Investigation Parameter</th>
                      <th className="p-3">Normal Reference Range</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Clinical Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedReport.parameters.map((param, idx) => (
                      <tr key={idx} className="hover:bg-bg-secondary/40 transition-colors">
                        <td className="p-3 font-semibold text-text-primary">{param.name}</td>
                        <td className="p-3 font-mono text-red-800 dark:text-red-400 font-bold">{param.normalRange}</td>
                        <td className="p-3 text-text-tertiary">{param.unit}</td>
                        <td className="p-3 text-text-secondary">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Abnormal Finding Interpretations */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">
                Diagnostic Pattern Interpretation & Case Vignettes
              </div>
              <div className="space-y-3">
                {selectedReport.abnormalFindings.map((ab, idx) => (
                  <div key={idx} className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-1.5">
                    <div className="text-xs font-bold text-text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-700"></span>
                      {ab.condition}
                    </div>
                    <div className="text-xs font-mono text-amber-800 dark:text-amber-300 bg-bg-primary p-2 rounded-lg border border-border">
                      {ab.parameterChange}
                    </div>
                    <div className="text-xs text-text-secondary leading-relaxed">
                      {ab.interpretation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Based OSPE Questions */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Case-Based OSPE & Viva Problems
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-4 space-y-2">
                {selectedReport.caseBasedQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-text-primary leading-relaxed">
                    <strong className="text-red-800 dark:text-red-400">Clinical Case {idx + 1}:</strong> {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
