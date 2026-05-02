import { BlogPost, Category } from '../types';
import { allBlogPosts } from './blogPosts';

export const categories: Category[] = [
  {
    id: 'materia-medica',
    name: 'Materia Medica',
    icon: 'BookOpen',
    description: 'Comprehensive study of homeopathic remedies, their symptoms, and origins.'
  },
  {
    id: 'conditions',
    name: 'Diseases and Conditions',
    icon: 'Stethoscope',
    description: 'Natural approaches to common and chronic ailments through homoeopathy.'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle and Natural Healing',
    icon: 'HeartPulse',
    description: 'Holistic living tips and natural healing guides for better health and vitality.'
  },
  {
    id: 'students',
    name: 'BHMS Course',
    icon: 'GraduationCap',
    description: 'Educational resources and study guides for aspiring homeopaths.'
  },
  {
    id: 'research',
    name: 'Research and Evidence',
    icon: 'Search',
    description: 'Scientific studies and evidence-based research in the field of homoeopathy.'
  }
];

export const blogPosts: BlogPost[] = allBlogPosts;
