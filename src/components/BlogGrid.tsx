import React, { useState, useEffect, useRef } from 'react';
import { categories } from '../data/mockData';
import { Search, Filter, Calendar, User, ArrowRight, Loader2, Library, Tag as TagIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../types';
import { fetchPosts } from '../services/api';

interface BlogGridProps {
  onSelectPost: (post: BlogPost) => void;
  initialTag?: string | null;
  initialCategory?: string | null;
}

const BlogGrid: React.FC<BlogGridProps> = ({ onSelectPost, initialTag, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTag) {
      setSelectedTag(initialTag);
    }
  }, [initialTag]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPosts(selectedCategory, searchQuery, selectedTag || undefined);
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(loadPosts, 300);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery, selectedTag]);

  return (
    <section id="blog" ref={gridRef} className="py-24 bg-bg-secondary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold text-text-primary">Educational Blog</h2>
          </div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Deep dive into our extensive library of articles on remedies, conditions, and holistic health.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-8 mb-12">
          {selectedCategory !== 'All' && !selectedTag && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bg-primary p-6 rounded-2xl border border-border"
            >
              <h3 className="text-2xl font-display font-bold text-primary mb-2">{selectedCategory}</h3>
              <p className="text-text-secondary">
                {categories.find(c => c.name === selectedCategory)?.description}
              </p>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === 'All' && !selectedTag
                ? 'bg-primary text-white shadow-md' 
                : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary border border-border'
              }`}
            >
              All Posts
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedTag(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat.name && !selectedTag
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary border border-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
            {selectedTag && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-md">
                <TagIcon className="w-3 h-3" />
                #{selectedTag}
                <button onClick={() => setSelectedTag(null)} className="hover:text-white/80">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-bg-primary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm dark:text-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          </div>
        </div>
      </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-bg-primary rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => onSelectPost(post)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider font-bold text-text-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(tag);
                          }}
                          className="text-[10px] bg-bg-secondary text-text-secondary px-2 py-0.5 rounded hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="w-full py-3 bg-bg-secondary text-text-primary font-bold text-sm rounded-xl group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPost(post);
                      }}
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-bg-primary p-8 rounded-3xl shadow-sm inline-block border border-border">
              <Filter className="w-12 h-12 text-text-secondary opacity-30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No articles found</h3>
              <p className="text-text-secondary">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


export default BlogGrid;
