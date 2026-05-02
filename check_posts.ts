
import { allBlogPosts } from './src/data/blogPosts';

const postsMissingSlug = allBlogPosts.filter(p => !p.slug);
if (postsMissingSlug.length > 0) {
  console.log(`Found ${postsMissingSlug.length} posts missing slugs:`);
  postsMissingSlug.forEach(p => console.log(`- ID: ${p.id}, Title: ${p.title}`));
} else {
  console.log('All posts have slugs.');
}

const duplicateSlugs = allBlogPosts.reduce((acc, p) => {
  if (p.slug) {
    acc[p.slug] = (acc[p.slug] || 0) + 1;
  }
  return acc;
}, {} as Record<string, number>);

const repeated = Object.entries(duplicateSlugs).filter(([_, count]) => count > 1);
if (repeated.length > 0) {
  console.log('Found duplicate slugs:');
  repeated.forEach(([slug, count]) => console.log(`- ${slug}: ${count} times`));
} else {
  console.log('No duplicate slugs found in the data.');
}
