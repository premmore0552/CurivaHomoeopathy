import fs from 'fs';

function findStrings(obj: any, matches: string[] = []) {
  if (typeof obj === 'string') {
    if (obj.includes('class') || obj.includes('import ') || obj.includes('React') || obj.includes('function') || obj.includes('div') || obj.includes('svg')) {
      if (obj.length > 300) {
        matches.push(obj);
      }
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      findStrings(item, matches);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) {
      findStrings(obj[key], matches);
    }
  }
  return matches;
}

function main() {
  const html = fs.readFileSync('./shared_content.html', 'utf8');
  
  // Let us match: window.WIZ_global_data = { ... }
  // We can locate the index of "window.WIZ_global_data ="
  const marker = 'window.WIZ_global_data =';
  const index = html.indexOf(marker);
  if (index === -1) {
    console.log('window.WIZ_global_data not found');
    return;
  }
  
  // Find the JSON boundaries
  let brancount = 0;
  let jsonStart = html.indexOf('{', index);
  let jsonEnd = -1;
  for (let i = jsonStart; i < html.length; i++) {
    if (html[i] === '{') brancount++;
    else if (html[i] === '}') {
      brancount--;
      if (brancount === 0) {
        jsonEnd = i;
        break;
      }
    }
  }
  
  if (jsonEnd === -1) {
    console.log('Failed to find end of WIZ_global_data JSON');
    return;
  }
  
  const jsonText = html.slice(jsonStart, jsonEnd + 1);
  console.log('Extracted JSON Text of size', jsonText.length);
  
  try {
    const data = JSON.parse(jsonText);
    fs.writeFileSync('./global_data.json', JSON.stringify(data, null, 2));
    console.log('Wiz global data saved to global_data.json');
    
    // Search for code strings
    const codeStrings = findStrings(data);
    console.log(`Found ${codeStrings.length} potential code strings.`);
    codeStrings.forEach((str, i) => {
      console.log(`--- Code String ${i+1} (Length: ${str.length}) ---`);
      console.log(str.slice(0, 1000));
      console.log('...\n');
      fs.writeFileSync(`./extracted_string_${i+1}.txt`, str);
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
    // Let's search inside the text using regex for TSX component code
    const componentRegex = /export\s+default\s+function\s+\w+[\s\S]*?<\/div>/g;
    const compMatches = html.match(componentRegex);
    console.log('Component matches found via regex:', compMatches ? compMatches.length : 0);
  }
}

main();
