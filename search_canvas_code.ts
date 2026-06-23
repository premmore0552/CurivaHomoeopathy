import fs from 'fs';

function main() {
  const fileContent = fs.readFileSync('./decoded_strings.txt', 'utf8');
  const items = fileContent.split('\n\n========================================================\n\n');
  console.log(`Loaded ${items.length} decoded items.`);

  let index = 0;
  for (const item of items) {
    if (item.includes('import ') || item.includes('function ') || item.includes('const ') || item.includes('<Canvas') || item.includes('Canvas') || item.includes('materia') || item.includes('Materia')) {
      // Print first 400 characters and last 400 characters of each match
      console.log(`\n================= MATCH #${index + 1} (Length: ${item.length}) =================`);
      if (item.length < 1500) {
        console.log(item);
      } else {
        console.log('START:');
        console.log(item.slice(0, 1000));
        console.log('\n...\nEND:');
        console.log(item.slice(-1000));
      }
      // Save code blocks to dedicated files
      fs.writeFileSync(`./canvas_match_${index + 1}.txt`, item);
      index++;
    }
  }
}

main();
