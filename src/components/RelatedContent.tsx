import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { allBlogPosts } from '../data/blogPosts';
import { BlogPost } from '../types';

interface RelatedContentProps {
  currentId: string;
  currentTags?: string[];
  currentRemedies?: string[];
  currentCategory?: string;
  title?: string;
}

export default function RelatedContent({
  currentId,
  currentTags = [],
  currentRemedies = [],
  currentCategory = '',
  title = "Related Educational Articles"
}: RelatedContentProps) {
  
  // Calculate dynamic similarity scores
  const getRelatedPosts = (): BlogPost[] => {
    const scored = allBlogPosts
      .filter((post) => post.id !== currentId) // exclude current
      .map((post) => {
        let score = 0;
        
        // 1. Category match
        if (currentCategory && post.category === currentCategory) {
          score += 3;
        }
        
        // 2. Tags match
        if (currentTags && currentTags.length > 0 && post.tags) {
          const commonTags = post.tags.filter((t) => currentTags.includes(t));
          score += commonTags.length * 2;
        }
        
        // 3. Related remedies match
        if (currentRemedies && currentRemedies.length > 0 && post.relatedRemedies) {
          const commonRemedies = post.relatedRemedies.filter((r) => currentRemedies.includes(r));
          score += commonRemedies.length * 4;
        }
        
        return { post, score };
      });

    // Sort by score descending and take top 3
    const topRelated = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.post);

    // If less than 3, backfill with default posts to ensure no orphan pages
    if (topRelated.length < 3) {
      const remainingNeeded = 3 - topRelated.length;
      const backfill = allBlogPosts
        .filter((post) => post.id !== currentId && !topRelated.some(r => r.id === post.id))
        .slice(0, remainingNeeded);
      
      return [...topRelated, ...backfill];
    }

    return topRelated.slice(0, 3);
  };

  const related = getRelatedPosts();

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-16 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <span className="mednix-section-subtitle text-xs">
            <BookOpen className="w-3.5 h-3.5" /> Next Steps in Study
          </span>
          <h3 className="text-2xl font-display font-semibold text-primary tracking-tight">
            {title}
          </h3>
        </div>
        <Link 
          to="/materia-medica" 
          className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 w-fit group"
        >
          Explore Full Materia Medica
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/read/${post.slug || post.id}`}
            className="group flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800/60 rounded-[2rem] shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-[10px] text-text-tertiary flex items-center gap-1 font-sans">
                  <Clock className="w-3 h-3" /> 5 min read
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-base font-display font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed font-sans line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
