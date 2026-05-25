---
name: playwright-best-practices
description: Write reliable end-to-end tests with Playwright. Use when creating or fixing E2E tests, page objects, test fixtures, CI integration, or when tests are flaky, slow, or brittle.
---

# Playwright Best Practices

Write reliable, fast, and maintainable end-to-end tests.

## Core principles

1. **Test user behavior, not implementation** — click buttons, fill forms, assert visible text
2. **Use web-first assertions** — they auto-wait and retry
3. **One test file per feature** — not one per page
4. **Avoid hard waits** — `page.waitForTimeout()` is always wrong

## Locator strategy (priority order)

```ts
// 1. ARIA role + accessible name (best)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })

// 2. Label text
page.getByLabel('Email address')

// 3. Placeholder
page.getByPlaceholder('Search...')

// 4. Text content
page.getByText('Welcome back')

// 5. Test ID (when nothing else works)
page.getByTestId('submit-btn')
// Add data-testid="submit-btn" to the element

// AVOID: CSS selectors, XPaths, nth-child
// page.locator('.btn-primary')  ← brittle
```

## Web-first assertions (always use these)

```ts
// These retry until the assertion passes or timeout
await expect(page.getByRole('heading')).toBeVisible()
await expect(page.getByRole('status')).toHaveText('Saved')
await expect(page.getByRole('button')).toBeEnabled()
await expect(page.getByRole('checkbox')).toBeChecked()
await expect(page).toHaveURL('/dashboard')
await expect(page).toHaveTitle('Dashboard')

// Not these (they don't retry)
// expect(await page.isVisible('.modal'))  ← fragile
```

## Page Object Model

```ts
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/login')
  }
  
  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('Password').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }
  
  async expectError(message: string) {
    await expect(this.page.getByRole('alert')).toHaveText(message)
  }
}

// tests/auth.spec.ts
import { LoginPage } from '../pages/LoginPage'

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user@example.com', 'password123')
  await expect(page).toHaveURL('/dashboard')
})
```

## Fixtures for authentication

```ts
// fixtures.ts
import { test as base } from '@playwright/test'

type Fixtures = {
  authenticatedPage: Page
}

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Set auth token directly — skip login UI
    await page.goto('/')
    await page.evaluate((token) => {
      localStorage.setItem('auth-token', token)
    }, process.env.TEST_AUTH_TOKEN)
    await use(page)
  },
})

// In tests
test('dashboard loads for authenticated user', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard')
  await expect(authenticatedPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
```

## API setup for test data

```ts
// Use request context to create/clean test data via API
test('shows user profile', async ({ page, request }) => {
  // Create test user via API (faster than UI)
  const user = await request.post('/api/test/users', {
    data: { name: 'Test User', email: 'test@example.com' }
  })
  const { id } = await user.json()
  
  await page.goto(`/users/${id}`)
  await expect(page.getByRole('heading')).toHaveText('Test User')
  
  // Cleanup
  await request.delete(`/api/test/users/${id}`)
})
```

## playwright.config.ts

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## Debugging flaky tests

```bash
# Run with headed browser
npx playwright test --headed

# Slow down actions
npx playwright test --slow-mo=500

# Debug interactively
npx playwright test --debug

# See trace of a failure
npx playwright show-trace trace.zip
```

Common causes of flakiness:
- Missing `await` on assertions
- Race condition — add `await expect(locator).toBeVisible()` before interacting
- Animation — use `{ force: true }` or wait for animation to finish
- Network — use `page.waitForResponse()` to wait for specific requests
