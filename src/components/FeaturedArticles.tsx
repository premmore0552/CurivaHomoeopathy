import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Loader2,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { BlogPost } from "../types";
import { fetchPosts } from "../services/api";

import { trackEvent } from "../lib/analytics";

interface FeaturedArticlesProps {
  onSelectPost?: (post: BlogPost) => void;
  variant?: "section" | "sidebar";
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  onSelectPost,
  variant = "section",
}) => {
  const [featured, setFeatured] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (post: BlogPost) => {
    trackEvent('article_click', { article_id: post.id, article_title: post.title });
    if (onSelectPost) {
      onSelectPost(post);
    } else {
      navigate(`/read/${post.slug}`);
    }
  };

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchPosts();
        // For sidebar, we might want fewer items or just the top few
        setFeatured(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatured();
  }, []);

  if (variant === "sidebar") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold text-text-primary">
            Featured
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {featured.map((post) => (
              <div
                key={post.id}
                className="group cursor-pointer flex gap-4 items-center"
                onClick={() => handleCardClick(post)}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="py-24 bg-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary tracking-tighter italic">
                Latest <span className="text-primary not-italic">Research</span>
              </h2>
            </motion.div>
            <p className="text-lg text-text-secondary font-medium leading-relaxed opacity-80">
              Fresh insights into chronic management, acute prescribing, and the philosophy of the Law of Similars.
            </p>
          </div>
          <Link
            to="/materia-medica"
            className="flex items-center gap-3 px-8 py-4 bg-bg-secondary border border-border text-text-primary font-black uppercase tracking-widest text-[10px] rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-all w-fit shadow-sm group"
          >
            Explore Library <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/5] bg-bg-secondary rounded-[3rem] animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* The primary featured post (large) */}
            {featured[0] && (
              <motion.article
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => handleCardClick(featured[0])}
                className="group cursor-pointer lg:col-span-8 bg-bg-secondary rounded-[3rem] overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row shadow-sm min-h-[450px]"
              >
                <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={featured[0].image} 
                    alt={featured[0].title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 lg:from-transparent to-transparent" />
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
                    <span className="text-primary">{featured[0].category}</span>
                    <span className="opacity-30">•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{featured[0].readingTime || '8 min'}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display font-black text-text-primary mb-6 group-hover:text-primary transition-colors leading-tight">
                    {featured[0].title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-10 leading-relaxed font-medium opacity-80 line-clamp-3">
                    {featured[0].quickSummary?.[0] || featured[0].excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-5 transition-all mt-auto border-t border-border pt-8">
                    Read Discovery <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            )}

            {/* Side items */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {featured.slice(1, 3).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleCardClick(post)}
                  className="group cursor-pointer bg-bg-secondary rounded-[3rem] p-8 border border-border hover:border-primary/30 shadow-sm transition-all flex flex-col h-full"
                >
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] italic">
                    <span className="text-primary px-3 py-1 bg-primary/5 rounded-full not-italic">{post.category}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readingTime || '5 min'}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-text-primary group-hover:text-primary transition-colors leading-tight mb-6 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-4 transition-all mt-auto pt-6 border-t border-border/50">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
