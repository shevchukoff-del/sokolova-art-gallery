<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Work only with files relevant to the current task; do not audit the whole repository unless needed.
- Do not change the approved design, unrelated pages, components, routes, or behavior without a request.
- Preserve the existing Next.js architecture and static export. The site currently deploys to GitHub Pages and is planned to move to REG.RU.
- Reuse existing components; do not create duplicates or install libraries without a clear need.
- Run checks proportionate to the change and briefly report changed files and results.
- After every visual or interface change, immediately open and show the updated result locally in the Codex browser. Do not wait for a separate preview request.
- Do not commit or push without explicit instruction.
- Project map: [`docs/PROJECT.md`](docs/PROJECT.md). Confirmed design constraints: [`docs/DESIGN.md`](docs/DESIGN.md).
