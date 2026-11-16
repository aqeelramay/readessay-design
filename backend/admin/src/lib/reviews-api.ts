import { apiRequest } from './auth-api';

export type ReviewStatus = 'PUBLISHED' | 'PENDING' | 'HIDDEN';

export interface ReviewServiceMeta {
  id: string;
  title: string;
  slug: string;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  studentName: string; // Compatibility alias
  authorName: string; // Compatibility alias
  reviewerInitials: string;
  reviewerAvatar: string | null;
  avatarUrl: string | null; // Compatibility alias
  academicLevel: string | null;
  subject: string | null;
  courseLabel: string; // Compatibility alias
  paperType: string | null;
  rating: number;
  title: string | null;
  quoteHeadline: string; // Compatibility alias
  comment: string;
  reviewBody: string; // Compatibility alias
  orderRef: string | null;
  serviceId: string | null;
  subServiceId: string | null;
  isVerified: boolean;
  verified: boolean; // Compatibility alias
  isFeatured: boolean;
  sortOrder: number;
  displayOrder: number; // Compatibility alias
  reviewDate: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  service: ReviewServiceMeta | null;
  subService: ReviewServiceMeta | null;
}

export interface GetReviewsParams {
  search?: string;
  status?: string;
  rating?: number;
  serviceId?: string;
  subServiceId?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface ReviewsSummary {
  totalCount: number;
  publishedCount: number;
  pendingCount: number;
  hiddenCount: number;
  featuredCount: number;
  averageRating: number;
}

export interface GetReviewsResponse {
  data: ReviewItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  summary: ReviewsSummary;
}

export interface PublicReviewsResponse {
  data: ReviewItem[];
  stats: {
    averageRating: number;
    totalReviews: number;
  };
}

export interface CreateReviewPayload {
  reviewerName: string;
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
  isVerified?: boolean;
  verified?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
  displayOrder?: number;
  reviewDate?: string | null;
  status?: string;
}

export type UpdateReviewPayload = Partial<CreateReviewPayload>;

/**
 * Fetch paginated & filtered list of reviews with KPI summary
 */
export async function getReviews(
  params?: GetReviewsParams,
): Promise<GetReviewsResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.rating) query.set('rating', String(params.rating));
  if (params?.serviceId && params.serviceId !== 'all') query.set('serviceId', params.serviceId);
  if (params?.subServiceId && params.subServiceId !== 'all') query.set('subServiceId', params.subServiceId);
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  return apiRequest<GetReviewsResponse>(`/reviews${qs ? `?${qs}` : ''}`, {
    method: 'GET',
  });
}

/**
 * Fetch public published reviews for storefront widgets
 */
export async function getPublicReviews(
  params?: { isFeatured?: boolean; limit?: number; serviceSlug?: string; subServiceSlug?: string },
): Promise<PublicReviewsResponse> {
  const query = new URLSearchParams();
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.serviceSlug) query.set('serviceSlug', params.serviceSlug);
  if (params?.subServiceSlug) query.set('subServiceSlug', params.subServiceSlug);

  const qs = query.toString();
  return apiRequest<PublicReviewsResponse>(`/reviews/public${qs ? `?${qs}` : ''}`, {
    method: 'GET',
  });
}

/**
 * Fetch a single review by ID
 */
export async function getReviewById(id: string): Promise<ReviewItem> {
  return apiRequest<ReviewItem>(`/reviews/${encodeURIComponent(id)}`, {
    method: 'GET',
  });
}

/**
 * Create a new review
 */
export async function createReview(
  payload: CreateReviewPayload,
): Promise<ReviewItem> {
  return apiRequest<ReviewItem>('/reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing review by ID
 */
export async function updateReview(
  id: string,
  payload: UpdateReviewPayload,
): Promise<ReviewItem> {
  return apiRequest<ReviewItem>(`/reviews/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete a review by ID
 */
export async function deleteReview(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(
    `/reviews/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  );
}
