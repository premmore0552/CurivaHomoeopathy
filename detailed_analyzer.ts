import fs from 'fs';

function main() {
  const html = fs.readFileSync('./destination.html', 'utf8');
  console.log('HTML read. Searching for occurrences of words or structures...');

  // Let's search if there are any embedded JSON data or string blocks
  // Sometimes characters are stored as unicode escapes (e.g., \u003c for <, \u003e for >).
  // Let's write a regular expression to search for things like state data
  // Google's preloaded data usually lives inside a function call or a variable like WIZ_global_data or AF_initDataCallback.
  // There is a global variable window.WIZ_global_data that was of size 195725.
  // Let's scan for any substantial base64 or JSON blocks in destination.html.
  
  // Let's extract any string matching a regex for code:
  const possibleReactCode = html.match(/useState|useEffect|import\s+React|className|lucide-react/gi);
  console.log('Possibility counts:', possibleReactCode ? possibleReactCode.length : 0);

  // Let's write all sentences or substrings of interest (length > 100 with letters and spaces) to a file to search
  const textStrings: string[] = [];
  const regex = /"[^"]{100,}"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[0];
    // Unescape unicode
    try {
      const decoded = JSON.parse(text);
      if (decoded.length > 100) {
        textStrings.push(decoded);
      }
    } catch {
      if (text.length > 200) {
         textStrings.push(text);
      }
    }
  }

  console.log(`Extracted strings count: ${textStrings.length}`);
  fs.writeFileSync('./decoded_strings.txt', textStrings.join('\n\n========================================================\n\n'));
  console.log('Saved to decoded_strings.txt');

  // Let's check for any strings that contain "html" or component or button or any typical code
  const codeRelated = textStrings.filter(s => s.includes('const') || s.includes('function') || s.includes('<div') || s.includes('remedy') || s.includes('materia') || s.includes('Materia'));
  console.log(`Code related decoded strings: ${codeRelated.length}`);
}

main();
