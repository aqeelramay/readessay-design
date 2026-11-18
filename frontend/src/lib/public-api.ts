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
  reviewerName?: string;
  studentName?: string;
  reviewerInitials?: string | null;
  reviewerAvatar?: string | null;
  avatarUrl?: string | null;
  academicLevel?: string | null;
  subject?: string | null;
  courseLabel?: string | null;
  paperType?: string | null;
  rating: number;
  title?: string | null;
  quoteHeadline?: string | null;
  comment: string;
  reviewBody?: string | null;
  orderRef?: string | null;
  serviceId?: string | null;
  subServiceId?: string | null;
  isVerified: boolean;
  verified?: boolean;
  isFeatured: boolean;
  sortOrder?: number;
  displayOrder?: number;
  reviewDate: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  service?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  subService?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  // Legacy / compatibility properties
  serviceTitle?: string | null;
  serviceSlug?: string | null;
  subServiceTitle?: string | null;
  subServiceSlug?: string | null;
}

export interface PublicReviewsStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown?: Record<number, number>;
}

export interface PublicReviewsResponse {
  data?: PublicReview[];
  reviews?: PublicReview[];
  stats?: PublicReviewsStats;
  total?: number;
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

export interface PublicSampleFile {
  fileName: string;
  fileType: 'PDF' | 'DOCX' | string;
  fileSize: string;
  fileUrl: string;
}

export interface PublicAcademicSample {
  id: string;
  sectionId: string;
  title: string;
  pageCount: number;
  academicLevel: string;
  documentType: string;
  citationStyle: string;
  customMetaLabel?: string | null;
  customMetaValue?: string | null;
  fileName?: string;
  fileType?: 'PDF' | 'DOCX' | string;
  fileSize?: string;
  fileUrl?: string;
  documentFile: PublicSampleFile;
  status: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicSampleSection {
  id: string;
  heading: string;
  shortSummary: string;
  status: string;
  displayOrder: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  sampleCount?: number;
  samples: PublicAcademicSample[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicSamplesResponse {
  data?: PublicSampleSection[];
  sections?: PublicSampleSection[];
  stats?: {
    totalSections: number;
    totalSamples: number;
  };
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
    badgeLabel?: string | null;
  };
  tocHeadings?: (string | BlogTocHeading)[];
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
): Promise<PublicSamplesResponse> {
  return apiClient<PublicSamplesResponse>(
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
 * Fetch a single blog category with its posts by slug. Returns null on 404.
 */
export async function getPublicBlogCategoryBySlug(
  slug: string,
  options?: RequestOptions,
): Promise<PublicBlogCategory | null> {
  try {
    return await apiClient<PublicBlogCategory>(
      `/blog/public/categories/${slug}`,
      options,
    );
  } catch {
    return null;
  }
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
 * Fetch a single blog post by slug with Table of Contents and Related Posts. Returns null on 404.
 */
export async function getPublicBlogPostBySlug(
  slug: string,
  options?: RequestOptions,
): Promise<PublicBlogPost | null> {
  try {
    return await apiClient<PublicBlogPost>(`/blog/public/posts/${slug}`, options);
  } catch {
    return null;
  }
}

// ============================================================================
// Order Pricing & Calculator Interfaces
// ============================================================================

export interface PublicCalculatorConfig {
  id: string;
  widgetTitle: string;
  widgetSubtitle: string;
  badgeText: string;
  ctaButtonText: string;
  currencySymbol: string;
  wordsPerPage: number;
  minPages: number;
  maxPages: number;
  defaultPages: number;
  defaultLevelSlug: string;
  defaultDeadlineSlug: string;
  useServicesFromCatalog: boolean;
}

export interface PublicCalculatorLevel {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
  isActive: boolean;
}

export interface PublicCalculatorDeadline {
  id: string;
  label: string;
  slug: string;
  hours: number;
  displayOrder: number;
  isActive: boolean;
}

export interface PublicCalculatorPaperType {
  id: string;
  name: string;
  slug: string;
  multiplier: number;
  displayOrder: number;
  isActive: boolean;
}

export interface PublicCalculatorRate {
  id: string;
  levelId: string;
  deadlineId: string;
  pricePerPage: number;
}

export interface PublicCalculatorServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  icon?: string | null;
}

export interface PublicCalculatorResponse {
  config: PublicCalculatorConfig;
  levels: PublicCalculatorLevel[];
  deadlines: PublicCalculatorDeadline[];
  paperTypes: PublicCalculatorPaperType[];
  services: PublicCalculatorServiceItem[];
  rates: PublicCalculatorRate[];
}

/**
 * Fetch public order pricing calculator data
 */
export async function getPublicCalculator(
  options?: RequestOptions,
): Promise<PublicCalculatorResponse> {
  return apiClient<PublicCalculatorResponse>('/calculator/public', options);
}

