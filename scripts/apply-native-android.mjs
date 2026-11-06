import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyNativeBranding } from './apply-native-branding.mjs';

const project = path.resolve(process.env.CURIVA_ANDROID_PROJECT_DIR || 'android');
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gradlePath = path.join(project, 'app', 'build.gradle');
const manifestPath = path.join(project, 'app', 'src', 'main', 'AndroidManifest.xml');
const sourcePath = path.join(repoRoot, 'native-android', 'MainActivity.kt');
const packagePath = path.join(project, 'app', 'src', 'main', 'java', 'com', 'curiva', 'homoeopathy');
const activityPath = path.join(packagePath, 'MainActivity.kt');

function insertAtBlockEnd(source, marker, snippet) {
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('Could not find Gradle block: ' + marker);
  const open = source.indexOf('{', start);
  if (open < 0) throw new Error('Malformed Gradle block: ' + marker);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(0, i) + snippet + '\n' + source.slice(i);
    }
  }
  throw new Error('Unclosed Gradle block: ' + marker);
}

let gradle = await readFile(gradlePath, 'utf8');
if (!gradle.includes('org.jetbrains.kotlin.android')) {
  gradle = gradle.replace(/plugins\s*\{/, match =>
    match + "\n    id 'org.jetbrains.kotlin.android' version '2.2.21'");
}
if (!gradle.includes('org.jetbrains.kotlin.plugin.compose')) {
  gradle = gradle.replace(/plugins\s*\{/, match =>
    match + "\n    id 'org.jetbrains.kotlin.plugin.compose' version '2.2.21'");
}
if (!/buildFeatures\s*\{[\s\S]*?compose\s+true/.test(gradle)) {
  if (/buildFeatures\s*\{/.test(gradle)) {
    gradle = gradle.replace(/buildFeatures\s*\{/, match => match + '\n        compose true');
  } else {
    gradle = gradle.replace(/android\s*\{/, match => match + '\n    buildFeatures { compose true }');
  }
}
gradle = gradle.replace(/compileSdk(?:Version)?\s*(?:=\s*)?(?:rootProject\.ext\.compileSdkVersion|[0-9]+)/,
  'compileSdk 36');
if (!gradle.includes('kotlinOptions')) {
  gradle = insertAtBlockEnd(gradle, 'android {', "\n    kotlinOptions { jvmTarget = '17' }");
}
if (/compileOptions\s*\{/.test(gradle)) {
  gradle = gradle.replace(/compileOptions\s*\{[^}]*\}/s,
    "compileOptions { sourceCompatibility JavaVersion.VERSION_17; targetCompatibility JavaVersion.VERSION_17 }");
} else {
  gradle = insertAtBlockEnd(gradle, 'android {',
    "\n    compileOptions { sourceCompatibility JavaVersion.VERSION_17; targetCompatibility JavaVersion.VERSION_17 }");
}
gradle = gradle
  .replace(/^\s*implementation project\(['"]:(?:capacitor-android|capacitor-cordova-android-plugins)['"]\)\s*;?\s*$/gm, '')
  .replace(/^\s*apply from: ['"]capacitor\.build\.gradle['"]\s*$/gm, '');

const composeDependencies = [
  "    implementation platform('androidx.compose:compose-bom:2026.06.00')",
  "    implementation 'androidx.activity:activity-compose:1.13.0'",
  "    implementation 'androidx.compose.ui:ui'",
  "    implementation 'androidx.compose.ui:ui-tooling-preview'",
  "    implementation 'androidx.compose.material3:material3'",
  "    implementation 'androidx.compose.material:material-icons-extended'",
  "    debugImplementation 'androidx.compose.ui:ui-tooling'"
].join('\n');
if (!gradle.includes('androidx.compose.material3:material3')) {
  gradle = gradle.replace(/dependencies\s*\{/, match => match + '\n' + composeDependencies + '\n');
}
await writeFile(gradlePath, gradle, 'utf8');

await mkdir(packagePath, { recursive: true });
await copyFile(sourcePath, activityPath);
await rm(path.join(packagePath, 'MainActivity.java'), { force: true });

const assetsPath = path.join(project, 'app', 'src', 'main', 'assets');
await rm(path.join(assetsPath, 'public'), { recursive: true, force: true });
await rm(path.join(assetsPath, 'capacitor.config.json'), { force: true });
await rm(path.join(assetsPath, 'capacitor.plugins.json'), { force: true });

const settingsPath = path.join(project, 'settings.gradle');
let settings = await readFile(settingsPath, 'utf8');
settings = settings
  .replace(/^\s*include\s+['"]:capacitor-cordova-android-plugins['"]\s*$/gm, '')
  .replace(/^\s*include\s+['"]:capacitor-android['"]\s*$/gm, '')
  .replace(/^\s*project\(['"]:capacitor-cordova-android-plugins['"]\)\.projectDir\s*=.*$/gm, '')
  .replace(/^\s*apply from: ['"]capacitor\.settings\.gradle['"]\s*$/gm, '');
await writeFile(settingsPath, settings, 'utf8');
await rm(path.join(project, 'capacitor.settings.gradle'), { force: true });
await rm(path.join(project, 'capacitor-cordova-android-plugins'), { recursive: true, force: true });

let manifest = await readFile(manifestPath, 'utf8');
manifest = manifest
  .replace(/^\s*<uses-permission android:name="android\.permission\.(?:INTERNET|ACCESS_NETWORK_STATE)"\s*\/>\s*$/gm, '')
  .replace(/android:usesCleartextTraffic="true"/, 'android:usesCleartextTraffic="false"');
await writeFile(manifestPath, manifest, 'utf8');

const valuesDir = path.join(project, 'app', 'src', 'main', 'res', 'values');
await mkdir(valuesDir, { recursive: true });
const stringsPath = path.join(valuesDir, 'strings.xml');
try {
  let strings = await readFile(stringsPath, 'utf8');
  strings = strings.replace(/(<string name="app_name">)[\s\S]*?(<\/string>)/, '$1Curiva Homoeopathy$2');
  await writeFile(stringsPath, strings, 'utf8');
} catch { /* Branding script still supplies the launcher mark. */ }

await applyNativeBranding(project);
const kotlin = await readFile(activityPath, 'utf8');
if (!kotlin.includes('ComponentActivity') || !kotlin.includes('setContent') ||
    kotlin.includes('BridgeActivity') || kotlin.includes('WebView')) {
  throw new Error('Native Android activity must use Jetpack Compose and must not host a WebView.');
}
const assets = await readdir(assetsPath);
if (assets.includes('public')) throw new Error('Website assets must not be included in the native Android APK.');
console.log('Prepared standalone Jetpack Compose Android app; no website assets or WebView activity are packaged.');
