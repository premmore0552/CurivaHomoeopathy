import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const styles = read('../src/index.css');
const studyDock = read('../src/components/StudyToolkitDock.tsx');
const quickActions = read('../src/components/FloatingQuickActions.tsx');
const disclaimer = read('../src/components/MedicalDisclaimerModal.tsx');
const materiaSearch = read('../src/components/MateriaMedicaSearch.tsx');
const header = read('../src/components/Header.tsx');
const fmtNavigation = read('../src/components/FmtBottomNav.tsx');

test('persistent floating controls use shared safe-area-aware position tokens', () => {
  assert.match(styles, /--curiva-floating-safe-bottom:\s*env\(safe-area-inset-bottom, 0px\)/);
  assert.match(styles, /--curiva-study-dock-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 4\.75rem\)/);
  assert.match(styles, /--curiva-disclaimer-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 9rem\)/);
  assert.match(studyDock, /curiva-study-dock-position/);
  assert.match(disclaimer, /curiva-disclaimer-position/);
  assert.match(materiaSearch, /curiva-materia-search-position/);
  assert.doesNotMatch(studyDock, /bottom-24 right-3 sm:bottom-6/);
  assert.doesNotMatch(disclaimer, /bottom-\[calc\(env\(safe-area-inset-bottom\)\+5\.5rem\)\]/);
  assert.doesNotMatch(materiaSearch, /fixed bottom-8 left-8/);
});

test('desktop timer, quick actions and disclaimer occupy distinct vertical rails', () => {
  const desktopRules = styles.slice(styles.indexOf('@media (min-width: 1280px)'));
  assert.match(desktopRules, /--curiva-study-dock-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 1\.5rem\)/);
  assert.match(desktopRules, /--curiva-quick-actions-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 6rem\)/);
  assert.match(desktopRules, /--curiva-disclaimer-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 10rem\)/);
  assert.match(quickActions, /curiva-quick-actions-position/);
  assert.match(quickActions, /hidden xl:flex fixed/);
});

test('tablet disclaimer is centered while the study timer remains in a separate corner', () => {
  const tabletRules = styles.slice(
    styles.indexOf('@media (min-width: 640px) and (max-width: 1279px)'),
    styles.indexOf('@media (min-width: 1280px)'),
  );
  assert.match(tabletRules, /left:\s*50%/);
  assert.match(tabletRules, /transform:\s*translateX\(-50%\)/);
  assert.match(tabletRules, /width:\s*min\(30rem, calc\(100vw - 2rem\)\)/);
  assert.match(studyDock, /curiva-study-dock-position/);
});

test('bottom navigation remains reserved and floating triggers clear the navigation bar', () => {
  assert.match(styles, /body\s*\{\s*padding-bottom:\s*calc\(4\.75rem \+ env\(safe-area-inset-bottom, 0px\)\)/);
  assert.match(header, /fixed inset-x-0 bottom-0 z-\[60\]/);
  assert.match(fmtNavigation, /fixed bottom-0 left-0 right-0 z-\[60\]/);
  assert.match(styles, /--curiva-study-dock-bottom:\s*calc\(var\(--curiva-floating-safe-bottom\) \+ 4\.75rem\)/);
});

test('overlay layers cover floating triggers when expanded', () => {
  assert.match(quickActions, /fixed inset-0 z-\[115\]/);
  assert.match(quickActions, /z-\[120\].*flex h-\[100dvh\]/);
  assert.match(disclaimer, /z-\[85\]/);
  assert.match(studyDock, /z-\[80\]/);
  assert.match(quickActions, /z-40/);
  assert.match(studyDock, /z-\[80\]/);
  assert.match(studyDock, /fixed inset-0 z-\[95\].*role="dialog"/);
  assert.match(studyDock, /fixed inset-0 z-\[110\]/);
});
