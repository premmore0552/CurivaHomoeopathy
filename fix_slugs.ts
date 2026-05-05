import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Regex to find objects missing slug but having id
// The pattern matches { followed by id: '...', followed by something NOT containing slug: ' before reaching the next property or end of object
// But doing it accurately with regex in a large TS file is tricky.
// Better approach: parse the content into blocks and process.

const lines = content.split('\n');
let inPost = false;
let currentId = '';
let hasSlug = false;
let newLines = [];

for (let line of lines) {
  if (line.trim().startsWith('{')) {
    inPost = true;
    hasSlug = false;
    currentId = '';
  }
  
  if (inPost) {
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) currentId = idMatch[1];
    
    if (line.includes('slug:')) hasSlug = true;
  }
  
  if (line.trim().startsWith('},') || line.trim().startsWith('}')) {
    if (inPost && !hasSlug && currentId) {
      // Find the last line that was part of the object and insert slug after id
      for (let i = newLines.length - 1; i >= 0; i--) {
        if (newLines[i].includes(`id: '${currentId}'`)) {
           newLines.splice(i + 1, 0, `    slug: '${currentId}',`);
           break;
        }
      }
    }
    inPost = false;
  }
  
  newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Fixed missing slugs in blogPosts.ts');
