import { allBlogPosts } from '../data/blogPosts';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { conditionsData } from '../data/conditionsData';
import { organonData } from '../data/organon_data';
import { glossaryData } from '../data/glossaryData';
import { anatomyModules } from '../data/anatomyModulesData';
import { physiologyModules } from '../data/physiologyModulesData';
import { FMT_SYLLABUS_DATA } from '../data/fmtModulesData';
import { stalwartsData } from '../data/stalwartsData';

export interface SearchDocument {
  id: string;
  title: string;
  type: 'page' | 'remedy' | 'ailment' | 'article' | 'aphorism' | 'anatomy' | 'physiology' | 'fmt' | 'glossary' | 'stalwart';
  category?: string;
  link: string;
  excerpt: string;
  content: string;
  tags: string[];
  popularity: number; // 1 to 10
}

export interface SearchResult {
  doc: SearchDocument;
  score: number;
  snippet: string;
  matchedWords: string[];
}

// Precompile Synonyms for dynamic matching
const SYNONYMS: Record<string, string[]> = {
  "migraine": ["headache", "hemicrania", "cephalalgia", "brow-ague"],
  "headache": ["migraine", "cephalalgia", "congestion"],
  "fever": ["pyrexia", "temperature", "chill", "aconite", "belladonna"],
  "dilution": ["potency", "potentization", "attenuation", "dynamization"],
  "vital force": ["dynamis", "vital energy", "vital principle", "lebenskraft"],
  "proving": ["drug test", "pruefung", "provings"],
  "cough": ["bronchitis", "tussis", "respiratory", "cold"],
  "eczema": ["dermatitis", "skin eruption", "psoriasis", "itching"],
  "stomach": ["acidity", "gerd", "gastric", "dyspepsia", "digestion", "nausea"],
  "heart": ["angina", "cardiac", "vascular", "pulse"],
  "bone": ["fracture", "clavicle", "osteology", "skeleton"],
  "consent": ["informed consent", "proxy consent", "misconduct", "ethics"],
  "death": ["thanatology", "rigor mortis", "post-mortem", "autopsy"],
  "poison": ["toxicology", "arsenic", "mercury", "lead", "antidote"]
};

// Abbreviations mappings
const ABBREVIATIONS: Record<string, string> = {
  "mm": "materia medica",
  "om": "organon of medicine",
  "fmt": "forensic medicine & toxicology",
  "pyq": "previous year questions",
  "mcq": "multiple choice questions",
  "cbc": "complete blood count",
  "gerd": "gastroesophageal reflux disease"
};

// Singularize/Pluralize Stemmer (simple lightweight rule)
const stemWord = (word: string): string => {
  const w = word.toLowerCase();
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.endsWith("es") && !w.endsWith("ces") && !w.endsWith("ses") && !w.endsWith("oesp")) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("is") && !w.endsWith("us")) return w.slice(0, -1);
  return w;
};

// Levenshtein Distance for typo tolerance
export const levenshteinDistance = (a: string, b: string): number => {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
};

// Lazy cache for building search index once
let searchIndexCache: SearchDocument[] | null = null;

export const getSearchIndex = (): SearchDocument[] => {
  if (searchIndexCache) return searchIndexCache;

  const index: SearchDocument[] = [];

  // 1. Static Key Pages
  const staticPages: SearchDocument[] = [
    {
      id: 'page-home',
      title: 'Curiva Homoeopathy Portal',
      type: 'page',
      category: 'General',
      link: '/',
      excerpt: 'The ultimate modern medical education platform for BHMS students, clinical Homoeopaths, and public health.',
      content: 'Curiva Homoeopathy medical student preparation material Materia Medica Organon Anatomy Physiology Forensic medicine',
      tags: ['home', 'portal', 'dashboard'],
      popularity: 10
    },
    {
      id: 'page-student-resources',
      title: 'Student Resources Hub',
      type: 'page',
      category: 'Education',
      link: '/student-resources',
      excerpt: 'Access year-wise BHMS blueprints, solved previous year papers (PYQs), flashcards, active recall boosters, and clinical logs.',
      content: 'BHMS exam study materials mock test papers active recall booster university solved papers anatomy pathology physiology',
      tags: ['resources', 'viva', 'flashcards', 'mock exam', 'syllabus'],
      popularity: 9
    },
    {
      id: 'page-symptom-checker',
      title: 'Interactive Symptom Repertory Checker',
      type: 'page',
      category: 'Tools',
      link: '/symptom-checker',
      excerpt: 'Synthesize case analysis using Kent repertorization logic. Match keynotes and general modalities to optimal remedies.',
      content: 'Symptom weight repertory calculator mental generals physical generals modalities aggravations ameliorations',
      tags: ['symptom', 'repertory', 'kent', 'therapeutics', 'analyzer'],
      popularity: 8
    },
    {
      id: 'page-cbc-analyzer',
      title: 'CBC Diagnostic Handbook & Miasm Mapper',
      type: 'page',
      category: 'Tools',
      link: '/cbc-handbook',
      excerpt: 'Input patient lab CBC parameters (haemoglobin, white blood cells, platelets) to analyze systemic pathways and matching miasms.',
      content: 'Complete Blood Count analyzer hemogram red blood cells white blood cells eosinophils neutrophils anemia infection miasm mapping',
      tags: ['cbc', 'diagnostics', 'blood test', 'pathology', 'handbook'],
      popularity: 8
    },
    {
      id: 'page-anatomy-library',
      title: '1st BHMS Anatomy Library',
      type: 'page',
      category: 'Academics',
      link: '/anatomy',
      excerpt: 'Comprehensive anatomical region indexes, osteology, applied clinical diagrams, mnemonics, and viva questions.',
      content: 'clavicle shoulder joint heart bones histology embryology upper limb lower limb brain neurovascular',
      tags: ['anatomy', 'osteology', 'clavicle', 'applied anatomy', 'viva'],
      popularity: 7
    },
    {
      id: 'page-physiology-library',
      title: '1st BHMS Physiology & Biochemistry Library',
      type: 'page',
      category: 'Academics',
      link: '/physiology',
      excerpt: 'Systemic mechanism walk-throughs, normal ranges, biological tables, and quick-revision flashcards.',
      content: 'Homoeostasis cell membrane hemoglobin erythropoiesis blood clotting renal cardiac cycle endocrine systems',
      tags: ['physiology', 'biochemistry', 'Homoeostasis', 'blood', 'mechanism'],
      popularity: 7
    },
    {
      id: 'page-fmt-library',
      title: '2nd BHMS Forensic Medicine & Toxicology Portal',
      type: 'page',
      category: 'Academics',
      link: '/fmt',
      excerpt: 'Legal procedures, courtroom exam boosing protocols, thanatology, trauma patterns, toxicology profiles, and antidotes.',
      content: 'court evidence oath dying declaration summons expert witness professional misconduct autopsy rigor mortis asphyxia poisons',
      tags: ['fmt', 'jurisprudence', 'forensics', 'toxicology', 'legal', 'autopsy'],
      popularity: 7
    },
    {
      id: 'page-mcq-practice',
      title: 'AIAPGET & BHMS Mock MCQ Board',
      type: 'page',
      category: 'Education',
      link: '/mcq-practice',
      excerpt: 'Practice timed questions, track subject strengths, and simulate entrance test scenarios.',
      content: 'multiple choice questions mock test examination score board study tracking questions answers rationale',
      tags: ['mcq', 'quiz', 'exam prep', 'aiapget', 'practice test'],
      popularity: 8
    }
  ];
  index.push(...staticPages);

  // 2. Index Materia Medica Remedies
  enhancedRemedies.forEach(r => {
    const keywords = [r.name, r.id, r.latinName || "", r.origin || "", r.family || ""].filter(Boolean);
    const contentText = `
      Family: ${r.family || ""}
      Latin Name: ${r.latinName || ""}
      Origin: ${r.origin || ""}
      Description: ${r.description || ""}
      Key Characteristics: ${r.keyCharacteristics?.join(", ") || ""}
      Mind Generals: ${r.mind?.join(", ") || ""}
      Physical Generals: ${r.physical?.join(", ") || ""}
      Clinical Applications: ${r.clinicalApplications?.join(", ") || ""}
      Therapeutic Modalities: Worse from ${r.modalities?.worse?.join(", ") || ""}, Better from ${r.modalities?.better?.join(", ") || ""}
    `;

    const polychrests = ['aconite', 'belladonna', 'bryonia', 'sulphur', 'nux_vomica', 'pulsatilla', 'lycopodium', 'silicea', 'gelsemium', 'arnica'];
    const isPoly = polychrests.includes(r.id.toLowerCase());

    index.push({
      id: `remedy-${r.id}`,
      title: r.name,
      type: 'remedy',
      category: 'Materia Medica',
      link: `/remedy/${r.id}`,
      excerpt: r.description ? r.description.substring(0, 140) + "..." : 'Classical Homoeopathic Remedy Profile',
      content: contentText,
      tags: keywords.concat(r.clinicalApplications || []),
      popularity: isPoly ? 9 : 6
    });
  });

  // 3. Index Diseases & Clinical Ailments
  conditionsData.forEach(c => {
    const patternsText = c.patterns?.map(p => `${p.name}: ${p.tendency} (${p.modalities.join(", ")})`).join("; ") || "";
    const remediesText = c.relatedRemedies?.map(r => r.name).join(", ") || "";
    const contentText = `
      Category: ${c.category}
      Description: ${c.description}
      Therapeutic Patterns: ${patternsText}
      Suggested Remedies: ${remediesText}
    `;

    index.push({
      id: `ailment-${c.id}`,
      title: c.title,
      type: 'ailment',
      category: c.category,
      link: `/conditions/${c.id}`,
      excerpt: c.excerpt || 'Clinical management guide and treatment protocol.',
      content: contentText,
      tags: [c.title, c.category, 'therapeutics', 'clinical guide'],
      popularity: 8
    });
  });

  // 4. Index Research Articles & Blog Posts
  allBlogPosts.forEach(p => {
    const contentText = `
      Category: ${p.category}
      Author: ${p.author}
      Content: ${p.content}
      Summary: ${p.quickSummary?.join(" ") || ""}
      Tags: ${p.tags.join(", ")}
    `;

    index.push({
      id: `article-${p.id || p.slug}`,
      title: p.title,
      type: 'article',
      category: p.category,
      link: `/read/${p.slug}`,
      excerpt: p.excerpt || 'Research article on Homoeopathic and allied medical sciences.',
      content: contentText,
      tags: p.tags.concat([p.category, p.author]),
      popularity: 7
    });
  });

  // 5. Index Organon Aphorisms
  organonData.forEach(aph => {
    const standardVersion = aph.versions.find(v => v.edition === "Standard") || aph.versions[0];
    const contentText = standardVersion ? standardVersion.content : "";
    const footnotesText = standardVersion ? standardVersion.footnotes.map(f => f.text).join(" ") : "";

    index.push({
      id: `aphorism-${aph.id}`,
      title: `Aphorism ${aph.id}`,
      type: 'aphorism',
      category: aph.category,
      link: `/organon-philosophy`,
      excerpt: contentText.substring(0, 140) + (contentText.length > 140 ? '...' : ''),
      content: `${contentText} ${footnotesText} Hahnemann philosophy organon aphorisms section ${aph.category}`,
      tags: [`aphorism ${aph.id}`, `aph ${aph.id}`, aph.category, 'organon', 'hahnemann'],
      popularity: aph.id <= 30 ? 9 : 5 // Hahnemann's top core principles have higher popularity
    });
  });

  // 6. Index Glossary Terms
  glossaryData.forEach(term => {
    const contentText = `
      Term: ${term.term}
      Category: ${term.category}
      Definition: ${term.definition}
      Explanation: ${term.explanation}
      Source: ${term.source || ""}
    `;

    index.push({
      id: `glossary-${term.id}`,
      title: term.term,
      type: 'glossary',
      category: term.category,
      link: '/student-resources',
      excerpt: term.definition,
      content: contentText,
      tags: [term.term, term.category, 'glossary', 'definition'],
      popularity: 6
    });
  });

  // 7. Index Anatomy Modules
  Object.values(anatomyModules).forEach(mod => {
    const quickFactsText = `
      Definition: ${mod.quickFacts?.definition || ""}
      Location: ${mod.quickFacts?.location || ""}
      Function: ${mod.quickFacts?.function || ""}
      Clinical Importance: ${mod.quickFacts?.clinicalImportance || ""}
    `;
    const sectionsText = `
      Intro: ${mod.introduction || ""}
      Anatomy: ${mod.definitionText || ""}
      Applied Anatomy: ${mod.appliedAnatomy || ""}
      Clinical Correlation: ${mod.clinicalCorrelation || ""}
    `;
    const mnemonicsText = mod.mnemonics?.map(m => `${m.phrase}: ${m.meaning}`).join("; ") || "";

    index.push({
      id: `anatomy-${mod.id}`,
      title: mod.title,
      type: 'anatomy',
      category: mod.bodyRegion,
      link: `/anatomy`,
      excerpt: mod.quickFacts?.oneLineRevision || '1st BHMS Anatomy Study Module.',
      content: `${quickFactsText} ${sectionsText} ${mnemonicsText} NCH Competency: ${mod.nchCompetency}`,
      tags: [mod.title, mod.bodyRegion, 'anatomy', 'osteology', '1st bhms'],
      popularity: 7
    });
  });

  // 8. Index Physiology Modules
  Object.values(physiologyModules).forEach(mod => {
    const quickFactsText = `
      Definition: ${mod.quickFacts?.definition || ""}
      Primary Role: ${mod.quickFacts?.primaryRole || ""}
      Clinical Importance: ${mod.quickFacts?.clinicalImportance || ""}
    `;
    const explanationText = `
      Intro: ${mod.introduction || ""}
      Concepts: ${mod.basicConcepts || ""}
      Detailed: ${mod.detailedExplanation || ""}
      Applied Physiology: ${mod.appliedPhysiology || ""}
      Clinical Correlation: ${mod.clinicalCorrelation || ""}
    `;
    const disordersText = mod.importantDisorders?.map(d => `${d.name}: ${d.mechanism} (${d.symptoms})`).join("; ") || "";

    index.push({
      id: `physiology-${mod.id}`,
      title: mod.title,
      type: 'physiology',
      category: mod.system,
      link: `/physiology`,
      excerpt: mod.quickFacts?.oneLineRevision || '1st BHMS Physiology Study Module.',
      content: `${quickFactsText} ${explanationText} ${disordersText} NCH Competency: ${mod.nchCompetency}`,
      tags: [mod.title, mod.system, 'physiology', 'biochemistry', '1st bhms'],
      popularity: 7
    });
  });

  // 9. Index FMT Syllabus Sections
  FMT_SYLLABUS_DATA.forEach(section => {
    section.chapters.forEach(chap => {
      const subtopicsText = chap.subtopics.join(", ");
      index.push({
        id: `fmt-chap-${chap.chapterNumber}`,
        title: chap.title,
        type: 'fmt',
        category: section.sectionTitle,
        link: `/fmt`,
        excerpt: `Chapter ${chap.chapterNumber}: Covers ${chap.subtopics[0]} and other key legal forensic topics.`,
        content: `Chapter ${chap.chapterNumber} ${chap.title} Subtopics: ${subtopicsText} Jurisprudence ethical toxicology`,
        tags: [chap.title, 'fmt', 'forensic', 'toxicology', 'legal medicine', '2nd bhms'],
        popularity: 7
      });
    });
  });

  // 10. Index Stalwarts & Founders
  stalwartsData.forEach(stal => {
    const contentText = `
      Name: ${stal.name}
      Title: ${stal.title}
      Biography: ${stal.biography}
      Contributions: ${stal.contributions.join(", ")}
      Philosophy: ${stal.clinicalPhilosophy || ""}
      Works: ${stal.keyWorks?.join(", ") || ""}
    `;

    index.push({
      id: `stalwart-${stal.id}`,
      title: stal.name,
      type: 'stalwart',
      category: 'History',
      link: `/stalwarts`,
      excerpt: stal.description,
      content: contentText,
      tags: [stal.name, 'stalwart', 'pioneer', 'founder', 'history'],
      popularity: 6
    });
  });

  searchIndexCache = index;
  return index;
};

// Main intelligent, typo-tolerant search query engine
export const searchGlobalIndex = (query: string, activeType: string = 'all'): SearchResult[] => {
  const index = getSearchIndex();
  const qClean = query.trim().toLowerCase();
  
  if (!qClean) return [];

  // Check abbreviation expansion
  const expandedQuery = ABBREVIATIONS[qClean] || qClean;
  const qWords = expandedQuery.split(/\s+/).map(stemWord).filter(Boolean);

  if (qWords.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of index) {
    // If we have a filter active, filter out mismatched documents
    if (activeType !== 'all') {
      if (activeType === 'remedy' && doc.type !== 'remedy') continue;
      if (activeType === 'aphorism' && doc.type !== 'aphorism') continue;
      if (activeType === 'clinical' && doc.type !== 'ailment' && doc.type !== 'glossary') continue;
      if (activeType === 'academics' && doc.type !== 'anatomy' && doc.type !== 'physiology' && doc.type !== 'fmt') continue;
      if (activeType === 'article' && doc.type !== 'article' && doc.type !== 'stalwart') continue;
    }

    const docTitleLower = doc.title.toLowerCase();
    const docExcerptLower = doc.excerpt.toLowerCase();
    const docContentLower = doc.content.toLowerCase();
    
    let score = 0;
    const matchedWordsSet = new Set<string>();

    // 1. Exact Title Match
    if (docTitleLower === qClean) {
      score += 250;
      matchedWordsSet.add(qClean);
    } else if (docTitleLower.startsWith(qClean)) {
      score += 120;
      matchedWordsSet.add(qClean);
    } else if (docTitleLower.includes(qClean)) {
      score += 80;
      matchedWordsSet.add(qClean);
    }

    // 2. Keyword/Tag exact match
    for (const tag of doc.tags) {
      const tagLower = tag.toLowerCase();
      if (tagLower === qClean) {
        score += 90;
      } else if (tagLower.includes(qClean)) {
        score += 30;
      }
    }

    // 3. Synonym matching boost
    for (const [key, synList] of Object.entries(SYNONYMS)) {
      if (key === qClean || synList.includes(qClean)) {
        // Boost docs that match either the syn category key or syn elements
        if (docTitleLower.includes(key) || doc.tags.some(t => t.toLowerCase() === key)) {
          score += 100;
        }
        for (const word of synList) {
          if (docContentLower.includes(word)) {
            score += 20;
            matchedWordsSet.add(word);
          }
        }
      }
    }

    // 4. Word-by-word structural matching
    let wordsMatchedCount = 0;
    for (const word of qWords) {
      const stemW = stemWord(word);
      let matchInDoc = false;

      // Title check
      if (docTitleLower.includes(word) || docTitleLower.includes(stemW)) {
        score += 50;
        matchInDoc = true;
        matchedWordsSet.add(word);
      }
      
      // Tag check
      if (doc.tags.some(t => t.toLowerCase().includes(word) || t.toLowerCase().includes(stemW))) {
        score += 35;
        matchInDoc = true;
        matchedWordsSet.add(word);
      }

      // Excerpt check
      if (docExcerptLower.includes(word) || docExcerptLower.includes(stemW)) {
        score += 25;
        matchInDoc = true;
        matchedWordsSet.add(word);
      }

      // Body Content check
      if (docContentLower.includes(word) || docContentLower.includes(stemW)) {
        score += 10;
        matchInDoc = true;
        matchedWordsSet.add(word);
      }

      if (matchInDoc) {
        wordsMatchedCount++;
      }
    }

    // Boost if multiple words in multi-word query matched
    if (qWords.length > 1 && wordsMatchedCount > 0) {
      score += (wordsMatchedCount / qWords.length) * 60;
    }

    // 5. Typo-tolerance check via Levenshtein
    // Only perform for query tokens longer than 4 characters to avoid false hits
    if (qClean.length > 4 && score === 0) {
      const tokensInTitle = docTitleLower.split(/\s+/);
      for (const token of tokensInTitle) {
        if (Math.abs(token.length - qClean.length) <= 2) {
          const dist = levenshteinDistance(token, qClean);
          if (dist === 1) {
            score += 60; // extreme close match typo
            matchedWordsSet.add(token);
          } else if (dist === 2) {
            score += 30; // tolerable typo
            matchedWordsSet.add(token);
          }
        }
      }
    }

    // Filter out completely non-matching documents
    if (score <= 0) continue;

    // 6. Popularity Boost Multiplier
    const popFactor = 1 + (doc.popularity / 30); // Multiplier between 1.03x and 1.33x
    score = score * popFactor;

    // Create snippet with highlighted matched words
    let snippet = doc.excerpt;
    if (matchedWordsSet.size > 0) {
      const matchedWordsArr = Array.from(matchedWordsSet);
      let foundIndex = -1;
      let matchedTerm = "";

      // Look in content first for the matched term
      for (const mWord of matchedWordsArr) {
        const idx = docContentLower.indexOf(mWord.toLowerCase());
        if (idx !== -1) {
          foundIndex = idx;
          matchedTerm = mWord;
          break;
        }
      }

      if (foundIndex !== -1) {
        const start = Math.max(0, foundIndex - 60);
        const end = Math.min(doc.content.length, foundIndex + 90);
        let snippetText = doc.content.substring(start, end).trim();
        if (start > 0) snippetText = "..." + snippetText;
        if (end < doc.content.length) snippetText = snippetText + "...";
        snippet = snippetText;
      }
    }

    results.push({
      doc,
      score: Math.round(score),
      snippet: snippet || doc.excerpt,
      matchedWords: Array.from(matchedWordsSet)
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
};

// Dynamic search suggestions (zero-state, typing-state)
export const getSearchSuggestions = (query: string): string[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  
  const index = getSearchIndex();
  const suggestions = new Set<string>();

  // Check prefix matches in titles
  for (const doc of index) {
    if (doc.title.toLowerCase().startsWith(q)) {
      suggestions.add(doc.title);
    }
    if (suggestions.size >= 5) break;
  }

  // Check tags prefix matches
  if (suggestions.size < 5) {
    for (const doc of index) {
      for (const tag of doc.tags) {
        if (tag.toLowerCase().startsWith(q)) {
          suggestions.add(tag);
        }
        if (suggestions.size >= 5) break;
      }
      if (suggestions.size >= 5) break;
    }
  }

  return Array.from(suggestions);
};
