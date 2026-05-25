---
name: vercel-composition-patterns
description: Apply Vercel platform composition patterns including Edge Middleware, Edge Config, ISR, Partial Prerendering, and multi-zone architecture. Use when optimizing for Vercel's infrastructure, configuring headers/rewrites/redirects, or designing multi-region deployments.
---

# Vercel Composition Patterns

## Middleware (Edge)

Runs before every request — use for auth checks, redirects, A/B testing, localization.

```ts
// middleware.ts (at project root)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Auth guard — redirect unauthenticated users
  const token = request.cookies.get('auth-token')
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  // Only run on matched paths (skip _next, static files)
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## Edge Config

Low-latency key-value store — ideal for feature flags, A/B test variants, allowed IPs.

```ts
import { get } from '@vercel/edge-config'

// In middleware or Edge Runtime
export async function middleware(request: NextRequest) {
  const maintenanceMode = await get<boolean>('maintenance_mode')
  
  if (maintenanceMode) {
    return NextResponse.rewrite(new URL('/maintenance', request.url))
  }
  
  return NextResponse.next()
}
```

```bash
# Update Edge Config via CLI
vercel env pull  # get EDGE_CONFIG url
# Or via Vercel dashboard → Storage → Edge Config
```

## Incremental Static Regeneration (ISR)

```ts
// Revalidate every hour
export const revalidate = 3600

// On-demand revalidation via webhook
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  const { secret, path, tag } = await req.json()
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (path) revalidatePath(path)
  if (tag) revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

## Partial Prerendering (PPR) — Next.js 15+

Renders a static shell instantly, streams dynamic content into Suspense boundaries.

```ts
// next.config.ts
export default {
  experimental: { ppr: true }
}

// app/product/[id]/page.tsx
import { Suspense } from 'react'

export default function ProductPage({ params }: Props) {
  return (
    <div>
      {/* Rendered at build time — instant */}
      <StaticProductInfo id={params.id} />
      
      {/* Streamed dynamically per request */}
      <Suspense fallback={<PriceSkeleton />}>
        <DynamicPrice id={params.id} />
      </Suspense>
      
      <Suspense fallback={<StockSkeleton />}>
        <StockStatus id={params.id} />
      </Suspense>
    </div>
  )
}
```

## vercel.json configuration

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    },
    {
      "source": "/(.*\\.(?:js|css|png|jpg|svg|woff2))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/legacy/:path*",
      "destination": "https://legacy-api.example.com/:path*"
    }
  ]
}
```

## Multi-zone architecture

Serve multiple Next.js apps under a single domain (monorepo or micro-frontend):

```json
// Main app vercel.json
{
  "rewrites": [
    {
      "source": "/docs/:path*",
      "destination": "https://docs-app.vercel.app/docs/:path*"
    },
    {
      "source": "/blog/:path*",
      "destination": "https://blog-app.vercel.app/blog/:path*"
    }
  ]
}
```

Each zone is a separate Vercel project with its own `basePath`:
```ts
// docs/next.config.ts
export default { basePath: '/docs' }
```

## Environment variables

```bash
# Scopes: development, preview, production
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview

# Pull to local .env.local
vercel env pull .env.local

# Available in code:
process.env.DATABASE_URL
process.env.VERCEL_ENV  // 'development' | 'preview' | 'production'
process.env.VERCEL_URL  // deployment URL (no https://)
```

## Performance patterns

```ts
// Streaming responses for long operations
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of generateData()) {
        controller.enqueue(new TextEncoder().encode(chunk))
      }
      controller.close()
    }
  })
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}

// Edge Runtime for lowest latency (limited Node.js APIs)
export const runtime = 'edge'

// Node.js Runtime for full API access
export const runtime = 'nodejs'  // default
```
