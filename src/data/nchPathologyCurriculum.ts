import { NchCompetency } from '../types/pathology';
import { nchGeneralPathologyCompetencies } from './nchCurriculumGeneral';
import { nchSystemicPathologyCompetencies } from './nchCurriculumSystemic';
import { 
  nchPracticalCompetencies, 
  officialHistopathologySlides, 
  officialGrossSpecimens, 
  officialLabReports 
} from './nchCurriculumPractical';

export const allNchPathologyCompetencies: NchCompetency[] = [
  ...nchGeneralPathologyCompetencies,
  ...nchSystemicPathologyCompetencies,
  ...nchPracticalCompetencies
];

export { 
  nchGeneralPathologyCompetencies, 
  nchSystemicPathologyCompetencies, 
  nchPracticalCompetencies,
  officialHistopathologySlides,
  officialGrossSpecimens,
  officialLabReports
};

export interface NchExamBlueprint {
  paper1: {
    title: string;
    description: string;
    totalMarks: number;
    sections: {
      sectionA: { title: string; syllabus: string; marks: number };
      sectionB: { title: string; syllabus: string; marks: number };
    };
    questionPattern: {
      laqs: { count: string; marks: number; totalMarks: number };
      saqs: { count: string; marks: number; totalMarks: number };
      mcqs: { count: string; marks: number; totalMarks: number };
    };
  };
  paper2: {
    title: string;
    description: string;
    totalMarks: number;
    sections: {
      sectionA: { title: string; syllabus: string; marks: number };
      sectionB: { title: string; syllabus: string; marks: number };
    };
  };
  practical: {
    title: string;
    totalMarks: number;
    components: {
      name: string;
      marks: number;
      description: string;
    }[];
  };
}

export const nchExamBlueprint: NchExamBlueprint = {
  paper1: {
    title: 'Paper I: General Pathology & Systemic Pathology',
    description: 'Final University Examination Theory Paper I (100 Marks) covers fundamental pathological processes and organ-system morbid anatomy.',
    totalMarks: 100,
    sections: {
      sectionA: {
        title: 'Section A: General Pathology',
        syllabus: 'Cell injury, Inflammation, Repair, Hemodynamics, Neoplasia, Immunopathology, Genetics & Environmental pathology',
        marks: 50
      },
      sectionB: {
        title: 'Section B: Systemic Pathology',
        syllabus: 'Cardiovascular, Respiratory, Gastrointestinal, Hepatobiliary, Renal, Hematology, Endocrine, Genital, Breast & Musculoskeletal pathology',
        marks: 50
      }
    },
    questionPattern: {
      laqs: {
        count: '5 out of 6 questions (10 Marks each)',
        marks: 10,
        totalMarks: 50
      },
      saqs: {
        count: '8 out of 10 questions (5 Marks each)',
        marks: 5,
        totalMarks: 40
      },
      mcqs: {
        count: '10 Multiple Choice Questions (1 Mark each)',
        marks: 1,
        totalMarks: 10
      }
    }
  },
  paper2: {
    title: 'Paper II: Microbiology & Parasitology',
    description: 'Final University Examination Theory Paper II (100 Marks) covers General Bacteriology, Systemic Bacteriology, Virology, Mycology, Parasitology, and Diagnostic Immunology (kept distinct as per NCH guidelines).',
    totalMarks: 100,
    sections: {
      sectionA: {
        title: 'Section A: General & Systemic Bacteriology',
        syllabus: 'Bacterial morphology, physiology, sterilization, Gram positive & negative cocci/bacilli, Mycobacteria, Spirochaetes',
        marks: 50
      },
      sectionB: {
        title: 'Section B: Virology, Parasitology, Mycology & Immunology',
        syllabus: 'Protozoa, Helminths, DNA/RNA viruses, Superficial/Deep Mycoses, Antigen-Antibody reactions',
        marks: 50
      }
    }
  },
  practical: {
    title: 'Pathology Practical & Viva Voce Examination',
    totalMarks: 100,
    components: [
      {
        name: 'Clinical Pathology & Hematology Practicals',
        marks: 25,
        description: 'Performance of Sahli Hb estimation, TLC with hemocytometer, DLC smear, ESR, or Routine/Microscopic Urine examination.'
      },
      {
        name: 'Histopathology Slide Spotters',
        marks: 15,
        description: 'Identification of 5 microscopic slides with 3 distinguishing diagnostic features and labeled sketches.'
      },
      {
        name: 'Gross Pathology Specimens Spotters',
        marks: 15,
        description: 'Identification of 5 morbid anatomy specimens with 3 characteristic macroscopic features and diagnosis.'
      },
      {
        name: 'Laboratory Investigation Report Interpretation / OSPE',
        marks: 15,
        description: 'Clinical reasoning and interpretation of Haemogram, LFT, RFT, Thyroid, Lipid, Cardiac or Urine reports.'
      },
      {
        name: 'Viva Voce Examination',
        marks: 20,
        description: 'Oral examination covering General Pathology, Systemic Pathology, Clinical Laboratory methods and Miasmatic correlations.'
      },
      {
        name: 'Practical Record Book & Logbook',
        marks: 10,
        description: 'Duly completed, verified and signed practical journal with slide drawings, specimen notes and lab procedures.'
      }
    ]
  }
};

export interface CurriculumCoverageStats {
  totalCompetencies: number;
  generalCompetencies: number;
  systemicCompetencies: number;
  practicalCompetencies: number;
  officialCompetencies: number;
  supplementaryCompetencies: number;
  mappedCount: number;
  completeCount: number;
  slidesCount: number;
  specimensCount: number;
  labReportsCount: number;
}

export function getCurriculumCoverageStats(): CurriculumCoverageStats {
  const general = nchGeneralPathologyCompetencies.length;
  const systemic = nchSystemicPathologyCompetencies.length;
  const practical = nchPracticalCompetencies.length;
  const total = allNchPathologyCompetencies.length;
  const official = allNchPathologyCompetencies.filter(c => c.official).length;
  const supplementary = allNchPathologyCompetencies.filter(c => !c.official).length;
  const mapped = allNchPathologyCompetencies.filter(c => c.contentStatus === 'MAPPED').length;
  const complete = allNchPathologyCompetencies.filter(c => c.contentStatus === 'COMPLETE').length;

  return {
    totalCompetencies: total,
    generalCompetencies: general,
    systemicCompetencies: systemic,
    practicalCompetencies: practical,
    officialCompetencies: official,
    supplementaryCompetencies: supplementary,
    mappedCount: mapped,
    completeCount: complete,
    slidesCount: officialHistopathologySlides.length,
    specimensCount: officialGrossSpecimens.length,
    labReportsCount: officialLabReports.length
  };
}
