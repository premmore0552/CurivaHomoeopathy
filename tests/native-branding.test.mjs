import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { applyNativeBranding } from '../scripts/apply-native-branding.mjs';

let tempDir;
afterEach(async () => {
  if (tempDir) await rm(tempDir, { recursive: true, force: true });
  tempDir = undefined;
});

test('native branding writes adaptive and legacy launcher resources and updates manifest icons', async () => {
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'curiva-android-branding-'));
  const appDir = path.join(tempDir, 'app', 'src', 'main');
  await mkdir(appDir, { recursive: true });
  await writeFile(path.join(appDir, 'AndroidManifest.xml'),
    '<manifest xmlns:android="http://schemas.android.com/apk/res/android"><application android:label="@string/app_name" android:icon="@mipmap/old_icon"></application></manifest>');

  const written = await applyNativeBranding(tempDir);
  const manifest = await readFile(path.join(appDir, 'AndroidManifest.xml'), 'utf8');
  const adaptive = await readFile(path.join(appDir, 'res/mipmap-anydpi-v26/ic_launcher.xml'), 'utf8');
  const foreground = await readFile(path.join(appDir, 'res/drawable/curiva_launcher_foreground.xml'), 'utf8');
  const legacy = await readFile(path.join(appDir, 'res/mipmap-anydpi/ic_launcher.xml'), 'utf8');

  assert.equal(written.length, 6);
  assert.match(manifest, /android:icon="@mipmap\\/ic_launcher"/);
  assert.match(manifest, /android:roundIcon="@mipmap\\/ic_launcher_round"/);
  assert.match(adaptive, /<adaptive-icon/);
  assert.match(adaptive, /curiva_launcher_foreground/);
  assert.match(foreground, /#DDEFA4/);
  assert.match(legacy, /#087F70/);
});

test('native branding fails clearly when the Android manifest has no application element', async () => {
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'curiva-android-branding-invalid-'));
  const appDir = path.join(tempDir, 'app', 'src', 'main');
  await mkdir(appDir, { recursive: true });
  await writeFile(path.join(appDir, 'AndroidManifest.xml'), '<manifest></manifest>');
  await assert.rejects(() => applyNativeBranding(tempDir), /does not contain an application element/);
});
