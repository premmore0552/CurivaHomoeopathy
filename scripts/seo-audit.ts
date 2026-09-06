import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://curivahomoeopathy.netlify.app';
const OLD_DOMAINS = [
  'ais-pre-46ug6iwx2xitoihxp5k4ma-349546359089.asia-southeast1.run.app',
  'ais-dev-46ug6iwx2xitoihxp5k4ma-349546359089.asia-southeast1.run.app'
];

async function runAudit() {
  console.log('Starting SEO Audit...');
  let issues: string[] = [];

  // 1. Check for old domains in src
  const scanDirectory = (dir: string) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!['node_modules', '.git', 'dist'].includes(file)) {
          scanDirectory(fullPath);
        }
      } else if (['.tsx', '.ts', '.html', '.json'].includes(path.extname(fullPath))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        OLD_DOMAINS.forEach(domain => {
          if (content.includes(domain)) {
            issues.push(`Old domain found in ${fullPath}: ${domain}`);
          }
        });
      }
    });
  };

  scanDirectory(path.join(process.cwd(), 'src'));
  
  // 1.1 Check index.html separately
  const indexPath = path.join(process.cwd(), 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    OLD_DOMAINS.forEach(domain => {
      if (content.includes(domain)) {
        issues.push(`Old domain found in index.html: ${domain}`);
      }
    });
  }

  // 2. Check sitemap
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    if (sitemap.includes('/data/')) {
      issues.push('Sitemap contains /data/ URLs which should be private');
    }
    OLD_DOMAINS.forEach(domain => {
      if (sitemap.includes(domain)) {
        issues.push(`Sitemap contains old domain: ${domain}`);
      }
    });
  } else {
    issues.push('Sitemap.xml not found in public directory');
  }

  // 3. Check robots.txt
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    OLD_DOMAINS.forEach(domain => {
      if (robots.includes(domain)) {
        issues.push(`Robots.txt contains old domain: ${domain}`);
      }
    });
  }

  console.log('\n--- AUDIT RESULTS ---');
  if (issues.length === 0) {
    console.log('✅ No major SEO issues detected!');
  } else {
    console.log(`❌ Found ${issues.length} issues:`);
    issues.forEach(issue => console.log(` - ${issue}`));
  }
}

runAudit();
