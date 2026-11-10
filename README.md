# Data Engineering 101

Free, open-source curriculum from **zero to data engineer**—structured paths, Docker labs, and an honest take on **learning with AI**.

**Start here:** [Path 0 lessons](content/path-00-setup/welcome.mdx) · **Live site:** deploy from [`apps/web`](apps/web) (set `SITE_URL` for your domain) · **Syllabus:** [outline.md](outline.md)

## Repo map

| Path | Location |
|------|-----------|
| Lessons (source) | [`content/`](content/) |
| Site (Astro Starlight, minimal skin) | [`apps/web/`](apps/web/) |
| Labs | [`labs/compose/`](labs/compose/) |
| Exercises & solutions | [`labs/exercises/`](labs/exercises/) · [`labs/solutions/`](labs/solutions/) |
| Support & affiliates | [`docs/disclosure.md`](docs/disclosure.md) · [Support page](content/support.mdx) |

## Quick lab start

```bash
cd labs/compose/core
cp .env.example .env
docker compose --profile core up -d
```

VPS deploy: [labs/compose/DEPLOY.md](labs/compose/DEPLOY.md).

## Run the site locally

```bash
cd apps/web
npm install
npm run dev
```

## Contribute

[CONTRIBUTING.md](CONTRIBUTING.md) · [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

MIT License — see [LICENSE](LICENSE).
