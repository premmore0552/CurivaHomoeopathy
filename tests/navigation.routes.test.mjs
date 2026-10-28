import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const catalogue = readFileSync(new URL('../src/data/resources.ts', import.meta.url), 'utf8');

const routePaths = new Set(
  [...app.matchAll(/<Route\s+path=["']([^"']+)["']/g)].map((match) => match[1]),
);
const navigationTargets = [
  ...header.matchAll(/\bto:\s*['"]([^'"]+)['"]/g),
]
  .map((match) => match[1])
  .filter((target) => target.startsWith('/') && !target.includes(':') && !target.includes('#'));
const missingRoutes = [...new Set(navigationTargets)].filter((target) => !routePaths.has(target));

test('all static navigation destinations resolve to an App route', () => {
  assert.deepEqual(missingRoutes, []);
});

test('desktop and mobile navigation have independent responsive layouts without fixed-width overflow', () => {
  assert.match(header, /hidden xl:flex/);
  assert.match(header, /xl:hidden fixed inset-0/);
  assert.match(header, /aria-expanded=\{isMenuOpen\}/);
  assert.match(header, /handleEscape/);
  assert.doesNotMatch(header, /width:\s*'1200px'|width:\s*'1000px'|width:\s*'0px'/);
});

test('download URLs do not leak into the public resource catalogue', () => {
  assert.doesNotMatch(catalogue, /drive\.google\.com|fileUrl\s*:/);
});
