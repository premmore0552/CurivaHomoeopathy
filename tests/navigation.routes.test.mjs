import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const navigation = readFileSync(new URL('../src/navigation/navigationConfig.ts', import.meta.url), 'utf8');
const breadcrumbs = readFileSync(new URL('../src/components/Breadcrumbs.tsx', import.meta.url), 'utf8');
const loaders = readFileSync(new URL('../src/components/LoadingStates.tsx', import.meta.url), 'utf8');
const fmtNavigation = readFileSync(new URL('../src/components/FmtBottomNav.tsx', import.meta.url), 'utf8');
const authButton = readFileSync(new URL('../src/components/AuthButton.tsx', import.meta.url), 'utf8');
const profileSwitch = readFileSync(new URL('../src/components/ProfileSwitch.tsx', import.meta.url), 'utf8');
const catalogue = readFileSync(new URL('../src/data/resources.ts', import.meta.url), 'utf8');
const organonHub = readFileSync(new URL('../src/pages/OrganonCurriculumHub.tsx', import.meta.url), 'utf8');
const curivaHome = readFileSync(new URL('../src/pages/CurivaHome.tsx', import.meta.url), 'utf8');
const capacitorConfig = readFileSync(new URL('../capacitor.config.ts', import.meta.url), 'utf8');
const serverSource = readFileSync(new URL('../server.ts', import.meta.url), 'utf8');

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

test('desktop header and mobile drawer use separate responsive layouts', () => {
  assert.match(header, /hidden items-center gap-1 lg:flex/);
  assert.match(header, /fixed inset-0 z-\[90\].*lg:hidden/s);
  assert.match(header, /aria-expanded=\{mobileOpen\}/);
  assert.match(header, /role="dialog" aria-modal="true"/);
  assert.doesNotMatch(header, /width:\s*'1200px'|width:\s*'1000px'|width:\s*'0px'/);
});

test('desktop navigation menus label their region and use link cards', () => {
  const desktopMenuStart = header.indexOf('navigation.map((group) => {');
  const desktopMenuEnd = header.indexOf('</nav>', desktopMenuStart);
  const desktopMenu = header.slice(desktopMenuStart, desktopMenuEnd);
  assert.match(desktopMenu, /role="region"/);
  assert.match(desktopMenu, /aria-label=.*group\.label.*menu/);
  assert.match(desktopMenu, /w-\[560px\]/);
  assert.match(desktopMenu, /grid grid-cols-2 gap-2/);
  assert.match(desktopMenu, /group\.items\.map/);
});

test('mobile drawer traps focus, closes on Escape and restores focus', () => {
  assert.match(header, /role="dialog"/);
  assert.match(header, /aria-modal="true"/);
  assert.match(header, /event\.key === 'Escape'/);
  assert.match(header, /querySelectorAll<HTMLElement>/);
  assert.match(header, /event\.key !== 'Tab'/);
  assert.match(header, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(header, /previouslyFocused\?\.focus\(\)/);
  assert.match(header, /ref=\{mobileDialogRef\}/);
});

test('desktop and mobile search forms share the same navigation action', () => {
  assert.equal((header.match(/role="search"/g) || []).length, 2);
  assert.match(header, /id="curiva-search"/);
  assert.match(header, /id="curiva-mobile-search"/);
  assert.match(header, /const submitSearch =/);
  assert.match(header, /navigate\('\/articles\?search='/);
});

test('mobile navigation drawer exposes the current learning sections', () => {
  for (const label of ['Learn', 'Practice', 'Library', 'Guidance']) {
    assert.ok(header.includes("label: '" + label + "'"), 'missing mobile section: ' + label);
  }
  assert.match(header, /aria-label="Navigation menu"/);
});

test('FMT bottom navigation exposes its five current destinations', () => {
  for (const label of ['Home', 'Learn', 'Search', 'Revision', 'More']) {
    assert.ok(fmtNavigation.includes("label: '" + label + "'") || fmtNavigation.includes('>' + label + '</span>'), 'missing FMT destination: ' + label);
  }
  assert.match(fmtNavigation, /aria-label="FMT mobile navigation"/);
  assert.match(fmtNavigation, /aria-label="Open more FMT options"/);
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

test('account access and authorized profile switching remain available', () => {
  assert.match(header, /import AuthButton from '\.\/AuthButton'/);
  assert.match(header, /<AuthButton \/>/);
  assert.match(header, /<AuthButton isMobile/);
  assert.match(authButton, /to="\/auth"/);
  assert.match(authButton, /to="\/profile"/);
  assert.match(profileSwitch, /authorizedRoles\.includes/);
  assert.match(profileSwitch, /setCurrentRole\(role\)/);
});

test('FMT More opens an accessible panel with Escape and focus handling', () => {
  assert.match(fmtNavigation, /onClick=\{\(\) => setMoreOpen\(true\)\}/);
  assert.match(fmtNavigation, /role="dialog"/);
  assert.match(fmtNavigation, /aria-modal="true"/);
  assert.match(fmtNavigation, /event\.key === 'Escape'/);
  assert.match(fmtNavigation, /querySelectorAll<HTMLElement>/);
  assert.match(fmtNavigation, /previouslyFocused\?\.focus\(\)/);
  for (const destination of ['/fmt/viva', '/fmt/mcq', '/student-resources', '/library']) {
    assert.ok(fmtNavigation.includes(destination), 'missing FMT More destination: ' + destination);
  }
});

test('Organon exposes a hub, four year-specific subject pages and a separate legacy reader', () => {
  for (const route of [
    '/organon-philosophy',
    '/organon/1st-bhms',
    '/organon/2nd-bhms',
    '/organon/3rd-bhms',
    '/organon/4th-bhms',
    '/organon-library'
  ]) {
    assert.ok(routePaths.has(route), 'missing Organon route: ' + route);
  }
  assert.match(app, /OrganonCurriculumHub/);
  assert.match(app, /OrganonYearPage yearSlug="1st-bhms"/);
  assert.match(app, /OrganonYearPage yearSlug="2nd-bhms"/);
  assert.match(app, /OrganonYearPage yearSlug="3rd-bhms"/);
  assert.match(app, /OrganonYearPage yearSlug="4th-bhms"/);
});

test('download URLs do not leak into the public resource catalogue', () => {
  assert.doesNotMatch(catalogue, /drive\.google\.com|fileUrl\s*:/);
});

test('Organon hub provides cross-year topic search, progress overview and direct study actions', () => {
  assert.match(organonHub, /searchOrganonCurriculum\(query\)/);
  assert.match(organonHub, /type="search"/);
  assert.match(organonHub, /aria-live="polite"/);
  assert.match(organonHub, /getOrganonProgressStorageKey/);
  assert.match(organonHub, /mode: 'flashcards'/);
  assert.match(organonHub, /mode: 'quiz'/);
  assert.match(organonHub, /Open official NCH curriculum PDF/);
});

test('BHMS student homepage links directly to the Organon year-wise portal', () => {
  assert.match(curivaHome, /title: 'Organon year-wise study'/);
  assert.match(curivaHome, /href: '\/organon-philosophy'/);
});


test('Capacitor config imports its CLI config contract as a type only', () => {
  assert.match(capacitorConfig, /^import type \{ CapacitorConfig \} from '@capacitor\/cli';/);
});

test('serverless Express app does not register the desktop SPA fallback', () => {
  assert.match(serverSource, /else if \(!isServerlessRuntime\) \{[\s\S]*?app\.get\("\/\{\*splat\}"[\s\S]*?\n  \}/);
  assert.doesNotMatch(serverSource, /app\.get\("\*"\s*,/);
});
