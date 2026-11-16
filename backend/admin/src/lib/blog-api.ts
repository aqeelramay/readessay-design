import { apiRequest } from './auth-api';

export type BlogStatus = 'published' | 'draft' | 'archived';

export interface BlogCategorySEO {
  metaTitle: string;
  metaDescription: string;
  canonicalSlug?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  badgeLabel: string;
  shortDescription: string;
  status: BlogStatus;
  displayOrder: number;
  updatedAt: string;
  createdAt?: string;
  postCount?: number;
  seo: BlogCategorySEO;
  posts?: BlogPost[];
}

export interface BlogFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPostSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalSlug?: string;
}

export interface BlogAuthor {
  name: string;
  credentials: string;
  roleSubtitle: string;
  experienceLine: string;
  bio: string;
}

export interface BlogFeaturedImage {
  url: string;
  altText: string;
  caption: string;
}

export interface BlogPostFaqSection {
  tagline: string;
  heading: string;
  items: BlogFaqItem[];
}

export interface BlogPost {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  featuredImage: BlogFeaturedImage;
  contentHtml: string;
  author: BlogAuthor;
  faqSection: BlogPostFaqSection;
  relatedPostIds: string[];
  relatedPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    readTime: string;
    publishedAt: string;
    featuredImage: BlogFeaturedImage;
  }>;
  tocHeadings?: string[];
  status: BlogStatus;
  updatedAt: string;
  createdAt?: string;
  seo: BlogPostSEO;
  category?: {
    id: string;
    name: string;
    slug: string;
    badgeLabel: string;
  };
}

export interface GetBlogCategoriesParams {
  search?: string;
  status?: string;
}

export interface BlogCategoriesMetrics {
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  archivedCount: number;
}

export interface BlogCategoriesResponse {
  categories: BlogCategory[];
  metrics: BlogCategoriesMetrics;
}

export interface GetBlogPostsParams {
  search?: string;
  status?: string;
  categoryId?: string;
  categorySlug?: string;
  page?: number;
  limit?: number;
}

export interface BlogPostsMetrics {
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  archivedCount: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  metrics: BlogPostsMetrics;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBlogCategoryPayload {
  name: string;
  slug: string;
  badgeLabel?: string;
  shortDescription?: string;
  status?: BlogStatus;
  displayOrder?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalSlug?: string | null;
  seo?: Partial<BlogCategorySEO>;
}

export type UpdateBlogCategoryPayload = Partial<CreateBlogCategoryPayload>;

export interface CreateBlogPostPayload {
  categoryId: string;
  title: string;
  slug: string;
  excerpt?: string;
  readTime?: string;
  publishedAt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  featuredImage?: Partial<BlogFeaturedImage>;
  contentHtml?: string;
  authorName?: string;
  authorCredentials?: string;
  authorRoleSubtitle?: string;
  authorExperienceLine?: string;
  authorBio?: string;
  author?: Partial<BlogAuthor>;
  faqTagline?: string;
  faqHeading?: string;
  faqItems?: BlogFaqItem[];
  faqSection?: Partial<BlogPostFaqSection>;
  relatedPostIds?: string[];
  status?: BlogStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalSlug?: string | null;
  seo?: Partial<BlogPostSEO>;
}

export type UpdateBlogPostPayload = Partial<CreateBlogPostPayload>;

export interface UploadBlogImageResponse {
  url: string;
  fileName: string;
  storedName: string;
  size: number;
}

// ==========================================
// Blog Categories API
// ==========================================

export async function getBlogCategories(
  params?: GetBlogCategoriesParams,
): Promise<BlogCategoriesResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.status && params.status !== 'all') query.append('status', params.status);

  const qs = query.toString();
  return apiRequest<BlogCategoriesResponse>(`/blog/categories${qs ? `?${qs}` : ''}`);
}

export async function getBlogCategoryByIdOrSlug(idOrSlug: string): Promise<BlogCategory> {
  return apiRequest<BlogCategory>(`/blog/categories/${idOrSlug}`);
}

export async function createBlogCategory(
  payload: CreateBlogCategoryPayload,
): Promise<BlogCategory> {
  return apiRequest<BlogCategory>('/blog/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateBlogCategory(
  id: string,
  payload: UpdateBlogCategoryPayload,
): Promise<BlogCategory> {
  return apiRequest<BlogCategory>(`/blog/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteBlogCategory(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(`/blog/categories/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Blog Posts API
// ==========================================

export async function getBlogPosts(
  params?: GetBlogPostsParams,
): Promise<BlogPostsResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.status && params.status !== 'all') query.append('status', params.status);
  if (params?.categoryId && params.categoryId !== 'all') query.append('categoryId', params.categoryId);
  if (params?.categorySlug && params.categorySlug !== 'all') query.append('categorySlug', params.categorySlug);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const qs = query.toString();
  return apiRequest<BlogPostsResponse>(`/blog/posts${qs ? `?${qs}` : ''}`);
}

export async function getBlogPostByIdOrSlug(idOrSlug: string): Promise<BlogPost> {
  return apiRequest<BlogPost>(`/blog/posts/${idOrSlug}`);
}

export async function createBlogPost(
  payload: CreateBlogPostPayload,
): Promise<BlogPost> {
  return apiRequest<BlogPost>('/blog/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateBlogPost(
  id: string,
  payload: UpdateBlogPostPayload,
): Promise<BlogPost> {
  return apiRequest<BlogPost>(`/blog/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteBlogPost(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(`/blog/posts/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Blog Image Upload API
// ==========================================

export async function uploadBlogImage(file: File): Promise<UploadBlogImageResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest<UploadBlogImageResponse>('/blog/upload-image', {
    method: 'POST',
    body: formData,
  });
}
