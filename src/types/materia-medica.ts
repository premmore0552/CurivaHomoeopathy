
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
  aliases?: string[];
  source?: string;
  edition?: string;
  source_heading?: string;
  source_line_start?: number;
  source_line_end?: number;
  content_status?: string;
  review_required?: boolean;
  heading_review_required?: boolean;
  heading_correction?: string;
}

export interface RemedyRegistry {
  total_remedies: number;
  import_date: string;
  remedies: {
    slug: string;
    title: string;
    aliases?: string[];
  }[];
}

export interface CrossReference {
  remedy: string;
  slug: string;
}
