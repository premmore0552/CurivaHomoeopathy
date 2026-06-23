import fs from 'fs';

function extractAllStrings(val: any, list: string[] = []) {
  if (typeof val === 'string') {
    list.push(val);
  } else if (Array.isArray(val)) {
    for (const v of val) {
      extractAllStrings(v, list);
    }
  } else if (typeof val === 'object' && val !== null) {
    for (const k of Object.keys(val)) {
      extractAllStrings(val[k], list);
    }
  }
  return list;
}

function main() {
  const fileContent = fs.readFileSync('./global_data.json', 'utf8');
  const data = JSON.parse(fileContent);
  const strings = extractAllStrings(data);
  console.log('Total strings extracted:', strings.length);

  // Let's print string matches that contain typical reactive/coding keywords or contain 'html' / 'export' etc, or let's write all strings over length 200 to a file so we can search it.
  const largeStrings = strings.filter(s => s.length > 200);
  console.log('Strings over length 200:', largeStrings.length);

  // Write large strings to a file
  fs.writeFileSync('./large_strings_output.txt', largeStrings.join('\n\n=======================================================\n\n'));
  console.log('Saved all large strings to large_strings_output.txt');

  // Let's see if we can find any specifically relevant text, like 'class', 'import', 'Materia', 'rem', 'Remedy', or any React component style.
  const codeRelated = largeStrings.filter(s => {
    const l = s.toLowerCase();
    return l.includes('import ') || l.includes('function') || l.includes('class ') || l.includes('const ') || l.includes('remedy') || l.includes('materia');
  });

  console.log('Code or Homeopathy related large strings:', codeRelated.length);
  codeRelated.forEach((str, i) => {
    console.log(`\n--- Code-related String #${i + 1} (Length: ${str.length}) ---`);
    console.log(str.slice(0, 500));
    console.log('...\n');
  });
}

main();
