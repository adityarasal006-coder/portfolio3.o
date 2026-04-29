# Fix GitHub Pages Deployment

## Problem

GitHub Pages serves `index.html` from repo root. Current root `index.html` is a React entry point referencing `/src/main.jsx` — browsers cannot run JSX directly. The actual working vanilla site is in `public/`.

## Plan

- [x] 1. Analyze file structure and identify root cause
- [ ] 2. Replace root `index.html` with working `public/index.html`
- [ ] 3. Move `public/script.js` to root
- [ ] 4. Move `public/style.css` to root
- [ ] 5. Remove stale `dist/` artifacts from git tracking
- [ ] 6. Commit all changes
- [ ] 7. Force-push to `portfolio2` remote
