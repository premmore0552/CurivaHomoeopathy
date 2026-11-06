import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const header = `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp"
    android:viewportWidth="108" android:viewportHeight="108">`;

const logoPaths = `
    <path android:fillColor="#F7FFF9" android:pathData="M14,65 C29,58 43,62 54,71 C65,62 79,58 94,65 L94,87 C79,80 65,83 54,93 C43,83 29,80 14,87 Z"/>
    <path android:fillColor="#F7FFF9" android:pathData="M51,70 L57,70 L57,94 L51,94 Z"/>
    <path android:fillColor="#DDEFA4" android:pathData="M54,70 C52,53 58,37 70,21 C69,41 64,56 54,70 Z"/>
    <path android:fillColor="#B8E5A3" android:pathData="M51,57 C36,55 27,45 25,29 C41,31 51,41 51,57 Z"/>
    <path android:fillColor="#E6F4B2" android:pathData="M58,43 C59,27 70,17 88,16 C86,33 75,43 58,43 Z"/>
    <path android:fillColor="#F5C56A" android:pathData="M54,18 C58,18 61,21 61,25 C61,29 58,32 54,32 C50,32 47,29 47,25 C47,21 50,18 54,18 Z"/>`;

const foreground = `${header}${logoPaths}
</vector>`;
const legacy = `${header}
    <path android:fillColor="#087F70" android:pathData="M0,0h108v108h-108z"/>${logoPaths}
</vector>`;
const adaptive = `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/curiva_launcher_background" />
    <foreground android:drawable="@drawable/curiva_launcher_foreground" />
</adaptive-icon>`;

export async function applyNativeBranding(androidProjectDir) {
  const res = path.join(androidProjectDir, 'app', 'src', 'main', 'res');
  const manifestPath = path.join(androidProjectDir, 'app', 'src', 'main', 'AndroidManifest.xml');
  let manifest = await readFile(manifestPath, 'utf8');
  if (!manifest.includes('<application')) {
    throw new Error('AndroidManifest.xml does not contain an application element.');
  }
  manifest = manifest.replace(/<application[^>]*>/s, tag => {
    let next = tag;
    next = /android:icon="[^"]*"/.test(next)
      ? next.replace(/android:icon="[^"]*"/, 'android:icon="@mipmap/ic_launcher"')
      : next.replace(/>$/, ' android:icon="@mipmap/ic_launcher">');
    next = /android:roundIcon="[^"]*"/.test(next)
      ? next.replace(/android:roundIcon="[^"]*"/, 'android:roundIcon="@mipmap/ic_launcher_round"')
      : next.replace(/>$/, ' android:roundIcon="@mipmap/ic_launcher_round">');
    return next;
  });

  const resources = [
    ['drawable/curiva_launcher_foreground.xml', foreground],
    ['mipmap-anydpi/ic_launcher.xml', legacy],
    ['mipmap-anydpi/ic_launcher_round.xml', legacy],
    ['mipmap-anydpi-v26/ic_launcher.xml', adaptive],
    ['mipmap-anydpi-v26/ic_launcher_round.xml', adaptive],
    ['values/curiva_colors.xml', '<resources><color name="curiva_launcher_background">#087F70</color><color name="colorPrimary">#087F70</color><color name="colorPrimaryDark">#164B40</color><color name="colorAccent">#D59C45</color></resources>' + String.fromCharCode(10)]
  ];
  for (const [relative, content] of resources) {
    const target = path.join(res, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, 'utf8');
  }
  await writeFile(manifestPath, manifest, 'utf8');
  return resources.map(([relative]) => path.join(res, relative));
}

const invoked = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (invoked === import.meta.url) {
  const project = path.resolve(process.env.CURIVA_ANDROID_PROJECT_DIR || 'android');
  const written = await applyNativeBranding(project);
  console.log(`Applied Curiva launcher branding: ${written.length} Android resources updated.`);
}
