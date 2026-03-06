import { BlogPost } from '../types';

export const fetchPosts = async (category?: string, search?: string): Promise<BlogPost[]> => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);
  
  const response = await fetch(`/api/posts?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const fetchPostById = async (id: string): Promise<BlogPost> => {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};
