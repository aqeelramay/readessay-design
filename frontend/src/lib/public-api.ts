import { apiClient, RequestOptions } from './apiClient';

// ============================================================================
// Service Interfaces
// ============================================================================

export interface PublicFaqItem {
  question: string;
  answer: string;
}

export interface PublicProcessStep {
  stepNumber?: number;
  title: string;
  description: string;
}

export interface PublicSubService {
  id: string;
  title: string;
  slug: string;
  serviceId?: string;
  badgeLabel?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  heroBadge?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  content?: string | null;
  features?: string[] | null;
  faqs?: PublicFaqItem[] | null;
  processSteps?: PublicProcessStep[] | null;
  icon?: string | null;
  featuredImage?: string | null;
  displayOrder?: number;
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  service?: {
    id: string;
    title: string;
    slug: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicService {
  id: string;
  title: string;
  slug: string;
  badgeLabel?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  heroBadge?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  content?: string | null;
  features?: string[] | null;
  faqs?: PublicFaqItem[] | null;
  processSteps?: PublicProcessStep[] | null;
  icon?: string | null;
  iconName?: string | null;
  featuredImage?: string | null;
  displayOrder?: number;
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  subServices?: PublicSubService[];
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Review Interfaces
// ============================================================================

export interface PublicReview {
  id: string;
  clientName: string;
  serviceTitle?: string | null;
  serviceSlug?: string | null;
  subServiceTitle?: string | null;
  subServiceSlug?: string | null;
  academicLevel?: string | null;
  rating: number;
  reviewDate: string;
  comment: string;
  isVerified: boolean;
  isFeatured: boolean;
  status: string;
  createdAt: string;
}

export interface PublicReviewsResponse {
  reviews: PublicReview[];
  total: number;
  page?: number;
  limit?: number;
  metrics?: {
    totalReviews: number;
    averageRating: number;
    ratingBreakdown?: Record<string, number>;
  };
}

// ============================================================================
// Sample Interfaces
// ============================================================================

export interface PublicSample {
  id: string;
  title: string;
  slug: string;
  sectionId?: string;
  discipline?: string;
  academicLevel?: string | null;
  paperType?: string | null;
  citationStyle?: string | null;
  pagesCount?: number | null;
  wordsCount?: number | null;
  gradeAchieved?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: string | null;
  fileType?: string | null;
  previewSnippet?: string | null;
  isFeatured?: boolean;
  status: string;
  createdAt: string;
}

export interface PublicDisciplineSection {
  id: string;
  name: string;
  slug: string;
  badgeLabel?: string | null;
  shortDescription?: string | null;
  iconName?: string | null;
  displayOrder?: number;
  sampleCount?: number;
  samples?: PublicSample[];
}

export interface PublicSamplesResponse {
  sections?: PublicDisciplineSection[];
  samples?: PublicSample[];
  total?: number;
}

// ============================================================================
// Blog Interfaces
// ============================================================================

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalSlug?: string;
}

export interface BlogFeaturedImage {
  url?: string;
  altText?: string;
  caption?: string;
}

export interface BlogAuthor {
  name?: string;
  credentials?: string;
  roleSubtitle?: string;
  experienceLine?: string;
  bio?: string;
}

export interface BlogFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogFaqSection {
  tagline?: string;
  heading?: string;
  items?: BlogFaqItem[];
}

export interface PublicBlogCategory {
  id: string;
  name: string;
  slug: string;
  badgeLabel?: string | null;
  shortDescription?: string | null;
  displayOrder: number;
  status: string;
  postCount?: number;
  seo?: BlogSeo;
  posts?: PublicBlogPost[];
}

export interface BlogTocHeading {
  id: string;
  text: string;
}

export interface PublicBlogPost {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  readTime?: string | null;
  publishedAt?: string | null;
  featuredImage?: BlogFeaturedImage | null;
  contentHtml: string;
  author?: BlogAuthor | null;
  faqSection?: BlogFaqSection | null;
  seo?: BlogSeo | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tocHeadings?: BlogTocHeading[];
  relatedPosts?: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    readTime?: string;
    publishedAt?: string;
    featuredImage?: BlogFeaturedImage;
  }[];
}

export interface PublicBlogPostsResponse {
  posts: PublicBlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// Public Storefront API Client Functions
// ============================================================================

/**
 * Fetch hierarchical services and their active sub-services
 */
export async function getPublicServiceTree(
  options?: RequestOptions,
): Promise<PublicService[]> {
  return apiClient<PublicService[]>('/services/public/tree', options);
}

/**
 * Fetch a single top-level service by slug. Returns null on 404.
 */
export async function getPublicServiceBySlug(
  slug: string,
  options?: RequestOptions,
): Promise<PublicService | null> {
  try {
    return await apiClient<PublicService>(`/services/public/${slug}`, options);
  } catch {
    return null;
  }
}

/**
 * Fetch a sub-service by parent service slug and sub-service slug. Returns null on 404.
 */
export async function getPublicSubService(
  serviceSlug: string,
  subServiceSlug: string,
  options?: RequestOptions,
): Promise<PublicSubService | null> {
  try {
    return await apiClient<PublicSubService>(
      `/sub-services/public/${serviceSlug}/${subServiceSlug}`,
      options,
    );
  } catch {
    return null;
  }
}

/**
 * Fetch public customer reviews with optional filtering
 */
export async function getPublicReviews(
  params?: {
    serviceSlug?: string;
    subServiceSlug?: string;
    rating?: number;
    academicLevel?: string;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
  },
  options?: RequestOptions,
): Promise<PublicReviewsResponse | PublicReview[]> {
  return apiClient<PublicReviewsResponse | PublicReview[]>('/reviews/public', {
    ...options,
    params,
  });
}

/**
 * Fetch public academic samples and discipline categories
 */
export async function getPublicSamples(
  params?: {
    disciplineSlug?: string;
    search?: string;
    academicLevel?: string;
    page?: number;
    limit?: number;
  },
  options?: RequestOptions,
): Promise<PublicSamplesResponse | PublicDisciplineSection[]> {
  return apiClient<PublicSamplesResponse | PublicDisciplineSection[]>(
    '/samples/public',
    {
      ...options,
      params,
    },
  );
}

/**
 * Fetch public blog editorial categories
 */
export async function getPublicBlogCategories(
  options?: RequestOptions,
): Promise<PublicBlogCategory[]> {
  return apiClient<PublicBlogCategory[]>('/blog/public/categories', options);
}

/**
 * Fetch a single blog category with its posts by slug
 */
export async function getPublicBlogCategoryBySlug(
  slug: string,
  options?: RequestOptions,
): Promise<PublicBlogCategory> {
  return apiClient<PublicBlogCategory>(
    `/blog/public/categories/${slug}`,
    options,
  );
}

/**
 * Fetch paginated public blog posts
 */
export async function getPublicBlogPosts(
  params?: {
    categorySlug?: string;
    search?: string;
    page?: number;
    limit?: number;
  },
  options?: RequestOptions,
): Promise<PublicBlogPostsResponse> {
  return apiClient<PublicBlogPostsResponse>('/blog/public/posts', {
    ...options,
    params,
  });
}

/**
 * Fetch a single blog post by slug with Table of Contents and Related Posts
 */
export async function getPublicBlogPostBySlug(
  slug: string,
  options?: RequestOptions,
): Promise<PublicBlogPost> {
  return apiClient<PublicBlogPost>(`/blog/public/posts/${slug}`, options);
}
