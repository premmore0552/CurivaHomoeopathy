import fs from 'fs';

async function main() {
  const url = 'https://r.jina.ai/https://share.gemini.google/BQsnOOio5x6f';
  console.log('Fetching Jina Reader proxy:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'text/plain'
      }
    });
    const text = await res.text();
    console.log('Successfully fetched from Jina Reader. Status:', res.status, 'Length:', text.length);
    fs.writeFileSync('./jina_output.txt', text);
    console.log('Saved to jina_output.txt');
  } catch (err: any) {
    console.error('Error fetching from Jina:', err.message);
  }
}
main();
