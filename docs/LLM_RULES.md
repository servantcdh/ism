# LLM_RULES (Always On)

- PROMPT.md is SSOT. If conflict, follow PROMPT.md.
- Priority: TDD first → performance → metrics pipeline → design system.
- No stack/architecture changes without ADR.
- Keep Admin/Store using packages/ui; avoid app-local styling duplication.
- Keep idempotency(clientMutationId) + transactions + no-negative-stock enforced server-side.
- When implementing features/bugfix: add tests first (or same PR) and keep CI green.
