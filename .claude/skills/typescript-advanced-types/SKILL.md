---
name: typescript-advanced-types
description: Apply advanced TypeScript type patterns. Use when working with generics, conditional types, mapped types, template literal types, discriminated unions, type guards, utility types, or when fixing complex TypeScript errors.
---

# TypeScript Advanced Types

## Utility types (built-in)

```ts
type User = { id: string; name: string; email: string; role: 'admin' | 'user' }

Partial<User>           // All fields optional
Required<User>          // All fields required
Readonly<User>          // All fields readonly
Pick<User, 'id'|'name'> // Subset of fields
Omit<User, 'role'>      // Exclude fields
Record<string, User>    // Object type with string keys

// Function types
Parameters<typeof fn>       // Tuple of parameter types
ReturnType<typeof fn>        // Return type
Awaited<Promise<string>>     // string — unwrap promise

// Conditional
NonNullable<string | null | undefined>  // string
Extract<'a'|'b'|'c', 'a'|'c'>          // 'a' | 'c'
Exclude<'a'|'b'|'c', 'a'|'c'>          // 'b'
```

## Discriminated unions

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

function parseUser(input: unknown): Result<User> {
  const parsed = UserSchema.safeParse(input)
  if (parsed.success) return { ok: true, data: parsed.data }
  return { ok: false, error: parsed.error.message }
}

const result = parseUser(input)
if (result.ok) {
  result.data  // type: User ✓
} else {
  result.error  // type: string ✓
}
```

## Type guards

```ts
// User-defined type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}

// Assertion function (throws instead of returning boolean)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new TypeError('Expected string')
}

// Narrowing with in
type Cat = { meow(): void }
type Dog = { bark(): void }

function speak(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow()  // narrowed to Cat
  } else {
    animal.bark()  // narrowed to Dog
  }
}
```

## Generics with constraints

```ts
// Constrained generics
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

// Generic with default
interface ApiResponse<T = unknown> {
  data: T
  status: number
  message: string
}

// Conditional generic
type UnwrapArray<T> = T extends Array<infer U> ? U : T
type A = UnwrapArray<string[]>   // string
type B = UnwrapArray<number>     // number

// Recursive generic
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
```

## Mapped types

```ts
// Transform all values
type Nullable<T> = { [K in keyof T]: T[K] | null }
type Optional<T> = { [K in keyof T]+?: T[K] }  // add optional
type Required<T> = { [K in keyof T]-?: T[K] }  // remove optional

// Remap keys
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}
// Getters<{ name: string }> → { getName: () => string }

// Filter keys by type
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

type StringFields<T> = Pick<T, StringKeys<T>>
```

## Template literal types

```ts
type EventName = 'click' | 'focus' | 'blur'
type Handler = `on${Capitalize<EventName>}`  // 'onClick' | 'onFocus' | 'onBlur'

// Route params
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
    ? Param
    : never

type Params = ExtractParams<'/users/:id/posts/:postId'>  // 'id' | 'postId'
```

## `satisfies` operator (TS 4.9+)

```ts
// Validates type but keeps the literal/inferred type
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number>

config.port  // type: number (not string | number)

// Useful for palette/constant objects
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>

palette.red    // type: number[] (not string | number[])
palette.green  // type: string
```

## `infer` in conditional types

```ts
// Extract return type of async function
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never

// Extract first element of tuple
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never
type H = Head<[string, number, boolean]>  // string

// Extract constructor parameter types
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any
```

## Strict null checks patterns

```ts
// Non-null assertion — use sparingly, only when you're sure
const element = document.getElementById('root')!

// Nullish coalescing chain
const name = user?.profile?.displayName ?? 'Anonymous'

// Type narrowing
function process(value: string | null) {
  if (value === null) return  // early return narrows rest of function
  value.toUpperCase()  // type: string ✓
}

// Optional chaining with function calls
const result = obj.method?.()  // calls if method exists
```

## Common patterns

```ts
// Builder pattern with TypeScript
class QueryBuilder<T extends Record<string, unknown>> {
  private filters: Partial<T> = {}
  
  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value
    return this
  }
  
  build(): Partial<T> {
    return this.filters
  }
}

// Branded types for type safety
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }

function createUserId(id: string): UserId {
  return id as UserId
}

// These are both strings but TypeScript treats them as incompatible
function getUser(id: UserId): User { /* ... */ }
getUser(createUserId('123'))  // ✓
getUser('123' as PostId)      // ✗ Type error
```
