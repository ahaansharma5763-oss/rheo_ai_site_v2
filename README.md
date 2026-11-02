# rheoai.co.in

The site is static HTML in `public/site/`, served through the rewrites in `next.config.ts`. Those files are generated. Do not edit them here.

Source: `~/wiki/raw/site-revamp-2026-10-30/deep/` (`src/pages`, `src/parts`, `src/world.js`, `src/ui.js`, `src/style.css`).
Build: `python3 build.py --prod <this repo>` from that folder, then `npm run build` here.

The only server code is `app/api/forecast/route.ts`, the free list form. It forwards to the Reply Desk intake on n8n (RD-16). Needs `FORECAST_WEBHOOK_URL` and `FORECAST_WEBHOOK_KEY`. It never reports success it did not get.

Push to `main` deploys to production on Vercel.
