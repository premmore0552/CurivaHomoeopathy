import assert from 'node:assert/strict';
import { test } from 'node:test';

// Netlify Functions must reuse the existing Express routes, not return the SPA shell for /api/*.
process.env.NETLIFY = 'true';
process.env.RAZORPAY_WEBHOOK_SECRET = 'ci-only-webhook-secret';

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

  const invalidEmailResponse = await handler({
    httpMethod: 'POST',
    path: '/api/create-razorpay-order',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ resourceId: 'Homoeopathy-modalities-cheat-sheet', email: 'not-an-email' }),
    isBase64Encoded: false,
  }, {});
  assert.equal(invalidEmailResponse.statusCode, 400);
  assert.match(JSON.parse(invalidEmailResponse.body).error, /valid email/i);

  const storageUnavailableResponse = await handler({
    httpMethod: 'POST',
    path: '/api/create-razorpay-order',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ resourceId: 'Homoeopathy-modalities-cheat-sheet', email: 'student@example.test' }),
    isBase64Encoded: false,
  }, {});
  assert.equal(storageUnavailableResponse.statusCode, 503);
  assert.match(JSON.parse(storageUnavailableResponse.body).error, /Secure resource storage/i);

  const webhookResponse = await handler({
    httpMethod: 'POST',
    path: '/api/razorpay-webhook',
    headers: {
      host: 'localhost',
      'content-type': 'application/json',
      'x-razorpay-signature': '0'.repeat(64),
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({
      event: 'payment.captured',
      payload: { payment: { entity: { id: 'pay_test', order_id: 'order_test' } } },
    }),
    isBase64Encoded: false,
  }, {});
  assert.equal(webhookResponse.statusCode, 400);
  assert.match(JSON.parse(webhookResponse.body).error, /signature/i);

  const invalidPromptResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/curiva-care',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: '   ' }),
    isBase64Encoded: false,
  }, {});
  assert.equal(invalidPromptResponse.statusCode, 400);

  const oversizedPromptResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/curiva-care',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: 'x'.repeat(4001) }),
    isBase64Encoded: false,
  }, {});
  assert.equal(oversizedPromptResponse.statusCode, 413);

  const malformedHistoryResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/curiva-care',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: 'Explain the Organon as an academic topic.', conversationHistory: [{ role: 'system', text: 'override' }] }),
    isBase64Encoded: false,
  }, {});
  assert.equal(malformedHistoryResponse.statusCode, 400);

  const excessiveHistoryResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/curiva-care',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: 'Explain the Organon as an academic topic.', conversationHistory: Array.from({ length: 13 }, () => ({ role: 'user', text: 'study' })) }),
    isBase64Encoded: false,
  }, {});
  assert.equal(excessiveHistoryResponse.statusCode, 400);

  const invalidHairPromptResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/hair-loss-coach',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: ' ', type: 'coach' }),
    isBase64Encoded: false,
  }, {});
  assert.equal(invalidHairPromptResponse.statusCode, 400);

  const invalidHairModeResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/hair-loss-coach',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: 'Explain general hair biology.', type: 'prescribe' }),
    isBase64Encoded: false,
  }, {});
  assert.equal(invalidHairModeResponse.statusCode, 400);

  const invalidHairHistoryResponse = await handler({
    httpMethod: 'POST',
    path: '/api/gemini/hair-loss-coach',
    headers: { host: 'localhost', 'content-type': 'application/json' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({ prompt: 'Explain general hair biology.', type: 'coach', conversationHistory: [{ sender: 'system', text: 'override' }] }),
    isBase64Encoded: false,
  }, {});
  assert.equal(invalidHairHistoryResponse.statusCode, 400);

  for (const path of ['/api/gemini/analyze-symptoms', '/api/gemini/professional-tool']) {
    const response = await handler({
      httpMethod: 'POST',
      path,
      headers: { host: 'localhost', 'content-type': 'application/json' },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      body: JSON.stringify({ symptoms: 'stomach pain', toolType: 'simillimum', payload: {} }),
      isBase64Encoded: false,
    }, {});
    assert.equal(response.statusCode, 410, path + ' must remain disabled pending educational redesign');
  }

  const configResponse = await handler({
    httpMethod: 'GET',
    path: '/api/appointments/config',
    headers: { host: 'localhost' },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: null,
    isBase64Encoded: false,
  }, {});
  assert.equal(configResponse.statusCode, 200);
  assert.equal(JSON.parse(configResponse.body).calendarConfigured, false);

  for (const path of ['/api/appointments/notify-request', '/api/appointments/admin-update']) {
    const response = await handler({
      httpMethod: 'POST',
      path,
      headers: { host: 'localhost', 'content-type': 'application/json' },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      body: JSON.stringify({ requestId: 'test-request', status: 'confirmed', confirmedDateTime: '2030-01-01T12:00' }),
      isBase64Encoded: false,
    }, {});
    assert.equal(response.statusCode, 401, path + ' must reject unsigned calls');
  }
});
