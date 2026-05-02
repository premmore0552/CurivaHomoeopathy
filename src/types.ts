export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  readingTime?: string;
  
  // New structured fields for richer blog posts
  seoTitle?: string;
  quickSummary?: string[];
  keyPatterns?: string[];
  whoItSuits?: string;
  whenToConsider?: string[];
  modalities?: {
    better: string[];
    worse: string[];
  };
  comparisons?: {
    remedyName: string;
    differences: string;
    linkId?: string;
  }[];
  relatedCarePlans?: {
    name: string;
    linkId: string;
  }[];
  citations?: {
    title: string;
    url: string;
    source: string;
  }[];
  relatedRemedies?: string[];
  relatedConditions?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
