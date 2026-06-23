import fs from 'fs';

function main() {
  const html = fs.readFileSync('./shared_content.html', 'utf8');
  console.log('Searching for AF_initDataCallback or other data binders...');

  // Search for any script contents containing AF_initDataCallback
  const matches = html.match(/AF_initDataCallback\s*\([\s\S]*?\)/g) || [];
  console.log('Matches found:', matches.length);
  matches.forEach((m, idx) => {
    console.log(`Match ${idx + 1} length:`, m.length);
    // Write matches to separate files so we can inspect
    fs.writeFileSync(`./init_data_${idx + 1}.js`, m);
    // print first 500 chars of each match
    console.log(`First 500 chars of Match ${idx + 1}:`);
    console.log(m.slice(0, 500));
  });

  // Let's also check if there are other data stores
  const storeMatches = html.match(/WIDGET_CONFIG\s*=\s*[\s\S]*?;/g) || [];
  console.log('WIDGET_CONFIG matches:', storeMatches.length);
  storeMatches.forEach((m, idx) => {
    console.log(`WIDGET_CONFIG Match ${idx + 1} length:`, m.length);
    console.log(m.slice(0, 500));
  });
}

main();
