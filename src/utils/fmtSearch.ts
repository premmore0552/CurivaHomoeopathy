import { FMT_DETAILED_CHAPTERS, FMTChapterDetail } from '../data/fmtDetailedChapters';

export interface SearchResult {
  topic: FMTChapterDetail;
  relevance: number;
  matchType: 'title' | 'tag' | 'description' | 'content';
}

export const searchFMTTopics = (query: string): SearchResult[] => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  
  return FMT_DETAILED_CHAPTERS.map(topic => {
    let relevance = 0;
    let matchType: SearchResult['matchType'] = 'content';

    // Title match (Highest priority)
    if (topic.title.toLowerCase() === lowerQuery) {
      relevance = 100;
      matchType = 'title';
    } else if (topic.title.toLowerCase().includes(lowerQuery)) {
      relevance = 80;
      matchType = 'title';
    }

    // Tags match
    if (topic.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      relevance = Math.max(relevance, 60);
      matchType = relevance === 60 ? 'tag' : matchType;
    }

    // Description match
    if (topic.description?.toLowerCase().includes(lowerQuery)) {
      relevance = Math.max(relevance, 40);
      matchType = relevance === 40 ? 'description' : matchType;
    }

    // Module/Section match
    if (topic.module?.toLowerCase().includes(lowerQuery) || topic.section.toLowerCase().includes(lowerQuery)) {
      relevance = Math.max(relevance, 30);
    }

    return { topic, relevance, matchType };
  })
  .filter(result => result.relevance > 0)
  .sort((a, b) => b.relevance - a.relevance);
};

export const getRelatedTopics = (topic: FMTChapterDetail): FMTChapterDetail[] => {
  if (!topic.relatedTopics) return [];
  
  return topic.relatedTopics
    .map(id => FMT_DETAILED_CHAPTERS.find(ch => ch.id === id))
    .filter((ch): ch is FMTChapterDetail => !!ch);
};
