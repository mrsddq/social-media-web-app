# Social Media Web App

A Vite React social feed demo located in the `linkedin-clone/` folder. It now has a usable feed surface instead of an empty starter screen.

## Structure

```text
linkedin-clone/
  public/
  src/
  package.json
  vite.config.js
```

## Setup

```bash
cd linkedin-clone
npm install
npm run dev
```

## Environment

Firebase configuration is read from Vite environment variables in `linkedin-clone/src/firebaseConfig.js`. The committed defaults are demo placeholders for local UI work.

## Quality Signals

- GitHub Actions build workflow
- product roadmap in [docs/product-roadmap.md](docs/product-roadmap.md)
- Vite build pipeline
- local feed state, composer, profile card, and reaction updates

## Status

Learning project with a clear social app direction. It still needs authentication, Firestore persistence, screenshots, Firebase rules, and a deployed demo before it becomes portfolio-polished.
