---
name: next-upgrade
description: Upgrade a Next.js project to the latest version. Use when upgrading Next.js, migrating from Pages Router to App Router, handling breaking changes between Next.js versions, or fixing deprecation warnings.
disable-model-invocation: true
allowed-tools: Bash(npm *) Bash(npx *)
---

# Next.js Upgrade Guide

Upgrade $ARGUMENTS to the latest Next.js version.

## Check current version

```bash
node -e "console.log(require('./package.json').dependencies.next || require('./package.json').devDependencies.next)"
```

## Run the official codemod

Next.js provides codemods for most breaking changes:

```bash
npx @next/codemod@latest upgrade
```

This is interactive — follow the prompts.

## Manual upgrade steps

### 1. Update dependencies

```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### 2. Fix TypeScript config (Next.js 15+)

`next.config.ts` is now preferred over `next.config.js`:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // your config
}

export default nextConfig
```

### 3. Async request APIs (Next.js 15 breaking change)

`cookies()`, `headers()`, `params`, and `searchParams` are now async:

```tsx
// Before (Next.js 14)
import { cookies } from 'next/headers'
const cookieStore = cookies()
const token = cookieStore.get('token')

// After (Next.js 15)
import { cookies } from 'next/headers'
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

Codemod available:
```bash
npx @next/codemod@latest next-async-request-api .
```

### 4. Route Handlers: params is now async

```tsx
// Before
export function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
}

// After
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

### 5. fetch() caching default changed (Next.js 15)

`fetch()` is no longer cached by default — it defaults to `no-store`:

```ts
// Now you must opt IN to caching:
fetch('/api/data', { next: { revalidate: 3600 } })
// or
fetch('/api/data', { cache: 'force-cache' })
```

### 6. Turbopack is stable (Next.js 15)

```bash
# Use in development for faster HMR
next dev --turbopack
# or in package.json:
"dev": "next dev --turbopack"
```

## Pages Router → App Router migration

If migrating from Pages Router:

1. Create `app/` directory alongside `pages/`
2. Move `pages/_app.tsx` logic into `app/layout.tsx`
3. Migrate routes one at a time — both work simultaneously
4. Move `getServerSideProps` to async Server Components
5. Move `getStaticProps` to async Server Components with fetch cache options
6. Move `getStaticPaths` to `generateStaticParams`
7. Move API routes from `pages/api/` to `app/api/` Route Handlers

## Verify after upgrade

```bash
npm run build   # Must succeed with no errors
npm run dev     # Start dev server and check critical paths
```

Check the [Next.js upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading) for the specific version for any additional breaking changes.
