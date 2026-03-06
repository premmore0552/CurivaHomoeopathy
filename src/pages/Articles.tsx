import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FeaturedArticles from '../components/FeaturedArticles';
import Categories from '../components/Categories';
import EducationalHighlight from '../components/EducationalHighlight';
import BlogGrid from '../components/BlogGrid';
import PostDetail from '../components/PostDetail';
import SEO from '../components/SEO';
import { Newspaper } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchPostById } from '../services/api';

export default function Articles() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      const loadPost = async () => {
        try {
          const post = await fetchPostById(postId);
          setSelectedPost(post);
        } catch (error) {
          console.error('Error fetching post by ID:', error);
          setSearchParams({});
        }
      };
      loadPost();
    }
  }, [searchParams, setSearchParams]);

  if (selectedPost) {
    return (
      <PostDetail 
        post={selectedPost} 
        onBack={() => {
          setSelectedPost(null);
          setSearchParams({});
        }} 
      />
    );
  }

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setSearchParams({ post: post.id });
  };

  return (
    <>
      <SEO 
        title="Explore Articles | Curiva Homoeopathy" 
        description="Deep dive into the world of homoeopathy with our curated articles and educational resources."
      />
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
              Explore Articles
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover natural healing insights, patient stories, and educational guides to help you on your wellness journey.
          </p>
        </div>
        
        <FeaturedArticles onSelectPost={handleSelectPost} />
        <Categories />
        <EducationalHighlight />
        <BlogGrid onSelectPost={handleSelectPost} />
      </main>
    </>
  );
}
