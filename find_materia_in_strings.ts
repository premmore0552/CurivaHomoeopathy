import fs from 'fs';

function main() {
  const content = fs.readFileSync('./decoded_strings.txt', 'utf8');
  const items = content.split('\n\n========================================================\n\n');
  console.log('Total items in decoded_strings.txt:', items.length);

  const keywords = ['pulsatilla', 'lycopodium', 'arsenicum', 'materia', 'medica', 'canvas', 'homeopathy', 'color', 'hex', 'brand', 'remedy', 'lexicon', 'class', 'import'];
  
  keywords.forEach(kw => {
    let matches: { idx: number; text: string }[] = [];
    items.forEach((item, idx) => {
      if (item.toLowerCase().includes(kw)) {
        matches.push({ idx, text: item });
      }
    });
    console.log(`Keyword "${kw}" matches found:`, matches.length);
    if (matches.length > 0) {
      console.log(`  Writing top 3 matches for "${kw}"...`);
      matches.slice(0, 3).forEach(m => {
        console.log(`    - Item #${m.idx} (length=${m.text.length})`);
        fs.writeFileSync(`./match_${kw}_${m.idx}.txt`, m.text);
      });
    }
  });
}

main();
