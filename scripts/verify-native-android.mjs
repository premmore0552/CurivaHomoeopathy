import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const project = path.resolve(process.env.CURIVA_ANDROID_PROJECT_DIR || 'android');
const activity = await readFile(path.join(project, 'app', 'src', 'main', 'java', 'com', 'curiva', 'homoeopathy', 'MainActivity.kt'), 'utf8');
const gradle = await readFile(path.join(project, 'app', 'build.gradle'), 'utf8');
const rootGradle = await readFile(path.join(project, 'build.gradle'), 'utf8');
const manifest = await readFile(path.join(project, 'app', 'src', 'main', 'AndroidManifest.xml'), 'utf8');
const settings = await readFile(path.join(project, 'settings.gradle'), 'utf8');
const assets = path.join(project, 'app', 'src', 'main', 'assets');
const contentPath = path.join(assets, 'learning-content.json');
await access(contentPath);
const contentStats = await stat(contentPath);
const content = JSON.parse(await readFile(contentPath, 'utf8'));

for (const key of ['subjects', 'detailedLessons', 'questions', 'flashcards', 'remedies', 'repertory']) {
  if (!Array.isArray(content[key]) || content[key].length === 0) throw new Error('Offline library is missing ' + key);
}
if (!activity.includes('ComponentActivity') || !activity.includes('setContent') ||
    activity.includes('BridgeActivity') || activity.includes('WebView')) {
  throw new Error('Android MainActivity is not a standalone Compose activity.');
}
if (!gradle.includes("apply plugin: 'org.jetbrains.kotlin.android'") ||
    !gradle.includes("apply plugin: 'org.jetbrains.kotlin.plugin.compose'") ||
    !gradle.includes('androidx.compose.material3:material3') ||
    !rootGradle.includes('kotlin-gradle-plugin:2.2.21') ||
    !rootGradle.includes('compose-compiler-gradle-plugin:2.2.21')) {
  throw new Error('Jetpack Compose/Kotlin Gradle plugins or dependencies were not configured.');
}
if (/android.permission.INTERNET|android.permission.ACCESS_NETWORK_STATE/.test(manifest)) throw new Error('Native offline app should not request network permissions.');
if (/capacitor.settings.gradle|:capacitor-android|capacitor-cordova-android-plugins/.test(settings) || gradle.includes('capacitor.build.gradle') || gradle.includes("project(':capacitor-android')") || gradle.includes("project(':capacitor-cordova-android-plugins')")) throw new Error('Capacitor bridge dependencies remain in the native APK project.');
try {
  await access(path.join(assets, 'public'));
  throw new Error('Website bundle found in Android assets; this would re-introduce the website WebView.');
} catch (error) {
  if (error.message?.includes('Website bundle found')) throw error;
}
const summary = Object.fromEntries(['subjects','detailedLessons','questions','flashcards','remedies','repertory']
  .map(key => [key, content[key].length]));
summary.contentBytes = contentStats.size;
console.log('Native Android verification passed: ' + JSON.stringify(summary));
