---
name: vitest
description: Write and run unit tests with Vitest. Use when creating unit tests, integration tests, testing React components, mocking modules, setting up test coverage, or migrating from Jest to Vitest.
---

# Vitest Best Practices

## Setup

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/user-event jsdom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,            // No need to import describe/it/expect
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'src/test'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom'  // extends expect with .toBeInTheDocument() etc.
```

## Basic test structure

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('UserService', () => {
  let service: UserService
  
  beforeEach(() => {
    service = new UserService(mockDb)
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })
  
  it('creates a user with hashed password', async () => {
    const user = await service.create({ email: 'test@example.com', password: 'password' })
    expect(user.email).toBe('test@example.com')
    expect(user.password).not.toBe('password')  // should be hashed
  })
  
  it('throws when email already exists', async () => {
    await service.create({ email: 'test@example.com', password: 'password' })
    await expect(
      service.create({ email: 'test@example.com', password: 'other' })
    ).rejects.toThrow('Email already exists')
  })
})
```

## React component testing

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(<LoginForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    })
  })
  
  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)
    
    await user.type(screen.getByLabelText('Email'), 'invalid')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))
    
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email')
  })
})
```

## Mocking

```ts
// Mock a module
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

// Mock within a test
it('sends welcome email on registration', async () => {
  const { sendEmail } = await import('@/lib/email')
  vi.mocked(sendEmail).mockResolvedValueOnce({ success: true })
  
  await registerUser({ email: 'test@example.com' })
  
  expect(sendEmail).toHaveBeenCalledWith({
    to: 'test@example.com',
    subject: 'Welcome!',
  })
})

// Spy on a method
it('calls the logger', () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  doSomething()
  expect(logSpy).toHaveBeenCalledWith('done')
  logSpy.mockRestore()
})

// Mock timers
it('debounce delays execution', async () => {
  vi.useFakeTimers()
  const fn = vi.fn()
  const debounced = debounce(fn, 300)
  
  debounced()
  debounced()
  debounced()
  expect(fn).not.toHaveBeenCalled()
  
  await vi.runAllTimersAsync()
  expect(fn).toHaveBeenCalledOnce()
  
  vi.useRealTimers()
})
```

## Async testing

```ts
// Async/await (preferred)
it('fetches user data', async () => {
  const user = await fetchUser('123')
  expect(user.id).toBe('123')
})

// Testing rejected promises
it('handles 404', async () => {
  await expect(fetchUser('nonexistent')).rejects.toThrow('Not found')
})

// waitFor for async UI updates
import { waitFor } from '@testing-library/react'

it('shows success message after submit', async () => {
  const user = userEvent.setup()
  render(<Form />)
  
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  
  await waitFor(() => {
    expect(screen.getByRole('status')).toHaveTextContent('Saved!')
  })
})
```

## Test coverage and running

```bash
# Run all tests
npx vitest

# Watch mode (default in dev)
npx vitest watch

# Run once (CI)
npx vitest run

# With coverage
npx vitest run --coverage

# Open UI
npx vitest --ui

# Filter tests
npx vitest login  # runs tests matching "login"
```

## What to test

**Test these:**
- Business logic (services, utilities, pure functions)
- React components — user interactions and rendered output
- Error cases and edge cases
- Integration between components and their data

**Don't test these:**
- Implementation details (internal state, private methods)
- Third-party libraries (they have their own tests)
- Types (TypeScript checks these at compile time)
- Simple getters/setters with no logic

## AAA pattern

Structure every test with Arrange → Act → Assert:

```ts
it('calculates discounted price', () => {
  // Arrange
  const product = { price: 100 }
  const discountPercent = 20
  
  // Act
  const result = applyDiscount(product, discountPercent)
  
  // Assert
  expect(result.price).toBe(80)
})
```
