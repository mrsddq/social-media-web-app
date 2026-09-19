# Social Media Web App

A local React social-feed demo with a composer, profile summary, bounded post
validation, and reversible per-post reactions. Sample feed entries are examples,
not a record of activity on a social service.

## Run and verify

Requires Node.js 24.15+ and npm. No Firebase account or credentials are required.

```bash
cd linkedin-clone
npm ci
npm test
npm run build
npm run dev
```

Vite prints the local URL. `npm run preview` serves `dist/` after a build.
GitHub Actions performs the same clean install, behavioral tests, and build.

## Engineering decisions

- Pure reducer transitions avoid stale React state when publishing or reacting.
- Posts are trimmed and limited to 500 characters; invalid submissions display feedback without changing the feed.
- UUIDs replace millisecond timestamps, avoiding collisions between rapid submissions; duplicate IDs are rejected by the reducer.
- Support toggles a single local reaction with an accessible pressed state. Repeated clicks cannot accumulate unlimited reactions.
- User text is rendered through React's normal text escaping. Tests verify that markup remains text.
- Tests exercise the actual composer and reaction buttons plus reducer non-mutation and duplicate-ID handling.

The unused Firebase initializer and dependency were removed. Any future backend
integration needs explicit authentication, ownership rules, persistence, and
server-side validation; see [the integration plan](docs/FIREBASE_UPGRADE_PLAN.md).

## Boundaries

Data exists only in memory and resets on refresh. There are no accounts, network
writes, moderation service, attachments, or cross-device synchronization. Reaction
counts are sample data plus the current tab's toggle; they are not verified user
engagement. The `linkedin-clone/` folder is retained from the original practice
project and is not connected to LinkedIn.
