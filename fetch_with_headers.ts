import fs from 'fs';

const url = 'https://gemini.google.com/share/351813b0b074?skid=65f8d135-d2ff-47e5-a334-ceff56dfe7dc';

async function testFetch(name: string, headers: any) {
  try {
    const res = await fetch(url, { headers });
    const html = await res.text();
    // Strip script and style
    const cleanText = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(`[${name}] Status: ${res.status}, Length: ${html.length}, Clean Text Length: ${cleanText.length}`);
    if (cleanText.length > 100) {
      console.log(`[${name}] Snippet:`, cleanText.slice(0, 500));
      fs.writeFileSync(`./success_html_${name}.html`, html);
    }
  } catch (err: any) {
    console.error(`[${name}] Error:`, err.message);
  }
}

async function main() {
  const crawlers = [
    {
      name: 'Chrome_Desktop',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    },
    {
      name: 'Firefox_Desktop',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    },
    {
      name: 'Safari_Mobile',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    },
    {
      name: 'Googlebot',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }
  ];

  for (const crawler of crawlers) {
    await testFetch(crawler.name, crawler.headers);
  }
}

main();
