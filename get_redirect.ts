async function main() {
  const url = 'https://share.gemini.google/BQsnOOio5x6f';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('Manual redirect check:');
  console.log('Status:', res.status);
  console.log('Headers:');
  res.headers.forEach((v, k) => console.log(`  ${k}: ${v}`));
  
  const res2 = await fetch(url);
  console.log('Follow redirect check:');
  console.log('Status:', res2.status);
  console.log('Final URL:', res2.url);
}
main();
