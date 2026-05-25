---
name: accessibility
description: Audit and fix web accessibility issues following WCAG 2.1 AA standards. Use when building UI components, reviewing forms, checking color contrast, adding ARIA attributes, or when the user asks about a11y, screen readers, keyboard navigation, or accessibility compliance.
---

# Accessibility (a11y)

Apply WCAG 2.1 AA standards to all UI work. Default to inclusive design from the start, not as an afterthought.

## Core principles

**Perceivable** — All content must be available to sight, hearing, or touch.
**Operable** — All functionality must be keyboard-accessible.
**Understandable** — Content and UI must be clear and predictable.
**Robust** — Content must work with current and future assistive technologies.

## Semantic HTML first

Use the right element for the job — it gives you accessibility for free:

```html
<!-- Bad -->
<div class="btn" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

Landmark elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`.

## ARIA — use sparingly

Only add ARIA when native HTML can't express the semantics. Never override semantics with incorrect roles.

```tsx
// Required ARIA patterns
<button aria-label="Close dialog" aria-expanded={isOpen}>
<input aria-required="true" aria-invalid={hasError} aria-describedby="error-id" />
<div role="status" aria-live="polite">{statusMessage}</div>
<div role="alert" aria-live="assertive">{errorMessage}</div>
```

## Keyboard navigation

- Every interactive element must be reachable with Tab
- Logical tab order follows visual order
- Focus must be visible (never `outline: none` without an alternative)
- Escape closes dialogs/menus; Arrow keys navigate within composites
- Enter/Space activates buttons

```css
/* Visible focus style */
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

## Color contrast requirements

| Text type | Minimum ratio |
|-----------|---------------|
| Normal text (< 18pt) | 4.5:1 |
| Large text (≥ 18pt or 14pt bold) | 3:1 |
| UI components & graphical objects | 3:1 |

Never convey information with color alone — add icons, patterns, or text labels.

## Images and media

```tsx
// Informative image
<img src="chart.png" alt="Q3 revenue increased 23% compared to Q2" />

// Decorative image
<img src="decorative-divider.png" alt="" role="presentation" />

// Icon button
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>
```

Videos need captions. Audio needs transcripts.

## Forms

```tsx
// Every input needs a visible label (not just placeholder)
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert">{errors.email}</span>
)}
```

- Group related fields with `<fieldset>` + `<legend>`
- Show errors inline, linked to the field that caused them
- Error messages must be programmatically associated

## Dialogs and modals

When a dialog opens:
1. Move focus to the first focusable element inside it
2. Trap focus within the dialog while open
3. Restore focus to the trigger element on close
4. Use `role="dialog"` + `aria-modal="true"` + `aria-labelledby`

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm deletion</h2>
  <p id="dialog-desc">This action cannot be undone.</p>
</div>
```

## React/Next.js specifics

- Use `next/link` for navigation — it's keyboard and screen reader friendly
- After client-side navigation, move focus to `<main>` or announce the page change
- Use `useId()` for stable IDs in server components
- `react-aria` or Radix UI primitives include accessibility built in

## Testing checklist

- [ ] Tab through every interactive element — order makes sense, nothing skipped
- [ ] Use with keyboard only (no mouse) — all functionality reachable
- [ ] Run axe DevTools or Lighthouse accessibility audit — zero critical errors
- [ ] Test with screen reader (NVDA/Windows, VoiceOver/Mac)
- [ ] Zoom to 200% — layout doesn't break, content still readable
- [ ] Color contrast passes for all text and UI components
- [ ] All images have appropriate alt text
- [ ] All form fields have labels and error messages are associated
