import { BlogPost, Category } from '../types';
import { allBlogPosts } from './blogPosts';

export const categories: Category[] = [
  {
    id: 'remedies',
    name: 'Homoeopathic Remedies',
    icon: 'Leaf',
    description: 'In-depth profiles of key homeopathic medicines.'
  },
  {
    id: 'conditions',
    name: 'Disease & Conditions',
    icon: 'Stethoscope',
    description: 'Natural approaches to common and chronic ailments.'
  },
  {
    id: 'materia-medica',
    name: 'Materia Medica',
    icon: 'BookOpen',
    description: 'Comprehensive study of remedy symptoms and origins.'
  },
  {
    id: 'students',
    name: 'Homoeopathy for Students',
    icon: 'GraduationCap',
    description: 'Educational resources for aspiring homeopaths.'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Natural Healing',
    icon: 'HeartPulse',
    description: 'Holistic living tips for better health and vitality.'
  },
  {
    id: 'research',
    name: 'Research & Evidence',
    icon: 'Search',
    description: 'Scientific studies and evidence-based homoeopathy.'
  }
];

export const blogPosts: BlogPost[] = allBlogPosts;
