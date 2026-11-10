# Deploy the site

Minimal Starlight build—skin and branding can change later without moving content.

## Local

```bash
npm install
npm run dev
```

Content is synced from `../../content` on `predev` / `prebuild`.

## Cloudflare Pages (recommended)

**Build settings**

| Setting | Value |
|---------|--------|
| Root directory | `apps/web` |
| Build command | `npm ci && npm run build` |
| Output directory | `dist` |
| Environment | `SITE_URL=https://yourdomain.com` |

**GitHub Action:** `.github/workflows/deploy-site.yml` deploys on push to `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are set.

## SEO

- Set `SITE_URL` to your canonical domain for sitemap and JSON-LD.
- Update `public/robots.txt` sitemap URL when the domain is final.
