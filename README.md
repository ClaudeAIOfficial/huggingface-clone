# Hugging Face-inspired Community Hub

Responsive, static front-end recreation of the public Hugging Face homepage and browsing experience, using sample data inspired by public listings.

## Run

Open `index.html` in a browser, or serve with a static server for clean path routing:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/ . For routes like `/models` on refresh, use a static server configured for SPA fallback (or return to the homepage first).

## Included

- Responsive navigation and search
- Trending model, dataset, and Spaces listings
- Browsable category pages with filtering and sorting
- Project details with links to originals
- Homepage feature, compute, organizations, open-source and footer sections

## Scope

Independent noncommercial UI demonstration. No login, user data capture, model inference, file hosting or Hugging Face API integration. Brand and model names belong to their respective owners. Do not represent this demo as the official service.
