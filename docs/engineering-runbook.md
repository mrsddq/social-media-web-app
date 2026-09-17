# Local verification

Use Node.js 24.15+ with the committed lockfile.

```bash
cd linkedin-clone
npm ci
npm test
npm run build
npm run dev
```

Manual check: Submit blank and oversized posts, publish text containing markup, and toggle a reaction twice. Invalid posts must not change the feed; markup remains text.

State is local to the tab. A passing build/test suite verifies the frontend; it does not establish a backend service or a live deployment.
