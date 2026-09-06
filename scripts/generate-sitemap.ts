import fs from 'fs';
import path from 'path';

// Production domain
const DOMAIN = 'https://curivahomoeopathy.netlify.app';

// Static routes from App.tsx
const STATIC_ROUTES = [
  '',
  '/about',
  '/contact',
  '/faq',
  '/disclaimer',
  '/privacy-policy',
  '/terms-of-service',
  '/materia-medica',
  '/organon-philosophy',
  '/miasms',
  '/repertory',
  '/analysis',
  '/visualization',
  '/symptom-checker',
  '/student-resources',
  '/subjects',
  '/blueprints',
  '/flashcards',
  '/quizzes',
  '/aiapget-mcq-simulator',
  '/clinical-therapeutics',
  '/portal/1st-bhms',
  '/portal/2nd-bhms',
  '/portal/3rd-bhms',
  '/portal/4th-bhms',
  '/anatomy',
  '/physiology',
  '/fmt',
  '/disease-hub',
  '/disease-hub/directory',
  '/lexicon',
  '/public-education',
  '/ebooks',
  '/stalwarts',
  '/clinical-handbook',
  '/cbc-handbook',
  '/cbdc-syllabus',
];

// Helper to generate XML entry
const createEntry = (url: string, priority: string = '0.5', changefreq: string = 'monthly') => {
  return `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

async function generateSitemap() {
  console.log('Generating sitemap...');
  let entries: string[] = [];

  // Add static routes
  STATIC_ROUTES.forEach(route => {
    const priority = route === '' ? '1.0' : '0.8';
    entries.push(createEntry(route, priority, 'weekly'));
  });

  // Dynamic Routes - Materia Medica
  try {
    const { materiaMedicaData } = await import('../src/data/materiaMedica.ts');
    materiaMedicaData.forEach((remedy: any) => {
      entries.push(createEntry(`/materia-medica/${remedy.id}`, '0.7'));
    });
  } catch (e) {
    console.warn('Could not load materiaMedicaData for sitemap');
  }

  // Dynamic Routes - eBooks
  try {
    const { EBOOKS_DATABASE } = await import('../src/data/ebooksData.ts');
    EBOOKS_DATABASE.forEach((book: any) => {
      entries.push(createEntry(`/ebooks/${book.id}`, '0.7'));
    });
  } catch (e) {
    console.warn('Could not load EBOOKS_DATABASE for sitemap');
  }

  // Dynamic Routes - Diseases
  try {
    const { diseaseHubData, DISEASE_SYSTEMS } = await import('../src/data/diseaseHubData.ts');
    
    // Systems
    DISEASE_SYSTEMS.forEach((system: any) => {
      entries.push(createEntry(`/disease-hub/${system.id}`, '0.6'));
    });

    // Individual diseases
    diseaseHubData.forEach((disease: any) => {
      entries.push(createEntry(`/disease-hub/${disease.system}/${disease.slug}`, '0.7'));
    });
  } catch (e) {
    console.warn('Could not load diseaseHubData for sitemap');
  }

  // Dynamic Routes - Blog Posts / Articles
  try {
    const { allBlogPosts } = await import('../src/data/blogPosts.ts');
    allBlogPosts.forEach((post: any) => {
      entries.push(createEntry(`/articles/${post.slug}`, '0.7'));
    });
  } catch (e) {
    console.warn('Could not load allBlogPosts for sitemap');
  }

  // Conditions
  try {
    const { conditionsData } = await import('../src/data/conditionsData.ts');
    conditionsData.forEach((condition: any) => {
      entries.push(createEntry(`/conditions/${condition.id}`, '0.6'));
    });
  } catch (e) {}

  // Stalwarts
  try {
    const { stalwartsData } = await import('../src/data/stalwartsData.ts');
    stalwartsData.forEach((stalwart: any) => {
      entries.push(createEntry(`/stalwarts/${stalwart.id}`, '0.6'));
    });
  } catch (e) {}

  // Anatomy Topics
  try {
    const { anatomyModules } = await import('../src/data/anatomyModulesData.ts');
    anatomyModules.forEach((module: any) => {
      module.topics.forEach((topic: any) => {
        entries.push(createEntry(`/anatomy/${topic.id}`, '0.6'));
      });
    });
  } catch (e) {}

  // Physiology Topics
  try {
    const { physiologyModules } = await import('../src/data/physiologyModulesData.ts');
    physiologyModules.forEach((module: any) => {
      module.topics.forEach((topic: any) => {
        entries.push(createEntry(`/physiology/${topic.id}`, '0.6'));
      });
    });
  } catch (e) {}

  // FMT Modules/Chapters
  try {
    const { fmtModules } = await import('../src/data/fmtModulesData.ts');
    fmtModules.forEach((module: any) => {
      entries.push(createEntry(`/fmt/learn/${module.id}`, '0.6'));
      if (module.chapters) {
        module.chapters.forEach((chapter: any) => {
          entries.push(createEntry(`/fmt/learn/${module.id}/${chapter.id}`, '0.6'));
        });
      }
    });
  } catch (e) {}

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemap);
  console.log(`Sitemap generated successfully at ${publicPath} with ${entries.length} URLs.`);
}

generateSitemap();
