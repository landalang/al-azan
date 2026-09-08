# How to get your app with the "different adhan every day" feature — phone only, no computer

This zip has 7 files that go into specific folders of your own copy of the Al-Azan
app on GitHub. GitHub will then build the installable APK for you automatically —
you never need to touch code or a build tool yourself.

## Step 1 — Get a GitHub account (skip if you have one)
Go to github.com in your phone's browser and sign up. It's free.

## Step 2 — Fork the app's repository
1. In your phone browser go to: https://github.com/meypod/al-azan
2. Tap the "Fork" button (top right). Tap "Create fork".
3. You now have your own copy at github.com/YOUR_USERNAME/al-azan

## Step 3 — Turn on Actions (this is what lets GitHub build the APK for you)
1. On your fork, tap the "Actions" tab.
2. Tap the green button that says something like "I understand my workflows,
   go ahead and enable them".

## Step 4 — Upload the 7 changed files
Unzip this zip on your phone first (most phones can do this from the Files app,
or install a free "zip extractor" app). You'll see this folder structure:

    src/store/settings.ts
    src/tasks/set_next_adhan.ts
    src/navigation/types.ts
    src/app.tsx
    src/screens/settings_adhan/index.tsx
    src/screens/settings_adhan/weekly_adhan.tsx
    .github/workflows/build_debug_apk_manual.yml

For EACH file above, do this on your fork's GitHub page:
1. Browse into the matching folder (e.g. tap into "src", then "store").
2. Tap "Add file" → "Upload files".
3. Tap to choose a file, and select the matching file from the unzipped folder
   on your phone.
4. Scroll down, tap "Commit changes".
5. Repeat for all 7 files. (The first 5 REPLACE an existing file — that's
   expected, GitHub will show it as an update. The 6th, weekly_adhan.tsx, and
   the 7th, the workflow file, are brand new files — just upload them into the
   right folder the same way.)

Tip: make sure you're uploading into the exact folder shown above for each file
— e.g. weekly_adhan.tsx goes inside src/screens/settings_adhan/, not src/screens/.

## Step 5 — Run the build
1. Tap the "Actions" tab again.
2. On the left, tap "build debug apk (manual)".
3. Tap "Run workflow" (a small dropdown button) → "Run workflow" again to confirm.
4. Wait — this takes roughly 10-20 minutes. You can close the browser and check
   back later; refresh the Actions page to see progress (yellow = running,
   green check = done, red X = failed).

## Step 6 — Download and install the APK
1. Once it's green, tap into that finished run.
2. Scroll to the bottom "Artifacts" section.
3. Tap "al-azan-debug-apk" to download it — it'll download as a .zip containing
   the .apk file. Unzip it the same way as before.
4. Tap the .apk file to install it. Your phone will likely ask you to allow
   "install unknown apps" for your browser/file manager the first time — allow
   it, then continue the install.

## After installing
Open the app → Settings → Muezzin → "Different Adhan Every Day (Fajr)".
Turn the toggle on, then assign a different adhan file to each day of the week
(you can add your own MP3s via the "Add" button in that picker).

## If step 5 fails (red X)
Tap into the failed run to see the error log. The most common cause is a small
typo introduced while uploading — double check each file went into the exact
folder listed in Step 4, then re-upload that one file and re-run.
