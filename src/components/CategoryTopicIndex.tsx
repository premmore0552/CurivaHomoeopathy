import React, { useState, useEffect } from 'react';
import { categories } from '../data/mockData';
import { BlogPost } from '../types';
import { fetchPosts } from '../services/api';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CategoryTopicIndex: React.FC = () => {
  const [postsByCategory, setPostsByCategory] = useState<Record<string, BlogPost[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllPosts = async () => {
      setIsLoading(true);
      try {
        const allPosts = await fetchPosts();
        const grouped = allPosts.reduce((acc, post) => {
          if (!acc[post.category]) acc[post.category] = [];
          acc[post.category].push(post);
          return acc;
        }, {} as Record<string, BlogPost[]>);
        setPostsByCategory(grouped);
      } catch (error) {
        console.error('Error loading posts for index:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Icons.Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-20">
      {categories.map((category) => {
        const categoryPosts = postsByCategory[category.name] || [];
        const Icon = (Icons as any)[category.icon];

        if (categoryPosts.length === 0) return null;

        return (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                  {category.name}
                </h2>
                <p className="text-text-secondary text-sm">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/read/${post.slug}`)}
                  className="group p-5 bg-bg-secondary rounded-2xl border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-xs mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider">
                    View Article <Icons.ChevronRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CategoryTopicIndex;
