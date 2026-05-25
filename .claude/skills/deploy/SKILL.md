---
name: deploy
description: Deploy the application to production. Use when the user asks to deploy, ship, release, or push to production. Runs tests, builds, and deploys with pre/post checks.
disable-model-invocation: true
allowed-tools: Bash(npm run *) Bash(npx *) Bash(git *)
---

# Deploy to Production

Deploy $ARGUMENTS to production following this checklist.

## Pre-deploy checks

```bash
# 1. Ensure on correct branch and up to date
git status
git pull origin main

# 2. Run tests
npm run test -- --run

# 3. Type check
npm run type-check || npx tsc --noEmit

# 4. Lint
npm run lint

# 5. Build to verify no build errors
npm run build
```

Stop if any step fails. Fix issues before proceeding.

## Deploy

Determine the deployment target:
- **Vercel**: `npx vercel --prod`
- **Custom script**: `npm run deploy`
- **Docker**: build and push the image, then update the service

Check `package.json` scripts for the deploy command. If a `deploy` script exists, use it.

## Post-deploy verification

1. Open the production URL and verify it loads
2. Check that the critical user path works (login, main feature)
3. Monitor error tracking (Sentry, etc.) for new errors in the first 5 minutes
4. Check deployment logs for warnings

## Rollback

If issues are found:
- **Vercel**: `npx vercel rollback`
- **Git-based**: revert the last commit and redeploy

## Report

After completing, report:
- Deploy target and URL
- Whether all pre-checks passed
- Any issues found during post-verification
