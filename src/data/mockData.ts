import { BlogPost, Category } from '../types';
import { allBlogPosts } from './blogPosts';

export const categories: Category[] = [
  {
    id: 'remedies',
    name: 'Homeopathic Remedies',
    icon: 'Droplets',
    description: 'In-depth profiles and clinical applications of individual remedies.'
  },
  {
    id: 'conditions',
    name: 'Disease & Conditions',
    icon: 'Stethoscope',
    description: 'Natural approaches to common and chronic ailments through homoeopathy.'
  },
  {
    id: 'materia-medica',
    name: 'Materia Medica',
    icon: 'BookOpen',
    description: 'Comprehensive study of Homoeopathic remedies, their symptoms, and origins.'
  },
  {
    id: 'students',
    name: 'Homeopathy for Students',
    icon: 'GraduationCap',
    description: 'Educational resources and study guides for aspiring Homoeopaths.'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Natural Healing',
    icon: 'HeartPulse',
    description: 'Holistic living tips and natural healing guides for better health and vitality.'
  },
  {
    id: 'research',
    name: 'Research & Evidence',
    icon: 'Search',
    description: 'Scientific studies and evidence-based research in the field of homoeopathy.'
  }
];

export const blogPosts: BlogPost[] = allBlogPosts;
