---
name: vercel-react-best-practices
description: Apply React best practices optimized for Vercel deployment. Use when building React components, managing state, handling performance, implementing patterns like code splitting, lazy loading, or when reviewing React code for correctness and performance.
---

# Vercel + React Best Practices

## Component patterns

### Prefer composition over props drilling

```tsx
// Bad — drilling props 3+ levels deep
<Dashboard user={user} theme={theme} onLogout={onLogout} />
  <Sidebar user={user} onLogout={onLogout} />
    <UserMenu user={user} onLogout={onLogout} />

// Good — use context or pass components as children
<Dashboard>
  <Sidebar>
    <UserMenu />
  </Sidebar>
</Dashboard>
```

### Compound components

```tsx
// Tab component using compound pattern
const Tab = {
  Group: function TabGroup({ children, defaultIndex = 0 }: Props) {
    const [active, setActive] = useState(defaultIndex)
    return (
      <TabContext.Provider value={{ active, setActive }}>
        {children}
      </TabContext.Provider>
    )
  },
  List: function TabList({ children }: Props) {
    return <div role="tablist">{children}</div>
  },
  Item: function TabItem({ index, children }: { index: number; children: React.ReactNode }) {
    const { active, setActive } = useTabContext()
    return (
      <button
        role="tab"
        aria-selected={active === index}
        onClick={() => setActive(index)}
      >
        {children}
      </button>
    )
  },
}

// Usage
<Tab.Group>
  <Tab.List>
    <Tab.Item index={0}>Overview</Tab.Item>
    <Tab.Item index={1}>Details</Tab.Item>
  </Tab.List>
</Tab.Group>
```

## State management rules

1. **Server state** (API data) → React Query / SWR — not useState
2. **UI state** (open/closed, selected tab) → useState local to component
3. **Shared client state** → Zustand or Jotai (avoid Redux for new projects)
4. **Form state** → React Hook Form
5. **URL state** (filters, pagination) → searchParams

```tsx
// Server state with SWR
function UserProfile({ id }: { id: string }) {
  const { data: user, error, isLoading } = useSWR(`/api/users/${id}`, fetcher)
  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  return <div>{user.name}</div>
}

// URL state
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'
  
  return (
    <Select
      value={category}
      onChange={(v) => setSearchParams({ category: v })}
    />
  )
}
```

## Performance

### Code splitting with dynamic imports

```tsx
// Lazy load heavy components
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  loading: () => <EditorSkeleton />,
  ssr: false,  // Client-only component
})

const DataChart = dynamic(() => import('@/components/DataChart'), {
  loading: () => <ChartSkeleton />,
})
```

### useMemo and useCallback — use deliberately

```tsx
// Only memoize when the computation is expensive
const sortedItems = useMemo(
  () => items.slice().sort((a, b) => a.name.localeCompare(b.name)),
  [items]  // Only re-sort when items change
)

// Only wrap in useCallback when passing to memoized children
const handleSubmit = useCallback(
  (data: FormData) => {
    createMutation.mutate(data)
  },
  [createMutation]
)

// Don't memoize simple values or functions that aren't perf-critical
```

### React.memo for expensive pure components

```tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }: Props) {
  return (
    <ul>
      {items.map(item => <ExpensiveItem key={item.id} item={item} />)}
    </ul>
  )
})
// Only re-renders when items reference changes
```

## Custom hooks

Extract complex logic into custom hooks:

```tsx
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debounced
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(stored) : value
    setStored(valueToStore)
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }, [key, stored])
  
  return [stored, setValue] as const
}
```

## Error boundaries

```tsx
'use client'
import { Component, type ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// Usage
<ErrorBoundary fallback={<ErrorUI />}>
  <RiskyComponent />
</ErrorBoundary>
```

## Vercel-specific React patterns

```tsx
// Use next/image instead of <img>
import Image from 'next/image'

// Use next/link instead of <a> for internal navigation
import Link from 'next/link'

// Use next/font to eliminate font layout shift
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Component checklist

- [ ] No prop drilling beyond 2 levels — use context or composition
- [ ] Heavy third-party libraries loaded with dynamic imports
- [ ] Lists always have stable `key` props (never array index for dynamic lists)
- [ ] Event handlers don't create new objects in render (use useCallback if memoizing children)
- [ ] Forms use React Hook Form, not controlled inputs for every field
- [ ] Loading, error, and empty states handled for all async data
