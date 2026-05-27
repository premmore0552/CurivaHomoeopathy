import { BlogPost } from '../types';
import { UserProfile } from './userService';

/**
 * Generates personalized content recommendations based on a user's reading history
 * and bookmarked items using a tag-weight and category-weight scoring system.
 */
export function getPersonalizedRecommendations(
  profile: UserProfile | null,
  allPosts: BlogPost[],
  limit: number = 4
): BlogPost[] {
  if (!profile) {
    // If guest, recommend a diverse set of articles across different categories
    return getFallbackRecommendations(allPosts, limit);
  }

  const bookmarkedSlugs = profile.bookmarks || [];
  const readSlugs = (profile.readingHistory || []).map(item => item.postId);
  
  // Set of already interacted posts to avoid repeating them in recommendations
  const interactedSlugs = new Set([...bookmarkedSlugs, ...readSlugs]);

  // If the user has zero interactions, provide diverse fallback contents
  if (interactedSlugs.size === 0) {
    return getFallbackRecommendations(allPosts, limit);
  }

  // Calculate weights for categories and tags based on user engagement.
  // Bookmarks are heavily weighted, history is moderately weighted.
  const categoryWeights: Record<string, number> = {};
  const tagWeights: Record<string, number> = {};

  // Track bookmarked content weights
  bookmarkedSlugs.forEach(slug => {
    const post = allPosts.find(p => p.slug === slug || p.id === slug);
    if (post) {
      // Category weight
      categoryWeights[post.category] = (categoryWeights[post.category] || 0) + 15;
      // Tag weights
      post.tags.forEach(tag => {
        tagWeights[tag] = (tagWeights[tag] || 0) + 10;
      });
    }
  });

  // Track historically read content weights
  readSlugs.forEach(slug => {
    const post = allPosts.find(p => p.slug === slug || p.id === slug);
    if (post) {
      // Category weight
      categoryWeights[post.category] = (categoryWeights[post.category] || 0) + 5;
      // Tag weights
      post.tags.forEach(tag => {
        tagWeights[tag] = (tagWeights[tag] || 0) + 3;
      });
    }
  });

  // Score remaining posts
  const scoredPosts = allPosts
    .filter(post => !interactedSlugs.has(post.slug) && !interactedSlugs.has(post.id))
    .map(post => {
      let score = 0;

      // Category match
      if (categoryWeights[post.category]) {
        score += categoryWeights[post.category];
      }

      // Tag matches
      post.tags.forEach(tag => {
        if (tagWeights[tag]) {
          score += tagWeights[tag];
        }
      });

      return { post, score };
    });

  // Sort descending by score. If scores are equal, sort randomly or by date to add dynamic feel.
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Secondary tie-breaker: Date comparison
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  const recommended = scoredPosts.slice(0, limit).map(item => item.post);

  // If we don't have enough personalized recommendations, pad them with fallbacks
  if (recommended.length < limit) {
    const remainingCount = limit - recommended.length;
    const fallbacks = allPosts.filter(
      p => !interactedSlugs.has(p.slug) && !interactedSlugs.has(p.id) && !recommended.some(r => r.id === p.id)
    );
    recommended.push(...fallbacks.slice(0, remainingCount));
  }

  return recommended;
}

/**
 * Fallback recommendations helper to find a set of diverse, clinical posts
 */
function getFallbackRecommendations(allPosts: BlogPost[], limit: number): BlogPost[] {
  // Select top posts from diverse categories to introduce the user to multiple topics
  const categoriesSeen = new Set<string>();
  const diverseList: BlogPost[] = [];
  
  // Try to find one from each unique category first
  for (const post of allPosts) {
    if (!categoriesSeen.has(post.category)) {
      diverseList.push(post);
      categoriesSeen.add(post.category);
    }
    if (diverseList.length >= limit) break;
  }

  // If we need more to meet limit
  if (diverseList.length < limit) {
    for (const post of allPosts) {
      if (!diverseList.some(p => p.id === post.id)) {
        diverseList.push(post);
      }
      if (diverseList.length >= limit) break;
    }
  }

  return diverseList.slice(0, limit);
}
