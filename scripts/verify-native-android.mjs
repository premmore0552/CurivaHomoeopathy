import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const project = path.resolve(process.env.CURIVA_ANDROID_PROJECT_DIR || 'android');
const activity = await readFile(path.join(project, 'app', 'src', 'main', 'java', 'com', 'curiva', 'homoeopathy', 'MainActivity.kt'), 'utf8');
const gradle = await readFile(path.join(project, 'app', 'build.gradle'), 'utf8');
const manifest = await readFile(path.join(project, 'app', 'src', 'main', 'AndroidManifest.xml'), 'utf8');
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
if (!gradle.includes('org.jetbrains.kotlin.plugin.compose') || !gradle.includes('androidx.compose.material3:material3')) {
  throw new Error('Jetpack Compose dependencies were not configured.');
}
if (/android.permission.INTERNET/.test(manifest)) throw new Error('Native offline app should not request internet permission.');
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
