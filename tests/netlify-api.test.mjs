import assert from 'node:assert/strict';
import { test } from 'node:test';

// Netlify Functions must reuse the existing Express routes, not return the SPA shell for /api/*.
process.env.NETLIFY = 'true';

test('Netlify API adapter forwards /api/posts to the existing Express route', async () => {
  const { handler } = await import('../.netlify-build/functions/api.mjs');
  const response = await handler({
    httpMethod: 'GET',
    path: '/api/posts',
    headers: { host: 'localhost', accept: 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: null,
    isBase64Encoded: false,
  }, {});

  assert.equal(response.statusCode, 200);
  assert.match(response.headers['content-type'] || response.headers['Content-Type'] || '', /application\/json/i);
  assert.ok(Array.isArray(JSON.parse(response.body)));
});
