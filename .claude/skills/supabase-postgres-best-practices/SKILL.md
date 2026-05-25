---
name: supabase-postgres-best-practices
description: Apply Supabase and PostgreSQL best practices. Use when designing database schemas, writing RLS policies, using Supabase Auth, Realtime, Storage, Edge Functions, or optimizing PostgreSQL queries.
---

# Supabase + PostgreSQL Best Practices

## Client setup (Next.js App Router)

```ts
// lib/supabase/server.ts — for Server Components, Server Actions, Route Handlers
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

// lib/supabase/client.ts — for Client Components
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## Row Level Security (RLS) — always enable

Every table must have RLS enabled. Start by denying everything, then add explicit allow policies.

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "users_own_data" ON posts
  FOR ALL USING (auth.uid() = user_id);

-- Public read, owner write
CREATE POLICY "public_read" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "owner_write" ON posts
  FOR ALL USING (auth.uid() = user_id);

-- Service role bypasses RLS — use for admin operations
```

## Schema design

```sql
-- Use UUID primary keys
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enums for constrained values
CREATE TYPE user_role AS ENUM ('admin', 'member', 'viewer');
ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'member';
```

## Indexes

```sql
-- Index foreign keys (Postgres doesn't do this automatically)
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index for common query patterns
CREATE INDEX idx_posts_user_published ON posts(user_id, published)
  WHERE published = true;  -- Partial index

-- Full text search
ALTER TABLE posts ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || coalesce(content, ''))
  ) STORED;

CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
```

## Typed queries

```ts
// types/database.ts — generate with: npx supabase gen types typescript --local
import type { Database } from './database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

type Tables = Database['public']['Tables']
type Post = Tables['posts']['Row']
type NewPost = Tables['posts']['Insert']

// Typed helper
export async function getPosts(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, published, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data  // typed as Pick<Post, 'id' | 'title' | 'published' | 'created_at'>[]
}
```

## Authentication patterns

```ts
// Server Action: sign in
'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return { error: error.message }
  redirect('/dashboard')
}

// Get current user in Server Component
export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  // ...
}
```

## Realtime subscriptions

```tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function LiveNotifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  useEffect(() => {
    const supabase = createClient()
    
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => setNotifications(prev => [payload.new as Notification, ...prev])
      )
      .subscribe()
    
    return () => { supabase.removeChannel(channel) }
  }, [userId])
  
  return <div>{/* render notifications */}</div>
}
```

## Security checklist

- [ ] RLS enabled on every table that stores user data
- [ ] Service role key never exposed client-side
- [ ] `anon` key only has permissions needed by unauthenticated users
- [ ] Auth schema tables never directly accessible via client
- [ ] Sensitive columns excluded from select policies or behind server-only functions
- [ ] Edge Functions validate inputs before database operations
