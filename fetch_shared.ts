import fs from 'fs';

async function main() {
  try {
    const url = 'https://share.gemini.google/BQsnOOio5x6f';
    console.log('Fetching', url);
    const res = await fetch(url);
    const text = await res.text();
    console.log('Fetched successfully. Length:', text.length);
    fs.writeFileSync('./shared_content.html', text);
    console.log('Saved to shared_content.html');
  } catch (err) {
    console.error('Error fetching URL:', err);
  }
}
main();
