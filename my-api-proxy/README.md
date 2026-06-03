# Orange Atlas API Proxy

Cloudflare Worker backend for the Orange Atlas AI tutor.

This Worker keeps the OpenRouter API key off the browser, checks Firebase ID tokens from the Orange Atlas app, and exposes the `/api/chat` contract used by `src/components/AiChat.astro`.

## Setup

Install dependencies from this folder if needed:

```sh
npm install
```

Store the OpenRouter key as a Cloudflare secret:

```sh
npx wrangler secret put OPENROUTER_API_KEY
```

Run the proxy locally:

```sh
npm run dev
```

Run tests:

```sh
npm test
```

Deploy the Worker:

```sh
npm run deploy
```

After deploy, set the site build env var to the Worker URL and rebuild/deploy the frontend:

```sh
PUBLIC_CHAT_API_URL="https://my-api-proxy.<your-subdomain>.workers.dev" npm run build:firebase
firebase deploy --only hosting --project orange-atlas
```

## Repo Placement

It is fine to keep this folder inside the Orange Atlas repo because it belongs to the app. If you want the parent Orange Atlas repo to track it as normal source files, remove the nested `my-api-proxy/.git` folder first and do not commit `my-api-proxy/node_modules`.
