export type NavigationItem = { label: string; description: string; to: string };
export type NavigationGroup = { label: 'Learn' | 'Practice' | 'Library' | 'Guidance'; to: string; description: string; items: NavigationItem[] };

// One source of truth for desktop mega-menus and the mobile navigation drawer.
export const navigationGroups: NavigationGroup[] = [
  { label: 'Learn', to: '/subjects', description: 'Follow the BHMS curriculum and continue from your last study session.', items: [
    { label: 'All subjects', description: 'Browse the complete learning map', to: '/subjects' },
    { label: 'BHMS years', description: 'Open the professional-year portals', to: '/student-resources' },
    { label: 'Study toolkit', description: 'Plan focused study sessions', to: '/study-toolkit' },
    { label: 'Free books', description: 'Read curated learning resources', to: '/free-books' }
  ] },
  { label: 'Practice', to: '/quizzes', description: 'Strengthen recall with quizzes, flashcards and exam preparation.', items: [
    { label: 'Question practice', description: 'Test understanding by subject', to: '/quizzes' },
    { label: 'AIAPGET MCQ simulator', description: 'Prepare with exam-style questions', to: '/aiapget-mcq-simulator' },
    { label: 'Flashcards', description: 'Review concepts with active recall', to: '/flashcards' },
    { label: 'Visual study maps', description: 'Explore relationships between topics', to: '/visualization' }
  ] },
  { label: 'Library', to: '/materia-medica', description: 'Explore reference material for structured academic learning.', items: [
    { label: 'Materia Medica', description: 'Study classical remedy references', to: '/materia-medica' },
    { label: 'Repertory', description: 'Explore rubrics and repertory structure', to: '/repertory' },
    { label: 'Public education', description: 'Read plain-language health guides', to: '/public-education' },
    { label: 'My library', description: 'Return to saved learning resources', to: '/library' }
  ] },
  { label: 'Guidance', to: '/about', description: 'Learn about Curiva, its educational standards and support.', items: [
    { label: 'About Curiva', description: 'Understand the platform', to: '/about' },
    { label: 'Learning support', description: 'Find answers and study guidance', to: '/faq' },
    { label: 'Privacy', description: 'Review account and data controls', to: '/privacy-policy' },
    { label: 'Medical disclaimer', description: 'Understand the educational-use boundary', to: '/disclaimer' }
  ] }
];

export const quickNavigationItems: NavigationItem[] = [
  { label: 'Materia Medica', description: 'Classical remedy references', to: '/materia-medica' },
  { label: 'Repertory', description: 'Rubrics and repertory study', to: '/repertory' },
  { label: 'Clinical Guides', description: 'Structured learning references', to: '/clinical-guides' },
  { label: 'BHMS Syllabus', description: 'Professional-year study hubs', to: '/student-resources' },
  { label: 'Flashcards', description: 'Active-recall practice', to: '/flashcards' },
  { label: 'Study Toolkit', description: 'Organise focused study', to: '/study-toolkit' }
];