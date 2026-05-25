---
name: next-best-practices
description: Apply Next.js 14/15 App Router best practices. Use when building Next.js pages, layouts, API routes, data fetching, routing, or when reviewing Next.js code for correctness and performance.
---

# Next.js Best Practices (App Router)

Apply these patterns consistently when working with Next.js 14/15 App Router.

## File conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home route
├── loading.tsx         # Suspense fallback
├── error.tsx           # Error boundary ('use client')
├── not-found.tsx       # 404 handler
├── (auth)/             # Route group (no URL segment)
│   ├── login/page.tsx
│   └── layout.tsx
├── dashboard/
│   ├── page.tsx
│   └── [id]/page.tsx   # Dynamic segment
└── api/
    └── users/route.ts  # API Route Handler
```

## Server vs Client components

Default to Server Components. Add `'use client'` only when you need:
- `useState`, `useEffect`, or other hooks
- Browser APIs (`window`, `localStorage`)
- Event handlers (`onClick`, `onChange`)
- Third-party libraries that require client context

```tsx
// Server Component (default) — can be async
export default async function UserList() {
  const users = await db.users.findMany()  // Direct DB access
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}

// Client Component
'use client'
export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Data fetching patterns

```tsx
// fetch() with Next.js cache extensions
async function getData() {
  // Static (cached indefinitely)
  const res = await fetch('https://api.example.com/data')
  
  // Revalidate every hour
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
  
  // No cache (dynamic)
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  })
  
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

// Parallel data fetching — always prefer over sequential
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
])
```

## Route Handlers (API routes)

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  const user = await db.users.findUnique({ where: { id } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  return NextResponse.json(user)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await db.users.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}
```

## Metadata

```tsx
// Static
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: { title: '...', description: '...', images: ['/og.png'] }
}

// Dynamic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)
  return { title: product.name, description: product.description }
}
```

## Image optimization

```tsx
import Image from 'next/image'

// Always provide width/height or fill
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // Use for above-the-fold images
/>

// Fill parent container
<div style={{ position: 'relative', height: '400px' }}>
  <Image src="/bg.jpg" alt="" fill style={{ objectFit: 'cover' }} />
</div>
```

## Loading and error states

```tsx
// app/dashboard/loading.tsx — shown during page transition
export default function Loading() {
  return <Skeleton />
}

// app/dashboard/error.tsx — must be 'use client'
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Server Actions

```tsx
// In a Server Component
async function createUser(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  await db.users.create({ data: { name } })
  revalidatePath('/users')
}

export default function NewUserForm() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

## Performance checklist

- [ ] Server Components for data fetching, not Client Components
- [ ] Parallel fetching with `Promise.all()` instead of sequential awaits
- [ ] `next/image` for all images with proper `priority` on LCP images
- [ ] `next/font` for web fonts (no layout shift)
- [ ] Dynamic imports for heavy Client Component libraries
- [ ] `generateStaticParams` for dynamic routes that can be pre-rendered
- [ ] Suspense boundaries around slow data fetches
