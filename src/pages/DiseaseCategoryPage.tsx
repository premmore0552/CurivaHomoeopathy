import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { diseaseHubData, DISEASE_SYSTEMS } from '../data/diseaseHubData';
import { DiseaseCard } from '../components/disease-hub/DiseaseCard';
import { motion } from 'motion/react';
import { AlertCircle, GraduationCap, Stethoscope, ArrowLeft } from 'lucide-react';

const DiseaseCategoryPage: React.FC = () => {
  const { systemSlug } = useParams<{ systemSlug: string }>();
  const navigate = useNavigate();

  const system = useMemo(() => 
    DISEASE_SYSTEMS.find(s => s.id === systemSlug), 
    [systemSlug]
  );

  const diseases = useMemo(() => 
    diseaseHubData.filter(d => d.system === systemSlug),
    [systemSlug]
  );

  if (!system) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase italic mb-6">System Not Found</h1>
        <Link to="/disease-hub" className="text-primary font-black uppercase tracking-widest hover:underline">
          Back to Disease Hub
        </Link>
      </div>
    );
  }

  const highPriority = diseases.filter(d => d.examPriority === 'High' && d.clinicalPriority === 'High');
  const examPriority = diseases.filter(d => d.examPriority === 'High' && d.clinicalPriority !== 'High');
  const clinicalPriority = diseases.filter(d => d.clinicalPriority === 'High' && d.examPriority !== 'High');
  const emergency = diseases.filter(d => d.emergencyLevel !== 'None');

  return (
    <>
      <SEO title={`${system.name} | Clinical Library`} description={`Comprehensive academic and clinical resource for ${system.name.toLowerCase()}.`} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs />

        <div className="mt-12 space-y-16">
          {/* Hero */}
          <div className="space-y-6">
            <Link to="/disease-hub/directory" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
            </Link>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-display font-black text-text-primary uppercase tracking-tight leading-none">
                {system.name}
              </h1>
              <p className="text-sm font-bold text-text-secondary max-w-2xl leading-relaxed">
                Comprehensive academic and clinical resource for {system.name.toLowerCase()}, structured for systematic medical study.
              </p>
            </div>
          </div>

          {/* High Priority Sections */}
          {(highPriority.length > 0 || emergency.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {highPriority.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-display font-black uppercase tracking-tight">Must Know <span className="text-primary italic">Diseases</span></h2>
                  </div>
                  <div className="grid gap-4">
                    {highPriority.map(d => (
                      <DiseaseCard key={d.id} disease={d} onClick={() => navigate(`/disease-hub/${d.system}/${d.slug}`)} />
                    ))}
                  </div>
                </div>
              )}

              {emergency.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h2 className="text-xl font-display font-black uppercase tracking-tight text-red-500">Emergency <span className="italic">Conditions</span></h2>
                  </div>
                  <div className="grid gap-4">
                    {emergency.map(d => (
                      <DiseaseCard key={d.id} disease={d} onClick={() => navigate(`/disease-hub/${d.system}/${d.slug}`)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Priority Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {examPriority.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-blue-600 border-b border-blue-100 pb-2">BHMS Exam Priority</h3>
                <div className="grid gap-4">
                  {examPriority.map(d => (
                    <DiseaseCard key={d.id} disease={d} onClick={() => navigate(`/disease-hub/${d.system}/${d.slug}`)} />
                  ))}
                </div>
              </div>
            )}
            {clinicalPriority.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-emerald-600 border-b border-emerald-100 pb-2">Clinical Priority</h3>
                <div className="grid gap-4">
                  {clinicalPriority.map(d => (
                    <DiseaseCard key={d.id} disease={d} onClick={() => navigate(`/disease-hub/${d.system}/${d.slug}`)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* All Diseases in this system */}
          <div className="pt-16 border-t border-border space-y-10">
            <h2 className="text-3xl font-display font-black uppercase tracking-tight">All {system.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map(d => (
                <DiseaseCard key={d.id} disease={d} onClick={() => navigate(`/disease-hub/${d.system}/${d.slug}`)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiseaseCategoryPage;
