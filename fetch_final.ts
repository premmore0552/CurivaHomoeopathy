import fs from 'fs';

async function main() {
  const url = 'https://gemini.google.com/share/351813b0b074?skid=65f8d135-d2ff-47e5-a334-ceff56dfe7dc';
  console.log('Fetching destination URL:', url);
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  console.log('Fetched destination successfully. Length:', html.length);
  fs.writeFileSync('./destination.html', html);

  // Search inside destination.html for typical terms case-insensitively
  const terms = ['materia', 'remedy', 'canvas', 'Homoeopath', 'card', 'color', 'theme', 'brand'];
  terms.forEach(t => {
    const rx = new RegExp(t, 'gi');
    const matches = html.match(rx);
    console.log(`Matched "${t}":`, matches ? matches.length : 0);
  });

  // Let's print occurrences of any scripts or JSON arrays that might contain conversation data
  // Google's dynamic share content is usually embedded in a big chunk of script under "c2as" or similar databinders.
  const regex = /c2as/gi;
  console.log('Occurrences of "c2as":', (html.match(regex) || []).length);
  
  // Let us save all scripts that contain long content to see what is inside
  const scripts = html.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi) || [];
  console.log('Found script tags:', scripts.length);
  scripts.forEach((s, idx) => {
    if (s.length > 5000) {
      console.log(`Script #${idx} has length ${s.length}`);
      fs.writeFileSync(`./destination_script_${idx}.js`, s);
    }
  });
}
main();
