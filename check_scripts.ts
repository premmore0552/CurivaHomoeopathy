import fs from 'fs';

function main() {
  const html = fs.readFileSync('./shared_content.html', 'utf8');
  console.log('Detecting all scripts...');

  const regex = /<script[\s\S]*?>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null) {
    count++;
    const content = match[1];
    console.log(`Script #${count}: size=${content.length}, src=${match[0].match(/src="([^"]+)"/) ? match[0].match(/src="([^"]+)"/)[1] : 'inline'}`);
    if (content.length > 500) {
      console.log('  Snippet:', content.slice(0, 300).replace(/\s+/g, ' '));
      fs.writeFileSync(`./large_script_${count}.js`, content);
    }
  }
}

main();
