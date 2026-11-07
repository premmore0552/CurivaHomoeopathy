export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ImportantRemedy {
  name: string;
  id?: string; // Link to full materia medica
  keyIndications: string;
  modalities?: string;
  constitution?: string;
  potencyTips?: string;
}

export interface DifferentialDiagnosis {
  condition: string;
  distinguishingFeatures: string;
  slug?: string; // Link to canonical page
}

export interface InvestigationItem {
  name: string;
  findings: string;
  importance: string;
}

export interface Disease {
  id: string;
  name: string;
  slug: string;
  system: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  examKeywords?: string[];
  
  epidemiology: {
    ageDistribution: string;
    sexDistribution: string;
    riskGroups: string[];
    publicHealthRelevance?: string;
  };

  etiology: {
    predisposingFactors: string[];
    precipitatingFactors: string[];
    riskFactors: string[];
  };

  pathophysiology: {
    steps: {
      title: string;
      description: string;
    }[];
  };

  classification?: {
    type: string;
    details: string | string[];
    table?: { headers: string[], rows: string[][] };
  };

  clinicalFeatures: {
    generalSymptoms: string[];
    localSymptoms: string[];
    constitutionalFeatures: string[];
    importantSigns?: string[];
    diseaseProgression?: string;
  };

  redFlags: string[];

  investigations: {
    screening?: InvestigationItem[];
    diagnostic?: InvestigationItem[];
    confirmatory?: InvestigationItem[];
    goldStandard?: InvestigationItem;
    laboratoryFindings?: InvestigationItem[];
  };

  diagnosticCriteria: {
    title: string;
    criteria: string[];
    interpretationPoints?: string[];
    pitfalls?: string[];
  };

  differentialDiagnosis: DifferentialDiagnosis[];

  complications: {
    common: string[];
    serious: string[];
    lifeThreatening: string[];
  };

  conventionalManagement: {
    general: string[];
    medical: string[];
    emergency?: string[];
    surgical?: string[];
    prevention: string[];
  };

  homoeopathicApproach: string;
  relatedRemedies: ImportantRemedy[];
  remedyDifferentials?: {
    remedy: string;
    differentiation: string;
  }[];
  
  clinicalCase?: {
    presentation: string;
    analysis: string;
    management: string;
  };

  relatedDiseases: string[]; // slugs
  relatedInvestigations?: string[];
  relatedConcepts?: string[];

  examPriority: 'High' | 'Medium' | 'Low';
  clinicalPriority: 'High' | 'Medium' | 'Low';
  emergencyLevel: 'None' | 'Alert' | 'Critical';

  quickRevisionBox: {
    keyNotes: string[];
    miasmaticDominance: string;
    thermalState: string;
    organAffinity: string;
    memoryMnemonic: string;
  };
  
  homoeopathicModule?: {
    medicalAssessment: {
      importanceOfDiagnosis: string;
      severityAssessment: string;
      referralCriteria: string[];
    };
    individualization: {
      mentalGenerals: string[];
      physicalGenerals: {
        thermalState: string;
        thirst: string;
        appetite: string;
        desires: string[];
        aversions: string[];
        sleep: string;
        perspiration: string;
      };
      modalities: string[];
      concomitants: string[];
      characteristicParticulars: string[];
    };
    characteristicFeatures: {
      peculiarSymptoms: string[];
      individualExpression: string;
    };
    repertorialStudy: {
      importantRubrics: { rubric: string; chapter: string }[];
      symptomAnalysis: string;
    };
  };

  mcqs?: MCQ[];
}

export interface DiseaseSystemInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DiseaseSummary {
  id: string;
  name: string;
  slug: string;
  system: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  examPriority: 'High' | 'Medium' | 'Low';
  clinicalPriority: 'High' | 'Medium' | 'Low';
  emergencyLevel: 'None' | 'Alert' | 'Critical';
  relatedRemedyCount: number;
}

export interface DiseaseHubCatalog {
  systems: DiseaseSystemInfo[];
  diseases: DiseaseSummary[];
}
