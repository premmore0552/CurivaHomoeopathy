export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
