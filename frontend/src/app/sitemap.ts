import type { MetadataRoute } from 'next';
import {
  fetchServiceTree,
  fetchPublicBlogCategories,
  fetchPublicBlogPosts,
  fetchPublicExperts,
} from '@/lib/data-fetchers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://readessay.com').replace(/\/$/, '');
  const now = new Date();

  // Core static storefront routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/samples`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/top-experts`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Dynamic Service & Sub-Service routes
  const serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await fetchServiceTree();
    if (Array.isArray(services)) {
      for (const srv of services) {
        if (!srv.slug) continue;
        serviceRoutes.push({
          url: `${siteUrl}/${srv.slug}`,
          lastModified: srv.updatedAt ? new Date(srv.updatedAt) : now,
          changeFrequency: 'weekly',
          priority: 0.9,
        });

        if (Array.isArray(srv.subServices)) {
          for (const sub of srv.subServices) {
            if (!sub.slug) continue;
            serviceRoutes.push({
              url: `${siteUrl}/${srv.slug}/${sub.slug}`,
              lastModified: sub.updatedAt ? new Date(sub.updatedAt) : now,
              changeFrequency: 'weekly',
              priority: 0.85,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('sitemap.ts: Service tree retrieval warning:', err);
  }

  // Dynamic Blog Category routes
  const categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await fetchPublicBlogCategories();
    if (Array.isArray(categories)) {
      for (const cat of categories) {
        if (!cat.slug) continue;
        categoryRoutes.push({
          url: `${siteUrl}/blog/category/${cat.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }
  } catch (err) {
    console.error('sitemap.ts: Blog categories retrieval warning:', err);
  }

  // Dynamic Blog Post routes
  const postRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsRes = await fetchPublicBlogPosts({ limit: 500 });
    const posts = postsRes.posts || [];
    for (const post of posts) {
      if (!post.slug) continue;
      const modDate = post.updatedAt || post.publishedAt;
      postRoutes.push({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: modDate ? new Date(modDate) : now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  } catch (err) {
    console.error('sitemap.ts: Blog posts retrieval warning:', err);
  }

  // Dynamic Top Expert routes
  const expertRoutes: MetadataRoute.Sitemap = [];
  try {
    const experts = await fetchPublicExperts();
    if (Array.isArray(experts)) {
      for (const exp of experts) {
        if (!exp.slug) continue;
        expertRoutes.push({
          url: `${siteUrl}/top-experts/${exp.slug}`,
          lastModified: exp.updatedAt ? new Date(exp.updatedAt) : now,
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  } catch (err) {
    console.error('sitemap.ts: Top experts retrieval warning:', err);
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...categoryRoutes,
    ...postRoutes,
    ...expertRoutes,
  ];
}
