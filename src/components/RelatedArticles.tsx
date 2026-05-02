import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface RelatedArticlesProps {
  posts: BlogPost[];
  title?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts, title = "Keep Reading" }) => {
  if (!posts || posts.length === 0) return null;

  const titleWords = title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">
          {firstWord} <span className="text-primary italic">{restOfTitle}</span>
        </h3>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] group snap-start"
            >
              <Link to={`/read/${post.slug}`} className="block space-y-4">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-primary rounded-lg border border-primary/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime || '5 min read'}</span>
                  </div>
                  <h4 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-tight px-1">
                    {post.title}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
