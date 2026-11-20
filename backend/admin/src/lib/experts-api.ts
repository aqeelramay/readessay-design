import { apiRequest } from './auth-api';

export interface ExpertItem {
  id: string;
  name: string;
  slug: string;
  roleTitle: string;
  university: string;
  degree: string;
  avatarUrl: string | null;
  rating: number;
  completedOrders: number;
  successRate: string;
  experienceYears: number;
  bio: string;
  specialties: string[];
  featuredReviewQuote: string | null;
  featuredReviewAuthor: string | null;
  isFeatured: boolean;
  displayOrder: number;
  status: 'published' | 'draft' | string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpertPayload {
  name: string;
  slug?: string;
  roleTitle: string;
  university: string;
  degree: string;
  avatarUrl?: string | null;
  rating?: number;
  completedOrders?: number;
  successRate?: string;
  experienceYears?: number;
  bio: string;
  specialties: string[];
  featuredReviewQuote?: string | null;
  featuredReviewAuthor?: string | null;
  isFeatured?: boolean;
  displayOrder?: number;
  status?: string;
}

export type UpdateExpertPayload = Partial<CreateExpertPayload>;

export interface GetAdminExpertsParams {
  search?: string;
  specialty?: string;
  status?: string;
  featured?: string;
}

export interface UploadExpertAvatarResponse {
  fileName: string;
  url: string;
}

/**
 * Fetch all experts (Admin)
 */
export async function getAdminExperts(
  params?: GetAdminExpertsParams,
): Promise<ExpertItem[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.specialty) query.set('specialty', params.specialty);
  if (params?.status) query.set('status', params.status);
  if (params?.featured) query.set('featured', params.featured);

  const qs = query.toString();
  const endpoint = `/experts/admin${qs ? `?${qs}` : ''}`;
  return apiRequest<ExpertItem[]>(endpoint);
}

/**
 * Fetch a single expert by ID (Admin)
 */
export async function getAdminExpertById(id: string): Promise<ExpertItem> {
  return apiRequest<ExpertItem>(`/experts/admin/${id}`);
}

/**
 * Create a new expert
 */
export async function createExpert(
  payload: CreateExpertPayload,
): Promise<ExpertItem> {
  return apiRequest<ExpertItem>('/experts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing expert
 */
export async function updateExpert(
  id: string,
  payload: UpdateExpertPayload,
): Promise<ExpertItem> {
  return apiRequest<ExpertItem>(`/experts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete an expert
 */
export async function deleteExpert(
  id: string,
): Promise<{ success: boolean; message: string }> {
  return apiRequest<{ success: boolean; message: string }>(`/experts/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Upload expert avatar photo
 */
export async function uploadExpertAvatar(
  file: File,
): Promise<UploadExpertAvatarResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest<UploadExpertAvatarResponse>('/experts/upload-avatar', {
    method: 'POST',
    body: formData,
  });
}
