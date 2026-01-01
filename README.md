# MyPortfolio

A simple personal portfolio website showcasing projects, resume, and contact information.

## Project

This repository contains a static portfolio website built with HTML, CSS, and JavaScript. It's intended to be easy to customize and deploy via any static-hosting provider (GitHub Pages, Netlify, Vercel, etc.).

## Files

- `index.html` — Home / landing page
- `about.html` — About page
- `projects.html` — Projects and case studies
- `resume.html` — Resume / CV
- `contact.html` — Contact form or contact info
- `style.css` — Global styles
- `script.js` — Site JavaScript

## Local preview

1. Open `index.html` directly in your browser, or run a simple static server for full routing and consistent behavior:

```bash
# Python 3
python -m http.server 8000

# Node (if you have http-server installed)
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

## Deployment

- GitHub Pages: push this repo and enable Pages from the `main` branch (or the branch you use).
- Netlify / Vercel: connect the repo and deploy — they detect static sites automatically.

## Customization

- Edit the HTML files to update content. Use `style.css` to change visual styles and `script.js` for behavior.
- Replace images and update links under the relevant pages.

## What's improved

- Responsive header and mobile menu — toggle with the ☰ button.
- Light / dark theme toggle (persisted in `localStorage`).
- Project list with filters, accessible cards and a lightweight modal for details.
- Client-side contact form validation and a small toast notification UX.
- Smooth in-page scrolling and keyboard accessibility improvements.

If you'd like, I can also:

- Add real images and thumbnails under an `assets/` directory.
- Wire the contact form to a serverless endpoint or Netlify Forms.

## Assets added

- `assets/favicon.svg` — site favicon
- `assets/project-1.svg`, `assets/project-2.svg` — placeholder thumbnails for projects

These are simple SVG placeholders; replace them with your real images in `assets/` to show live thumbnails.
- Create a small deployment script for GitHub Pages or Vercel.

## Contact

Update `contact.html` with your preferred contact details or form-handling endpoint.

## License

This project is provided as-is. Add a license file (e.g., MIT) if you want to specify reuse terms.
