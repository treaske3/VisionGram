# VisionGram App (Starter)

- Light & Dark mode UI (auto)
- Home → Preview → Help → About
- Prompt limit 240 chars with counter
- HMAC-signed API calls

Run:
```
npm install
npm run start
```

Before TestFlight build:
- Edit `src/env.ts` (API_BASE & HMAC_SECRET)
- Edit `app.json` (ios.bundleIdentifier)
