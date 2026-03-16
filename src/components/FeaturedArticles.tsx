import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';
import { fetchPosts } from '../services/api';

interface FeaturedArticlesProps {
  onSelectPost: (post: BlogPost) => void;
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ onSelectPost }) => {
  const [featured, setFeatured] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchPosts();
        setFeatured(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <section className="py-20 bg-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-display font-bold text-text-primary">Featured Articles</h2>
            </div>
            <p className="text-text-secondary max-w-2xl">
              Our most popular and insightful pieces on homeopathic practice and holistic wellness.
            </p>
          </div>
          <a href="#blog" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
            View all posts <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onSelectPost(post)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-bg-primary/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <button 
                    className="flex items-center gap-2 text-primary font-bold text-sm group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPost(post);
                    }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
