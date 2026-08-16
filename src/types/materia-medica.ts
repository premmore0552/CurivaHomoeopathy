
export interface RemedyContent {
  title: string;
  sections: Record<string, string>;
}

export interface RemedyMetadata {
  slug: string;
  title: string;
  alphabet: string;
  detected_headings: string[];
  word_count: number;
  character_count?: number;
  paragraph_count?: number;
  estimated_reading_time: string;
  import_date?: string;
  parser_version?: string;
  source_filename?: string;
  checksum?: string;
  commonName?: string;
  family?: string;
}

export interface RemedyRegistry {
  total_remedies: number;
  import_date: string;
  remedies: {
    slug: string;
    title: string;
  }[];
}

export interface CrossReference {
  remedy: string;
  slug: string;
}
