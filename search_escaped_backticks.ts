import fs from 'fs';

function main() {
  const html = fs.readFileSync('./destination.html', 'utf8');
  console.log('Searching for escaped backticks or code blocks in destination.html...');
  
  // Look for occurrences of triple backticks, escaped triple backticks, or `\n` followed by code patterns
  const match1 = html.match(/```/g) || [];
  const match2 = html.match(/\\`\\`\\`/g) || [];
  const match3 = html.match(/\\u003c/g) || []; // <
  const match4 = html.match(/\\n/g) || [];
  
  console.log('Direct triple backticks count:', match1.length);
  console.log('Escaped triple backticks count:', match2.length);
  console.log('Unicode < \\u003c count:', match3.length);
  console.log('Newlines \\n count:', match4.length);

  // Let's write a search for typical React component structure keywords that might be escaped
  const keywords = ['useState', 'useEffect', 'import', 'export default', 'lucide-react', 'materiaMedica', 'canvas'];
  keywords.forEach(kw => {
    // Search raw, search escaped
    const escapedKw = kw.replace(/ /g, '\\s+');
    const rx = new RegExp(escapedKw, 'gi');
    const matches = html.match(rx) || [];
    console.log(` Keyword "${kw}" raw count:`, matches.length);
  });
}

main();
