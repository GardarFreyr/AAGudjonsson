# AAGuðjónsson ehf. — website demo

Homepage demo for AAGuðjónsson ehf., an electrical contractor and lighting designer in Akranes. Plain static HTML, CSS and JS with no build step, ready for Netlify.

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321. Add `?kynning` to the URL to hide the "Drög" (draft) labels and the preview strip when presenting.

## Deploy

Connect the repo to Netlify. `netlify.toml` publishes the repo root. No build command is needed.

## Before going live

- Remove `noindex` from `index.html` (meta robots) and from `netlify.toml` (`X-Robots-Tag`).
- Connect the contact form to Netlify Forms or an email address. It is currently a demo that validates input and sends nothing.
- Add the verified phone number and email in the contact section (marked with a comment in `index.html`).
- Replace the Unsplash example photos with the company's own project photos, and rename the "Hugmyndir að lýsingu" section once real projects exist.
- Confirm the service list. Items marked "Drög" are drafts awaiting client approval.
- Consider self-hosting the fonts (currently loaded from Google Fonts) for GDPR.

## Image credits

All photos are examples under the [Unsplash License](https://unsplash.com/license), loaded from images.unsplash.com and credited on the page: S.Group Official, Meritt Thomas, Ayrton, Tim Schmidbauer, Poojan Thanekar, Arthur Baudry and Mark Kats. None of them show work by AAGuðjónsson.
