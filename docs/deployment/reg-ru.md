# Future deployment to REG.RU

The application is a provider-independent static export. It has no API routes, server actions, database or mandatory cloud services.

## Shared hosting

1. Run `npm ci` and `npm run build` on a development machine or CI runner.
2. Upload the **contents** of `out/` to the site's document root on REG.RU.
3. Keep `NEXT_PUBLIC_BASE_PATH` unset so URLs are built from `/`.
4. Point the domain to the hosting account using REG.RU's DNS instructions.

The exported directories use trailing slashes and contain their own `index.html`, so no Node.js process is required.

## VPS with Node.js

If server features are introduced later:

1. Remove `output: "export"` from `next.config.ts`.
2. Add the required API routes or server components.
3. Run the app behind Nginx with a supervised Node.js process.

The UI, Three.js scene and artwork catalogue can stay unchanged.
