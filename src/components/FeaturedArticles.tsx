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
    <section className="py-12 bg-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-display font-bold text-text-primary">
                Featured Articles
              </h2>
            </div>
            <p className="text-text-secondary max-w-2xl">
              Our most popular and insightful pieces on homeopathic practice and
              holistic wellness.
            </p>
          </div>
          <Link
            to="/articles"
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* The primary featured post (large) */}
            {featured[0] && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, rotateX: 2, rotateY: 2, scale: 1.02 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                onClick={() => handleCardClick(featured[0])}
                className="group cursor-pointer flex flex-col h-full bg-bg-secondary rounded-[2rem] overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                  <img 
                    src={featured[0].image} 
                    alt={featured[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                    <span className="px-4 py-2 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl shadow-lg border border-black/10">
                      Top Story
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">
                    <span className="text-primary font-black">{featured[0].category}</span>
                    <span className="opacity-50">•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured[0].readingTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-text-primary mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-3">
                    {featured[0].title}
                  </h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 flex-1 opacity-90 line-clamp-3">
                    {featured[0].quickSummary?.[0] || featured[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-sm tracking-widest group/btn bg-primary/5 w-fit px-6 py-3 rounded-xl border border-primary/10">
                    Read Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.article>
            )}

            {/* Next two featured posts (stacked) */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {featured.slice(1, 3).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5, rotateY: -2, rotateX: 2 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  onClick={() => handleCardClick(post)}
                  className="group cursor-pointer flex flex-col sm:flex-row h-full lg:h-1/2 gap-6 bg-bg-secondary lg:bg-transparent rounded-3xl p-4 lg:p-0 border border-border lg:border-none shadow-sm lg:shadow-none hover:bg-bg-secondary/50 transition-colors"
                >
                  <div className="w-full sm:w-2/5 aspect-video sm:h-full relative rounded-2xl overflow-hidden shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                  </div>
                  <div className="flex flex-col justify-center flex-1 py-1 sm:py-3">
                    <div className="flex items-center gap-3 mb-2.5 text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-wider">
                      <span className="text-primary bg-primary/10 px-2 py-1 rounded-md">{post.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime || '4 min'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-3 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary line-clamp-2 leading-relaxed text-sm opacity-90 hidden sm:block">
                       {post.quickSummary?.[0] || post.excerpt}
                    </p>
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
