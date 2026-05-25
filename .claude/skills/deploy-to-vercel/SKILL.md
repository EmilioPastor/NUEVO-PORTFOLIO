---
name: deploy-to-vercel
description: Deploy a Next.js or frontend project to Vercel. Use when deploying to Vercel, setting up Vercel preview deployments, configuring Vercel environment variables, or troubleshooting Vercel build failures.
disable-model-invocation: true
allowed-tools: Bash(npx vercel *) Bash(npm run *) Bash(git *)
---

# Deploy to Vercel

Deploy $ARGUMENTS to Vercel.

## First-time setup

```bash
# Install Vercel CLI if needed
npx vercel --version || npm i -g vercel

# Link project to Vercel (interactive)
npx vercel link
```

## Production deploy

```bash
# Run checks first
npm run build  # Verify build passes locally

# Deploy to production
npx vercel --prod
```

## Preview deploy (for PRs / staging)

```bash
npx vercel
```

## Environment variables

```bash
# List current env vars
npx vercel env ls

# Add a new env var
npx vercel env add SECRET_KEY production

# Pull env vars locally
npx vercel env pull .env.local
```

## vercel.json configuration

Key settings for Next.js projects:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

## Troubleshooting common build failures

| Error | Fix |
|-------|-----|
| `Module not found` | Check import paths, run `npm ci` locally |
| `Build exceeded memory` | Add `NODE_OPTIONS=--max-old-space-size=4096` to build env |
| `Type error` | Run `npx tsc --noEmit` locally, fix all type errors |
| `Environment variable missing` | Add the variable in Vercel dashboard → Settings → Environment Variables |
| `Function size exceeded` | Use dynamic imports to reduce bundle size |

## Rollback

```bash
# List recent deployments
npx vercel ls

# Rollback to a specific deployment
npx vercel rollback [deployment-url]
```

## Useful commands

```bash
npx vercel logs [deployment-url]    # View build/function logs
npx vercel inspect [deployment-url] # Inspect deployment details
npx vercel alias [deployment] [domain]  # Assign custom domain
```
