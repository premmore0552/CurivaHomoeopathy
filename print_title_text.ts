import fs from 'fs';

function main() {
  const html = fs.readFileSync('./destination.html', 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  console.log('Title:', title ? title[1] : 'No title');

  const h1 = html.match(/<h1[\s\S]*?>([\s\S]*?)<\/h1>/gi) || [];
  console.log('H1 headings found:', h1.length);
  h1.forEach((h, idx) => console.log(`  H1 #${idx + 1}: ${h}`));

  const h2 = html.match(/<h2[\s\S]*?>([\s\S]*?)<\/h2>/gi) || [];
  console.log('H2 headings found:', h2.length);
  h2.forEach((h, idx) => console.log(`  H2 #${idx + 1}: ${h}`));

  // Check if we can find words like "Sign in" or "Google Account" or cookies
  console.log('Contains "Sign in":', html.includes('Sign in'));
  console.log('Contains "Google Account":', html.includes('Google Account'));
  console.log('Contains "cookie":', html.toLowerCase().includes('cookie'));

  // Print first 500 characters of the body tag
  const bodyIndex = html.indexOf('<body');
  if (bodyIndex !== -1) {
    console.log('--- Body Tag Start (500 chars) ---');
    console.log(html.slice(bodyIndex, bodyIndex + 500));
  }
}
main();
