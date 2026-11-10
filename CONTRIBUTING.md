# Contributing

Thank you for helping improve Data Engineering 101.

## What we need

- Lesson fixes (clarity, typos, safer defaults)
- New exercises with solutions in `labs/solutions/`
- Lab stack hardening (Docker, docs only—no secrets)

## Content

1. Author MDX under `content/` using [`templates/lesson.mdx`](templates/lesson.mdx).
2. Run the site locally:

```bash
cd apps/web
npm install
npm run dev
```

`predev` syncs `content/` into the Starlight docs tree.

## Pull requests

- One topic per PR when possible.
- No affiliate link additions outside [`docs/disclosure.md`](docs/disclosure.md).
- No committed `.env` files or real credentials.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
