import { BlogPost } from '../types';
import { allBlogPosts } from '../data/blogPosts';

export const fetchPosts = async (category?: string, search?: string, tag?: string): Promise<BlogPost[]> => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (tag) params.append('tag', tag);
    
    const response = await fetch(`/api/posts?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.warn("API fetch failed, falling back to local blogPosts database:", error);
    
    // In-memory local filtering fallback
    let posts = [...allBlogPosts];
    
    if (category && category !== 'All') {
      posts = posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      posts = posts.filter(p => 
        p.title?.toLowerCase().includes(lowerSearch) || 
        p.excerpt?.toLowerCase().includes(lowerSearch) || 
        p.content?.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (tag) {
      posts = posts.filter(p => p.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    
    return posts;
  }
};

export const fetchPostById = async (id: string): Promise<BlogPost> => {
  try {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return await response.json();
  } catch (error) {
    console.warn(`API fetch post by ID (${id}) failed, falling back to local blogPosts database:`, error);
    const post = allBlogPosts.find(p => p.id === id);
    if (!post) throw new Error('Post not found in local database');
    return post;
  }
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost> => {
  try {
    const response = await fetch(`/api/posts/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return await response.json();
  } catch (error) {
    console.warn(`API fetch post by Slug (${slug}) failed, falling back to local blogPosts database:`, error);
    const post = allBlogPosts.find(p => p.slug === slug || p.id === slug);
    if (!post) throw new Error('Post not found in local database');
    return post;
  }
};
