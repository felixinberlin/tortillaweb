# Agent Learnings — tortilladepatatas.org

A running log of things discovered *empirically* while working in this repo that weren't
obvious from `CLAUDE.md`, `AGENTS.md`, or the other `docs/` files at the time. Purpose: stop
future sessions (agent or human) from re-deriving the same gotchas.

**Convention:** append a dated entry under the relevant heading rather than rewriting history.
If a learning turns out to be wrong or gets fixed, strike it or move it to "Resolved" with a
note — don't delete it silently; the wrong belief is itself useful context.

---

## Build / tooling quirks

- **`.astro/` is partially git-tracked, and rebuilding produces noise diffs.** Despite being a
  generated directory, files like `.astro/content-assets.mjs` are committed to the repo. Every
  `npm run build` (or sometimes just `astro sync`) rewrites them — e.g.
  `export default new Map([])` ↔ `export default new Map()` — with zero functional difference.
  **Before committing, check `git status` for `.astro/*` changes you didn't intend and revert
  them** (`git checkout -- .astro/...`), or they'll show up as unrelated noise in an otherwise
  clean commit. *(2026-08-11)*

- **`npm run lint` (oxlint) exits `0` on warnings, non-zero only on errors.** Confirmed at a
  baseline of 4 warnings / 0 errors → exit 0. Safe to wire straight into a CI gate without
  `--deny-warnings` or similar; warnings won't fail the build unless oxlint's own error count is
  non-zero. *(2026-08-11)*

- **Recipe slugs don't match the recipe's display name.** e.g. the "classic" recipe's slug is
  `tortilla-clasica`, not `clasica` — and a separate `tortilla-clasica-con-cebolla` also exists.
  Verify actual slugs from `src/content/recipes/*.json` or `dist/[lang]/recipes/` rather than
  guessing from the recipe name. *(2026-08-11)*

## Lockfile / dependency drift

- **`package.json` and `package-lock.json` can drift silently when a dep is removed** — removing
  a package from `package.json` without re-running `npm install` leaves its entire transitive
  tree stranded in the lockfile. `npm ci` doesn't complain about *that* direction of drift (extra
  lockfile entries), only about entries *missing* from the lockfile relative to `package.json`.
  Concretely: `@sentry/astro` was dropped from `package.json` in commit `9e808a3` but its full
  dependency tree (`@sentry/*`, `@opentelemetry/*`, `@apm-js-collab/*`, ~60 packages) sat unused
  in `package-lock.json` until fixed here. **Lesson:** when regenerating a lockfile, a large diff
  isn't automatically "scope creep" — audit *what* changed (added-only vs. removed-only vs. real
  version bumps) before assuming `npm install` did something wrong. *(2026-08-11)*

- Roadmap.md (Phase 3) still lists "Sentry Monitoring Integration" as a planned/current
  milestone, but the dependency was already removed from `package.json`. Treat `docs/Roadmap.md`
  as aspirational/stale on this point — it doesn't reflect the current dependency state.
  *(2026-08-11)*

## Content-accuracy sensitivity

- The mandatory safety figures (**70°C**, **63°C**, **2 minutes**, **20 seconds**, **4 hours**,
  per `AGENTS.md`) aren't just a copy-editing rule for visible page text — they're also expected
  in generated **structured data** (JSON-LD via `src/lib/seo.ts`), since Google renders that
  directly in recipe rich results. `tests/seo.test.ts` enforces specific literal substrings
  (e.g. `"Salmonella Inactivation 70°C for 2 minutes"`, `"70°C for 2 minutes"` in `keywords`) —
  if you touch `generateOrganizationSchema()` or `generateRecipeSchema()`, grep the built
  `dist/**/index.html` for those strings, don't just trust the unit test in isolation.
  *(2026-08-11)*

## CI

- Before this session there was exactly one workflow (`deploy.yml`) and it ran no tests —
  `npm ci` alone, straight to `npm run build` and deploy. `.github/workflows/ci.yml` (added
  2026-08-11) is the first gate that actually runs lint/test/build on PRs and pushes to `main`.
  `deploy.yml` is intentionally left alone; it's slated for replacement in a Phase 1 hosting
  migration to Strato that hasn't landed in-repo yet. *(2026-08-11)*
