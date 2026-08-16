export type PathologyCategory = 'general' | 'systemic' | 'hematology' | 'microbiology' | 'miasmatic' | 'practical';

export type QuestionType = 'laq' | 'saq' | 'mcq' | 'viva' | 'ospe';

export type PriorityLevel = 'high' | 'medium' | 'core';

export type NchSection = 'general' | 'systemic' | 'practical';

export type ContentStatus = 'MAPPED' | 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'REVIEW_REQUIRED';

export type ContentTag = 'NCH CURRICULUM' | 'SUPPLEMENTARY';

export type MillerLevel = 'K' | 'KH' | 'SH' | 'P'; // Knows, Knows How, Shows How, Performs

export type BloomDomain = 'Cognitive' | 'Psychomotor' | 'Affective';

export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export type NchPriority = 'Must Know' | 'Knowledge' | 'Higher-level knowledge' | 'Desirable to Know' | 'Nice to Know';

export type AssessmentMethod = 'LAQ' | 'SAQ' | 'MCQ' | 'Viva voce' | 'OSPE' | 'Practical' | 'Case-based assessment' | 'Logbook' | 'Not assessed';

export type TeachingMethod = 'Lecture' | 'Small Group Discussion' | 'Demonstration' | 'Practical' | 'Tutorial' | 'Case-based learning' | 'DOAP' | 'Problem-based learning' | 'Assignment';

export interface NchCompetency {
  id: string;
  code: string; // e.g., 'HomUG-PM I.1.1', 'HomUG-PM II.1.2'
  section: NchSection;
  domainId: string;
  domainName: string;
  competencyStatement: string;
  content: string;
  sloList: string[];
  millerLevel: MillerLevel;
  bloomDomain: BloomDomain;
  bloomLevel: BloomLevel;
  priority: NchPriority;
  teachingMethods: TeachingMethod[];
  assessmentMethods: AssessmentMethod[];
  integration: {
    horizontal?: string[]; // e.g. ["Physiology", "Anatomy", "Pharmacy"]
    vertical?: string[]; // e.g. ["Practice of Medicine", "Surgery", "Obstetrics & Gynaecology", "Organon of Medicine", "Homoeopathic Materia Medica"]
  };
  practicalRelevance?: string;
  source: {
    sourceDocument: string; // "CBDC-2nd-BHMS-Professional-Course"
    sourceType: string; // "Official NCH Curriculum"
    paper: 'Paper I' | 'Paper II' | 'Practical';
  };
  official: boolean; // true = NCH CURRICULUM, false = SUPPLEMENTARY
  contentStatus: ContentStatus;
  relatedTopicSlug?: string;
}

export interface HistopathologySlide {
  id: string;
  name: string;
  code: string;
  organ: string;
  diseaseCategory: string;
  identificationPoints: string[]; // Minimum 3 points
  distinguishingFeatures: string[];
  histopathologicalChanges: string[];
  clinicalCorrelation: string;
  vivaQuestions: string[];
  ospePoints: string[];
  status: ContentStatus;
  official: boolean;
}

export interface GrossSpecimen {
  id: string;
  name: string;
  code: string;
  organ: string;
  identification: string;
  characteristicFeatures: string[]; // 3 characteristic features
  grossAppearance: string;
  pathologicalDiagnosis: string;
  relevantDisease: string;
  keyPathology: string;
  vivaQuestions: string[];
  ospePoints: string[];
  status: ContentStatus;
  official: boolean;
}

export interface LabParameter {
  name: string;
  normalRange: string;
  unit: string;
  description: string;
}

export interface LabAbnormalFinding {
  condition: string;
  parameterChange: string;
  interpretation: string;
}

export interface LabInterpretationReport {
  id: string;
  title: string;
  code: string;
  category: 'haemogram' | 'urine' | 'lft' | 'rft' | 'tft' | 'lipid' | 'diabetic' | 'cardiac' | 'necrosis' | 'serology';
  parameters: LabParameter[];
  abnormalFindings: LabAbnormalFinding[];
  possibleCauses: string[];
  clinicalSignificance: string;
  pathologicalCorrelation: string;
  vivaQuestions: string[];
  caseBasedQuestions: string[];
  status: ContentStatus;
  official: boolean;
}

export interface PathologyTopic {
  id: string;
  chapterId: string;
  title: string;
  slug: string;
  description: string;
  category: PathologyCategory;
  priority: PriorityLevel;
  competencyCode?: string; // NCH CBDC code, e.g., HomUG-PM I.1.1
  contentPlaceholder?: string;
  clinicalCorrelation?: string;
  definitionsCount?: number;
  comparisonsCount?: number;
  flowchartsCount?: number;
  laqCount?: number;
  saqCount?: number;
  mcqCount?: number;
  vivaCount?: number;
  officialTag?: ContentTag;
  contentStatus?: ContentStatus;
}

export interface PathologyChapter {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: PathologyCategory;
  order: number;
  priority: PriorityLevel;
  competencies: string[];
  topics: PathologyTopic[];
  officialTag?: ContentTag;
}

export interface PathologyDefinition {
  id: string;
  term: string;
  category: PathologyCategory;
  definition: string;
  significance: string;
  highYield?: boolean;
  competencyCode?: string;
}

export interface PathologyComparison {
  id: string;
  title: string;
  itemA: string;
  itemB: string;
  category: PathologyCategory;
  points: { feature: string; a: string; b: string }[];
  competencyCode?: string;
}

export interface PathologyQuestion {
  id: string;
  type: QuestionType;
  title: string;
  category: PathologyCategory;
  topicId?: string;
  marks?: number;
  frequency?: string;
  preview: string;
  competencyCode?: string;
}

export interface PathologyStudyTool {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  targetFilter?: string;
}

export interface PathologyProgress {
  generalCompleted: number;
  generalTotal: number;
  systemicCompleted: number;
  systemicTotal: number;
  mcqsCompleted: number;
  mcqsTotal: number;
  laqsCompleted: number;
  laqsTotal: number;
  saqsCompleted: number;
  saqsTotal: number;
  vivaCompleted: number;
  vivaTotal: number;
}
