---
name: nodejs-backend-patterns
description: Apply Node.js backend patterns for scalable, secure APIs. Use when building REST APIs, handling authentication, database access patterns, error handling, middleware, input validation, or structuring a Node.js/Express/Fastify backend.
---

# Node.js Backend Patterns

Apply these patterns for production-quality Node.js backends.

## Project structure

```
src/
├── routes/          # Route definitions
├── controllers/     # Request handlers (thin)
├── services/        # Business logic
├── repositories/    # Database access
├── middleware/      # Express middleware
├── validators/      # Input validation schemas
├── types/           # TypeScript types
└── lib/             # Shared utilities (db client, logger)
```

Thin controllers, fat services: keep HTTP logic out of business logic.

## Error handling

Use a centralized error handler. Never leak stack traces in production.

```ts
// lib/AppError.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../lib/AppError'

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code ?? 'ERROR',
      message: err.message,
    })
  }
  
  console.error(err)  // Log unexpected errors
  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : (err as Error).message,
  })
}

// Register last in Express
app.use(errorHandler)
```

## Input validation

Use Zod for runtime validation at API boundaries:

```ts
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['admin', 'user']).default('user'),
})

type CreateUserInput = z.infer<typeof CreateUserSchema>

// In controller
export async function createUser(req: Request, res: Response, next: NextFunction) {
  const result = CreateUserSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      details: result.error.flatten(),
    })
  }
  
  const user = await userService.create(result.data)
  res.status(201).json(user)
}
```

## Repository pattern

Separate data access from business logic:

```ts
// repositories/userRepository.ts
export class UserRepository {
  async findById(id: string) {
    return db.user.findUnique({ where: { id } })
  }
  
  async findByEmail(email: string) {
    return db.user.findUnique({ where: { email } })
  }
  
  async create(data: CreateUserInput) {
    return db.user.create({ data })
  }
  
  async update(id: string, data: Partial<CreateUserInput>) {
    return db.user.update({ where: { id }, data })
  }
}
```

## Async controller wrapper

Avoid try/catch in every controller:

```ts
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

// Usage
router.post('/users', asyncHandler(async (req, res) => {
  const user = await userService.create(req.body)
  res.status(201).json(user)
}))
```

## Authentication middleware

```ts
import jwt from 'jsonwebtoken'

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'UNAUTHORIZED' })
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'INVALID_TOKEN' })
  }
}
```

## Rate limiting

```ts
import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'TOO_MANY_REQUESTS' },
})

// Stricter limit for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
})
```

## Environment configuration

```ts
// lib/config.ts — fail fast on missing required env vars
import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
})

export const config = EnvSchema.parse(process.env)
```

## Security checklist

- [ ] Helmet.js for security headers
- [ ] CORS configured to allowed origins only
- [ ] Rate limiting on all endpoints, stricter on auth
- [ ] SQL injection impossible (use ORM/parameterized queries)
- [ ] Sensitive data never logged or returned in errors
- [ ] Passwords hashed with bcrypt (cost factor ≥ 12)
- [ ] JWT secrets are long and random, rotated periodically
- [ ] Input validated and sanitized at every API boundary
