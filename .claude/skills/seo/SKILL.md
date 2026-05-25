---
name: seo
description: Implement SEO best practices for Next.js and web applications. Use when adding metadata, structured data, sitemaps, robots.txt, Open Graph tags, improving Core Web Vitals, or auditing a site for SEO issues.
---

# SEO Best Practices

Implement technical SEO for Next.js applications following current best practices.

## Metadata in Next.js App Router

```tsx
// app/layout.tsx — base metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Site Name',
    template: '%s | Site Name',  // Pages add their title as %s
  },
  description: 'Default site description (150-160 chars)',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Site Name',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

// app/blog/[slug]/page.tsx — page-specific metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,  // Will use template: "Post Title | Site Name"
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://yourdomain.com/blog/${params.slug}`,
    },
  }
}
```

## Sitemap

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  
  const postUrls = posts.map(post => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [
    { url: 'https://yourdomain.com', lastModified: new Date(), priority: 1 },
    { url: 'https://yourdomain.com/blog', lastModified: new Date(), priority: 0.8 },
    ...postUrls,
  ]
}
```

## robots.txt

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

## Structured data (JSON-LD)

```tsx
// For articles
export default function BlogPost({ post }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author.name },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage,
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{/* content */}</article>
    </>
  )
}
```

## Core Web Vitals — key optimizations

**LCP (Largest Contentful Paint) — target < 2.5s**
- Add `priority` to the hero/above-fold `<Image>`
- Preload critical fonts with `next/font`
- Use `next/image` for all images

**CLS (Cumulative Layout Shift) — target < 0.1**
- Always provide `width` and `height` on images
- Reserve space for dynamic content (skeletons)
- Load fonts with `next/font` (zero layout shift)

**INP (Interaction to Next Paint) — target < 200ms**
- Keep Client Component bundles small
- Use dynamic imports for heavy libraries
- Debounce expensive event handlers

## Canonical URLs

Always set canonical to prevent duplicate content issues:

```tsx
// In generateMetadata
alternates: {
  canonical: `https://yourdomain.com/products/${params.slug}`,
}

// For paginated pages
alternates: {
  canonical: 'https://yourdomain.com/blog',  // page 1 is canonical
}
```

## Heading hierarchy

- One `<h1>` per page — matches the page's `<title>`
- Don't skip heading levels (`h1` → `h3` without `h2`)
- Headings describe content structure, not styling

## SEO audit checklist

- [ ] Every page has unique title (50-60 chars) and description (150-160 chars)
- [ ] Canonical URL set on all pages
- [ ] OG image (1200×630) on all shareable pages
- [ ] Sitemap generated and submitted to Google Search Console
- [ ] robots.txt allows crawling of important pages
- [ ] Structured data for key page types (articles, products, FAQs)
- [ ] All images have descriptive alt text
- [ ] Page loads in < 3s on mobile (check Lighthouse)
- [ ] LCP image has `priority` prop
- [ ] No broken internal links (404s)
