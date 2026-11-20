import { PublicBlogPost, PublicExpert } from './public-api';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://readessay.com'
).replace(/\/$/, '');

/**
 * Global Organization schema for ReadEssay (operated by 786outsource Ltd)
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ReadEssay',
    legalName: '786outsource Ltd',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/readessay-logo.png`,
      width: 300,
      height: 100,
    },
    description:
      'Premier academic support, coursework consultation, online class guidance, and dissertation mentorship platform for collegiate scholars worldwide.',
    email: 'support@readessay.com',
    telephone: '+92-313-8400066',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-313-8400066',
        contactType: 'customer support',
        areaServed: 'Worldwide',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+44-7460-674811',
        contactType: 'technical support',
        areaServed: ['United Kingdom', 'Europe', 'North America'],
        availableLanguage: ['English'],
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '4200',
    },
    sameAs: ['https://x.com/readessay'],
  };
}

/**
 * Global WebSite schema with internal search action
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ReadEssay',
    description: "USA's No.1 Academic Platform & Coursework Support",
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList schema builder
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const fullUrl = item.url.startsWith('http')
        ? item.url
        : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

/**
 * Service schema builder for primary services and sub-services
 */
export function buildServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  const fullUrl = params.url.startsWith('http')
    ? params.url
    : `${SITE_URL}${params.url.startsWith('/') ? params.url : `/${params.url}`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: fullUrl,
    serviceType: params.category || 'Academic Support & Coursework Consultation',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Academic Coursework & Consultation Services',
    },
  };
}

/**
 * FAQPage schema builder
 */
export function buildFaqPageSchema(
  faqs?: Array<{ question: string; answer: string }> | null,
) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BlogPosting / Article schema builder
 */
export function buildArticleSchema(post: PublicBlogPost) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.featuredImage?.url
    ? post.featuredImage.url.startsWith('http')
      ? post.featuredImage.url
      : `${SITE_URL}${post.featuredImage.url}`
    : `${SITE_URL}/images/readessay-logo.png`;

  const authorName = post.author?.name || 'ReadEssay Editorial Faculty';
  const authorRole = post.author?.roleSubtitle || 'Academic Research Faculty';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || post.title,
    image: imageUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      honorificSuffix: post.author?.credentials || undefined,
      description: post.author?.bio || undefined,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    articleSection: post.category?.name || 'Academic Writing',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };
}

/**
 * Person schema builder for Top Experts
 */
export function buildPersonSchema(expert: PublicExpert) {
  const expertUrl = `${SITE_URL}/top-experts/${expert.slug}`;
  const avatarUrl = expert.avatarUrl
    ? expert.avatarUrl.startsWith('http')
      ? expert.avatarUrl
      : `${SITE_URL}${expert.avatarUrl.startsWith('/') ? expert.avatarUrl : `/${expert.avatarUrl}`}`
    : `${SITE_URL}/images/readessay-logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${expertUrl}#person`,
    name: expert.name,
    jobTitle: expert.roleTitle,
    honorificSuffix: expert.degree,
    image: avatarUrl,
    description: expert.bio,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'ReadEssay',
      url: SITE_URL,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: expert.university,
    },
    knowsAbout: expert.specialties,
    url: expertUrl,
  };
}

