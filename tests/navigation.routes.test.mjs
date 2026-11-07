import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const navigation = readFileSync(new URL('../src/navigation/navigationConfig.ts', import.meta.url), 'utf8');
const breadcrumbs = readFileSync(new URL('../src/components/Breadcrumbs.tsx', import.meta.url), 'utf8');
const loaders = readFileSync(new URL('../src/components/LoadingStates.tsx', import.meta.url), 'utf8');
const fmtNavigation = readFileSync(new URL('../src/components/FmtBottomNav.tsx', import.meta.url), 'utf8');
const catalogue = readFileSync(new URL('../src/data/resources.ts', import.meta.url), 'utf8');

const routePaths = new Set(
  [...app.matchAll(/<Route\s+path=["']([^"']+)["']/g)].map(match => match[1]),
);
const navigationTargets = [
  ...navigation.matchAll(/\bto:\s*['"]([^'"]+)['"]/g),
]
  .map(match => match[1])
  .filter(target => target.startsWith('/') && !target.includes(':') && !target.includes('#'));
const missingRoutes = [...new Set(navigationTargets)].filter(target => !routePaths.has(target));

test('all shared navigation destinations resolve to an App route', () => {
  assert.deepEqual(missingRoutes, []);
});

test('desktop mega-menu and mobile drawer use separate responsive layouts', () => {
  assert.match(header, /hidden items-center gap-1 xl:flex/);
  assert.match(header, /fixed inset-0 z-\[100\].*xl:hidden/s);
  assert.match(header, /aria-expanded=\{mobileOpen\}/);
  assert.match(header, /aria-controls="curiva-mobile-navigation"/);
  assert.doesNotMatch(header, /width:\s*'1200px'|width:\s*'1000px'|width:\s*'0px'/);
});

test('mobile drawer exposes dialog semantics, Escape, focus trap and focus restoration', () => {
  assert.match(header, /role="dialog"/);
  assert.match(header, /aria-modal="true"/);
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /querySelectorAll<HTMLElement>/);
  assert.match(header, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(header, /previouslyFocused\?\.focus\(\)/);
});

test('global search palette is reused for desktop, mobile and keyboard entry', () => {
  assert.match(header, /SearchAutocomplete/);
  assert.match(header, /open-command-palette/);
  assert.match(header, /onClick=\{openGlobalSearch\}/);
});

test('mobile thumb navigation exposes Home, Learn, Practice, Search and More', () => {
  for (const label of ['Home', 'Learn', 'Practice', 'Search', 'More']) {
    assert.match(header, new RegExp('<span>' + label + '</span>'));
  }
  assert.match(header, /aria-label="Mobile quick navigation"/);
  assert.match(header, /safe-area-inset-bottom/);
});

test('breadcrumbs identify the current page without linking to itself', () => {
  assert.match(breadcrumbs, /aria-current="page"/);
  assert.match(breadcrumbs, /\{last \? \(/);
});

test('route fallback is an accessible skeleton without simulated progress', () => {
  assert.match(loaders, /role="status"/);
  assert.match(loaders, /aria-live="polite"/);
  assert.match(loaders, /aria-busy="true"/);
  assert.match(loaders, /animate-pulse/);
  assert.doesNotMatch(loaders, /[0-9]{1,3}%|estimated time/i);
  assert.match(app, /RouteLoadingScreen/);
  assert.doesNotMatch(app, /initiallyLoading|setInitiallyLoading/);
});

test('desktop and mobile retain profile switching, account access and the remedy finder', () => {
  assert.match(header, /ProfileSwitch/);
  assert.match(header, /<AuthButton/);
  assert.match(header, /\/find-your-remedy/);
});

test('FMT More opens a working accessible panel with existing destinations', () => {
  assert.match(fmtNavigation, /onClick=\{\(\) => setMoreOpen\(true\)\}/);
  assert.match(fmtNavigation, /role="dialog"/);
  assert.match(fmtNavigation, /aria-modal="true"/);
  assert.match(fmtNavigation, /event\.key === 'Escape'/);
  for (const destination of ['/fmt/viva', '/fmt/mcq', '/student-resources', '/library']) {
    assert.ok(fmtNavigation.includes(destination), 'missing FMT More destination: ' + destination);
  }
});

test('download URLs do not leak into the public resource catalogue', () => {
  assert.doesNotMatch(catalogue, /drive\.google\.com|fileUrl\s*:/);
});
