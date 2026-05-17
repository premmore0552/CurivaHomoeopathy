import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import FeaturedArticles from "../components/FeaturedArticles";
import BlogGrid from "../components/BlogGrid";
import PostDetail from "../components/PostDetail";
import SEO from "../components/SEO";
import { Newspaper } from "lucide-react";
import { BlogPost } from "../types";
import { fetchPostBySlug } from "../services/api";
import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import FeaturedQuestions from "../components/FeaturedQuestions";

export default function Articles() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/read/${post.slug}`);
  };

  // Scroll to top on route change or post selection
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, slug]);

  useEffect(() => {
    if (slug) {
      const loadPost = async () => {
        try {
          const post = await fetchPostBySlug(slug);
          setSelectedPost(post);
        } catch (error) {
          console.error("Error fetching post by slug:", error);
          navigate("/articles");
        }
      };
      loadPost();
    } else {
      setSelectedPost(null);
    }
  }, [slug, navigate]);

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => {
          navigate("/articles");
        }}
        onTagClick={(tag) => {
          navigate(`/articles?tag=${encodeURIComponent(tag)}&page=1`);
        }}
        onSelectPost={handleSelectPost}
      />
    );
  }

  return (
    <>
      <SEO
        title="Educational Blog | Curiva Homoeopathy"
        description="Deep dive into the world of homoeopathy with our curated articles and educational resources."
      />
      <main className="bg-bg-primary transition-colors duration-300 pb-12">
        <div className="pt-20 pb-16 bg-bg-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-[2rem] text-primary mb-6 shadow-sm border border-primary/20">
              <Newspaper className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-text-primary mb-6 tracking-tight">
              Educational <span className="text-primary italic">Articles</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 relative z-10">
              Discover natural healing insights, student-curated research, and trusted
              guides to help you explore the patterns of holistic wellness.
            </p>
            <div className="inline-flex items-center justify-center gap-2 bg-primary/5 text-primary px-5 py-2.5 rounded-full font-bold text-sm border border-primary/20 relative z-10 uppercase tracking-widest">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse block"></span>
               Evidence-Based Homoeopathy Awareness
            </div>
          </div>
        </div>

        {/* We can use the default section variant of Featured Articles */}
        <FeaturedArticles onSelectPost={handleSelectPost} />

        <FeaturedQuestions />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div id="blog-grid" className="scroll-mt-24">
              <BlogGrid onSelectPost={handleSelectPost} />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
