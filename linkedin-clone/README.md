# Social Media Web App

A Vite React social feed demo with profile summary, post composer, feed rendering, and local reaction state.

## Run

```bash
npm install
npm run dev
```

## Firebase Configuration

The Firebase app reads Vite environment variables and falls back to demo values for local UI development:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Implemented Scope

- professional profile card
- create-post form
- feed rendering from local data
- reaction counter updates
- responsive layout

## Current Limitation

Authentication, Firestore persistence, media uploads, and deployed hosting are intentionally not implemented yet.
