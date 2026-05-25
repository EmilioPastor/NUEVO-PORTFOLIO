---
name: next-cache-components
description: Optimize Next.js caching strategy using the App Router cache model. Use when configuring data cache, full route cache, router cache, revalidation, unstable_cache, or when diagnosing stale data issues in Next.js.
---

# Next.js Caching & Components

Master the four caching layers in Next.js App Router to build fast, correct applications.

## The four caches

| Cache | Stores | Duration | Invalidated by |
|-------|--------|----------|----------------|
| **Request Memoization** | `fetch()` results within one request | Single render | Automatic per request |
| **Data Cache** | `fetch()` responses | Persistent (opt-out with `no-store`) | `revalidatePath`, `revalidateTag`, `revalidate` option |
| **Full Route Cache** | Rendered HTML + RSC payload | Persistent (static routes) | Data cache invalidation |
| **Router Cache** | RSC payload in browser | Session (30s/5min) | `router.refresh()`, `revalidatePath` |

## Data cache patterns

```ts
// STATIC — cached forever until explicitly revalidated
const data = await fetch('/api/products')

// TIME-BASED — revalidate every N seconds
const data = await fetch('/api/products', {
  next: { revalidate: 60 }  // revalidate after 60 seconds
})

// TAG-BASED — revalidate on demand
const data = await fetch('/api/products', {
  next: { tags: ['products'] }
})
// Then in a Server Action or Route Handler:
import { revalidateTag } from 'next/cache'
revalidateTag('products')

// DYNAMIC — never cached
const data = await fetch('/api/products', {
  cache: 'no-store'
})
```

## unstable_cache for non-fetch data

Use when fetching from a database or ORM (Prisma, Drizzle) that doesn't use `fetch()`:

```ts
import { unstable_cache } from 'next/cache'

const getProducts = unstable_cache(
  async () => {
    return await db.products.findMany()
  },
  ['products-list'],           // cache key
  {
    revalidate: 3600,          // revalidate every hour
    tags: ['products'],        // tag for on-demand revalidation
  }
)

// In a Server Component:
const products = await getProducts()
```

## On-demand revalidation

```ts
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json()
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  if (tag) revalidateTag(tag)
  if (path) revalidatePath(path)
  
  return Response.json({ revalidated: true })
}
```

## Static vs dynamic rendering

```tsx
// Force static rendering
export const dynamic = 'force-static'

// Force dynamic rendering (skips all caches)
export const dynamic = 'force-dynamic'

// Revalidate at route level (overrides fetch options)
export const revalidate = 3600

// Make route dynamic when accessed
export const fetchCache = 'default-no-store'
```

A route becomes dynamic automatically when it uses:
- `cookies()`, `headers()`, `searchParams`
- `fetch()` with `cache: 'no-store'`
- Any database call without `unstable_cache`

## Suspense for streaming

Wrap slow data fetches in Suspense to stream faster content first:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Fast content renders immediately */}
      <QuickStats />
      
      {/* Slow data streams in */}
      <Suspense fallback={<ChartSkeleton />}>
        <ExpensiveChart />  {/* async Server Component */}
      </Suspense>
    </div>
  )
}
```

## generateStaticParams for dynamic routes

Pre-render dynamic routes at build time:

```tsx
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await db.products.findMany({ select: { id: true } })
  return products.map(p => ({ id: p.id.toString() }))
}

// Add this to allow new paths not generated at build time
export const dynamicParams = true  // default — generates on-demand
// export const dynamicParams = false  // 404 for unknown paths
```

## Debugging cache issues

```bash
# See which routes are static vs dynamic
npm run build  # Check the build output (○ static, λ dynamic, ƒ edge)

# Force revalidation in development
# Add to your component temporarily:
export const revalidate = 0
```

Common cause of stale data: forgot `'use server'` or `revalidatePath` in Server Actions.

## Cache decision flowchart

1. Is the data user-specific? → `cache: 'no-store'` (dynamic)
2. Does it change frequently (< 1 min)? → `revalidate: 30`
3. Does it change on explicit events (CMS publish)? → tags + `revalidateTag`
4. Is it nearly static (config, categories)? → `revalidate: 3600` or omit
5. Is it truly static (docs, marketing)? → no options (indefinite cache)
