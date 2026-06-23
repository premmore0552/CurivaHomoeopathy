import fs from 'fs';

async function main() {
  const url = 'https://gemini.google.com/share/351813b0b074';
  console.log('Fetching', url);
  const res = await fetch(url);
  const html = await res.text();
  console.log('Direct status:', res.status);
  console.log('Direct length:', html.length);
  fs.writeFileSync('./direct_share.html', html);
  
  // Search for any strings containing "remedy" or similar
  const terms = ['remedy', 'materia', 'color', 'canvas', 'class', 'import'];
  terms.forEach(t => {
    const rx = new RegExp(t, 'gi');
    console.log(`Direct contains "${t}":`, (html.match(rx) || []).length);
  });
}

main();
