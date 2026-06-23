import fs from 'fs';

function main() {
  const html = fs.readFileSync('./shared_content.html', 'utf8');
  console.log('HTML Loaded. Size:', html.length);

  // Gemini share pages contain the conversations in various places. Let's find code blocks.
  // Code blocks in Gemini can be formatted in markdown style with ```tsx ... ``` or ```javascript ... ```
  // Let's do a regex search for code blocks.
  const regex = /```(tsx|typescript|jsx|javascript|js|css|json)[\s\S]*?```/g;
  const matches = html.match(regex);
  if (matches) {
    console.log(`Found ${matches.length} markdown code blocks.`);
    matches.forEach((block, i) => {
      console.log(`--- Block ${i+1} (Length: ${block.length}) ---`);
      // print first 200 chars and last 200 chars
      const lines = block.split('\n');
      console.log('Language line:', lines[0]);
      console.log('Start:\n', lines.slice(1, 10).join('\n'));
      console.log('...');
      console.log('End:\n', lines.slice(-10, -1).join('\n'));
      fs.writeFileSync(`./extracted_block_${i+1}.txt`, block);
    });
  } else {
    console.log('No Markdown backtick code blocks found directly in html. Let us search for pre elements or script JSON contexts.');
    
    // Sometimes it is inside serialized jsdata. Let us search for patterns.
    // Let's check if the word "Materia Medica" or similar exists in the HTML.
    const searchTerms = ['materia', 'remedy', 'canvas', 'homeopath', 'react'];
    searchTerms.forEach(term => {
      const regexTerm = new RegExp(term, 'gi');
      const termMatches = html.match(regexTerm);
      console.log(`Occurrences of "${term}":`, termMatches ? termMatches.length : 0);
    });

    // Let us extract all large chunks of JS data / JSON strings from the script tag that might contain the message text.
    const scripts = html.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/g);
    if (scripts) {
      console.log(`Found ${scripts.length} script tags.`);
      scripts.forEach((scr, idx) => {
        if (scr.includes('WIDGET_CONFIG') || scr.includes('jsdata') || scr.includes('window.BM_DS')) {
          console.log(`Script ${idx} has interesting keyword! Length:`, scr.length);
          fs.writeFileSync(`./interesting_script_${idx}.js`, scr);
        }
      });
    }
  }
}

main();
