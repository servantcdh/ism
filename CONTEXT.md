# CONTEXT.md

- SSOT: PROMPT.md (conflict 시 PROMPT 우선)
- Monorepo(pnpm): admin-web, store-pwa, api, storybook, tokens, ui, shared
- Goals: TDD, performance, metrics pipeline, design system
- Front: React/Vite, TanStack Query/Router/Virtual, Zustand, Axios, Jest
- DS: tokens(CSS vars) + ui components + Storybook(autodocs + play tests)
- Store PWA: barcode/QR scan(@zxing/browser), cart, outbox(IndexedDB), metrics
- Admin: virtualized lists, label print, quarterly dashboard, metrics viewer
- API: NestJS+Prisma+Postgres, REST+Swagger
- Safety: idempotency(clientMutationId), transactions, no negative stock
- Deploy: GH Actions → GHCR → home server docker compose
