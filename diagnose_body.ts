import fs from 'fs';

function main() {
  const html = fs.readFileSync('./destination.html', 'utf8');
  // Let us find if we have any text within div, p, span, or other text elements
  // We can strip all HTML tags and keep only text of length > 20
  const cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  console.log('Clean text length:', cleanText.length);
  console.log('Snippet of clean text:');
  console.log(cleanText.slice(0, 1500));
}
main();
