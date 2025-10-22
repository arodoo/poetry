This folder contains local font assets used as a stable fallback in CI/e2e.

Guidelines:
- Add real woff2 font files named by their token key, e.g. `inter.woff2`, `roboto.woff2`.
- Keep files under 1MB where possible to avoid inflating repo history.
- The loader will attempt `/fonts/<key>.woff2` if CDN font fails or when running E2E.

Note: placeholder files are not committed here by the automated agent; please add the actual .woff2 files in a subsequent commit or via LFS if needed.
