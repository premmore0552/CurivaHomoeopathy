# Curiva native Android learning app

## Architecture

The Android application is a standalone Kotlin + Jetpack Compose app. It is not a WebView wrapper and does not render pages from the Curiva website.

The website remains a separate React/Vite deployment. Android MainActivity uses Compose and the Android build removes the Capacitor bridge/runtime dependencies and website asset directory before compiling the APK. The standalone build also removes internet/network permissions.

## Included learning modules

- BHMS subject browser with year filters, curricula, exam patterns and high-yield revision topics.
- Offline study notes sourced from the existing CBDC topic database and the detailed anatomy and physiology modules.
- MCQ practice with subject selection, randomized sets, explanations, timed mock tests and answer review.
- Flashcards with reveal/active-recall controls and locally saved "known" status.
- Materia Medica learning profiles and a searchable Kent Repertory chapter/rubric index.
- Daily study checklist, local completion tracking, saved profiles and progress dashboard.

The exporter intentionally excludes remedy dosage fields and does not expose the website's symptom checker or clinical decision tools in the Android app. The repertory index is an academic lookup reference, not a diagnostic or prescribing engine.

## Offline and privacy behaviour

The bundled content is read from app/src/main/assets/learning-content.json. Progress is stored locally in Android SharedPreferences. There is no account login, cloud sync, or network-backed AI feature in this native build. Website hosting, APIs and web content remain separate.

## Build

~~~bash
npm ci
npm run lint
npm run build
npm run cap:add
npm run export:native-content
node scripts/apply-native-android.mjs
node scripts/verify-native-android.mjs
cd android
./gradlew assembleDebug
~~~

The generated android/ folder is ignored by Git. CI generates it from scratch and uploads the debug APK as a GitHub Actions artifact. A debug APK is for testing only; Play Store distribution needs a properly signed release AAB and a protected release signing key.
