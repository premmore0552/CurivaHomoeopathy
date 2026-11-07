export type NavigationItem = { label: string; description: string; to: string };
export type NavigationGroup = { label: 'Learn' | 'Practice' | 'Library' | 'Guidance'; to: string; description: string; items: NavigationItem[] };

// One source of truth for desktop mega-menus and the mobile navigation drawer.
export const navigationGroups: NavigationGroup[] = [
  { label: 'Learn', to: '/subjects', description: 'Follow the BHMS curriculum and continue from your last study session.', items: [
    { label: 'All subjects', description: 'Browse the complete learning map', to: '/subjects' },
    { label: 'BHMS years', description: 'Open the professional-year portals', to: '/student-resources' },
    { label: 'CBDC syllabus', description: 'Explore the competency-based curriculum', to: '/cbdc-syllabus' },
    { label: 'Study toolkit', description: 'Plan focused study sessions', to: '/study-toolkit' },
    { label: 'Free books', description: 'Read curated learning resources', to: '/free-books' },
    { label: 'Full syllabus', description: 'Browse the subject-wise syllabus', to: '/syllabus' }
  ] },
  { label: 'Practice', to: '/quizzes', description: 'Strengthen recall with quizzes, flashcards and exam preparation.', items: [
    { label: 'Question practice', description: 'Test understanding by subject', to: '/quizzes' },
    { label: 'MCQ practice', description: 'Practise topic-wise multiple-choice questions', to: '/mcq-practice' },
    { label: 'AIAPGET MCQ simulator', description: 'Prepare with exam-style questions', to: '/aiapget-mcq-simulator' },
    { label: 'Viva questions', description: 'Prepare structured oral examination answers', to: '/student-academy/viva-questions' },
    { label: 'Flashcards', description: 'Review concepts with active recall', to: '/flashcards' },
    { label: 'Student MCQ academy', description: 'Explore the dedicated question academy', to: '/student-academy/mcq-practice' }
  ] },
  { label: 'Library', to: '/materia-medica', description: 'Explore reference material for structured academic learning.', items: [
    { label: 'Materia Medica', description: 'Study classical remedy references', to: '/materia-medica' },
    { label: 'Repertory', description: 'Explore rubrics and repertory structure', to: '/repertory' },
    { label: 'Organon', description: 'Study principles and philosophy', to: '/organon-philosophy' },
    { label: 'Anatomy', description: 'Revise structural anatomy', to: '/anatomy' },
    { label: 'Physiology', description: 'Revise normal function and systems', to: '/physiology' },
    { label: 'Clinical guides', description: 'Browse structured learning references', to: '/clinical-guides' },
    { label: 'E-books', description: 'Open the digital reading collection', to: '/ebooks' },
    { label: 'My library', description: 'Return to saved learning resources', to: '/library' }
  ] },
  { label: 'Guidance', to: '/about', description: 'Learn about Curiva, its educational standards and support.', items: [
    { label: 'About Curiva', description: 'Understand the platform', to: '/about' },
    { label: 'Learning support', description: 'Find answers and study guidance', to: '/faq' },
    { label: 'Research', description: 'Browse academic research resources', to: '/research' },
    { label: 'Contact and feedback', description: 'Send feedback or contact the team', to: '/feedback' },
    { label: 'Privacy', description: 'Review account and data controls', to: '/privacy-policy' },
    { label: 'Medical disclaimer', description: 'Understand the educational-use boundary', to: '/disclaimer' },
    { label: 'Terms of service', description: 'Review platform terms', to: '/terms-of-service' }
  ] }
];

export const quickNavigationItems: NavigationItem[] = [
  { label: 'Materia Medica', description: 'Classical remedy references', to: '/materia-medica' },
  { label: 'Repertory', description: 'Rubrics and repertory study', to: '/repertory' },
  { label: 'Clinical Guides', description: 'Structured learning references', to: '/clinical-guides' },
  { label: 'BHMS Syllabus', description: 'Professional-year study hubs', to: '/student-resources' },
  { label: 'Flashcards', description: 'Active-recall practice', to: '/flashcards' },
  { label: 'Study Toolkit', description: 'Organise focused study', to: '/study-toolkit' },
  { label: 'Anatomy', description: 'Build structural foundations', to: '/anatomy' },
  { label: 'Organon', description: 'Review principles and philosophy', to: '/organon-philosophy' }
];