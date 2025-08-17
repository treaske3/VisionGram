# VisionGram • iOS CI with Expo EAS (TestFlight)

Because this repo has `app.json` and no `ios/` folder, the simplest path is **Expo EAS**.

## One-time setup

1) **Expo account**
   - Create an Expo account and make sure you can sign in.

2) **Initialize EAS in the project (only once)**
   - On any machine with Node installed, run:
     ```bash
     npm install -g eas-cli
     npx eas login
     npx eas init
     ```
   - This will add a Project ID into your `app.json` under `expo.extra.eas.projectId`.

3) **App Store Connect API key**
   - In App Store Connect → Users and Access → Keys → Generate API Key.
   - Save the `.p8`, note **Key ID** and **Issuer ID**.
   - Create a JSON like:
     ```json
     {
       "key_id": "ABCD12345",
       "issuer_id": "00000000-0000-0000-0000-000000000000",
       "key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
       "in_house": false
     }
     ```

4) **GitHub repo secrets**
   - `EXPO_TOKEN` → Create at https://expo.dev/accounts/<your-account>/settings/access-tokens
   - `APP_IDENTIFIER` → e.g. `com.yourcompany.VisionGram`
   - `APP_STORE_CONNECT_API_KEY_JSON` → paste the JSON from (3)

5) **Commit these files to your repo root:**
   - `eas.json`
   - `.github/workflows/eas-ios.yml`

## Run it

- Manually: GitHub → **Actions** → “iOS • TestFlight via Expo EAS” → **Run workflow**.
- Or push to `main` to trigger automatically.

The workflow will:
1. Install deps
2. Log in to Expo using `EXPO_TOKEN`
3. Build iOS in the cloud with EAS
4. Submit to TestFlight using your ASC API key

## Notes
- EAS will help you create and store Apple signing credentials on first run.
- If `eas init` didn't write a projectId into `app.json`, run `npx eas init` again and commit changes.
- If you later eject / prebuild (creating `ios/`), you can switch to a Fastlane/Xcode workflow instead.
