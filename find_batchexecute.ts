import fs from 'fs';

function main() {
  const html = fs.readFileSync('./destination.html', 'utf8');
  const urls = html.match(/https?:\/\/[^\s"'`>]+/g) || [];
  console.log(`Found ${urls.length} raw URLs.`);

  const unique = Array.from(new Set(urls));
  console.log('Unique URLs count:', unique.length);

  console.log('--- Top 50 Unique URLs ---');
  unique.slice(0, 50).forEach(u => console.log(' ', u));
}

main();
