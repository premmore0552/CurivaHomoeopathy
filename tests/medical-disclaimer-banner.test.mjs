import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const banner = readFileSync(
  new URL('../src/components/MedicalDisclaimerModal.tsx', import.meta.url),
  'utf8',
);
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

test('initial disclaimer is a compact responsive bottom banner, not a full-screen modal', () => {
  assert.match(banner, /curiva-disclaimer-position/);
  assert.match(banner, /sm:w-\[min\(30rem,calc\(100vw-2rem\)\)\]/);
  assert.match(banner, /max-h-\[min\(55dvh,26rem\)\]/);
  assert.match(banner, /max-h-\[min\(70dvh,32rem\)\]/);
  assert.doesNotMatch(banner, /fixed inset-0|bg-black\/60|backdrop-blur|aria-modal|role="dialog"/);
});

test('required disclaimer acknowledgement remains persistent and is not repeated after acceptance', () => {
  assert.match(banner, /localStorage\.getItem\(DISCLAIMER_STORAGE_KEY\) === 'true'/);
  assert.match(banner, /localStorage\.setItem\(DISCLAIMER_STORAGE_KEY, 'true'\)/);
  assert.match(banner, /if \(hasAccepted\) return/);
  assert.match(banner, /setIsOpen\(false\)/);
});

test('banner exposes accessible text, reduced-motion behavior, and a full disclaimer link', () => {
  assert.match(banner, /role="region"/);
  assert.match(banner, /aria-labelledby="medical-disclaimer-title"/);
  assert.match(banner, /aria-describedby="medical-disclaimer-description"/);
  assert.match(banner, /useReducedMotion/);
  assert.match(banner, /to="\/disclaimer"/);
  assert.match(banner, /min-h-11/);
  assert.match(banner, /I Understand &amp; Agree/);
});

test('disclaimer banner is mounted once outside the keyed route tree', () => {
  const mountIndex = app.indexOf('<MedicalDisclaimerModal />');
  const routeTreeIndex = app.indexOf('<Routes location={location}');
  assert.notEqual(mountIndex, -1);
  assert.ok(routeTreeIndex > mountIndex);
  assert.equal([...app.matchAll(/<MedicalDisclaimerModal \/>/g)].length, 1);
});
