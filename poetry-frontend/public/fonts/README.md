This folder contains local font assets used as a stable fallback for E2E and (optionally) CI.

Guidelines
---------

Why we have these fonts
-----------------------
- Visual tests can be flaky if the external font CDN is unavailable or returns a different font format. Local .woff2 files make test runs deterministic.

Local-first workflow (fonts committed)
------------------------------------

These font files are committed into the repository so a fresh clone contains the needed `.woff2` assets. No network download is required to run the app or the E2E tests locally.

Files in this folder:

- `Inter-Regular.woff2`
- `Inter-Bold.woff2`
- `fonts.css` (local fonts stylesheet)

Quick start (after cloning):

```bash
# fonts are already present after clone; no action required
ls poetry-frontend/public/fonts
# run your dev server or E2E tests as usual
```

Refresh/update workflow (optional)
---------------------------------
If you ever want to refresh fonts from Google Fonts or an artifact location, the repo includes a helper script. This is optional — you do not need it for normal development.

```bash
# downloads fonts into this folder (developer tool only)
node tools/scripts/fetch-fonts.mjs
```

Notes
-----
- Fonts are committed intentionally to make local CI/dev deterministic and offline-friendly.
- The helper script remains as a utility for future refreshes; it is not required at runtime.
