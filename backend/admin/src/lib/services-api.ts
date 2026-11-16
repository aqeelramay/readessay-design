import { apiRequest } from './auth-api';

export type ServiceStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ServiceParentMeta {
  id: string;
  title: string;
  name?: string;
  slug: string;
}

/**
 * Top-Level Parent Service entity
 */
export interface ServiceItem {
  id: string;
  title: string;
  name: string; // Compatibility alias
  slug: string;
  fullPath: string; // e.g. /assignment-help
  fullUrl: string; // e.g. https://readessay.com/assignment-help
  shortDescription: string | null;
  shortIntro: string | null; // Compatibility alias
  heroBadge: string | null;
  heroTagline: string | null; // Compatibility alias
  heroTitle: string | null;
  heroH1: string | null; // Compatibility alias
  heroSubtitle: string | null;
  heroSummary: string | null; // Compatibility alias
  content: string;
  icon: string | null;
  featuredImage: string | null;
  features: unknown[];
  faqs: { id?: string; question: string; answer: string }[];
  processSteps: unknown[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  canonicalUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  displayOrder: number; // Compatibility alias
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
  _count?: {
    subServices?: number;
    children?: number; // Compatibility alias
  };
  subServices?: SubServiceItem[];
  children?: SubServiceItem[]; // Compatibility alias
}

/**
 * Child Sub-Service entity attached to a parent Service
 */
export interface SubServiceItem {
  id: string;
  serviceId: string;
  parentId: string; // Compatibility alias
  title: string;
  name: string; // Compatibility alias
  slug: string;
  fullPath: string; // e.g. /assignment-help/accounting
  fullUrl: string; // e.g. https://readessay.com/assignment-help/accounting
  shortDescription: string | null;
  shortIntro: string | null; // Compatibility alias
  heroBadge: string | null;
  heroTagline: string | null; // Compatibility alias
  heroTitle: string | null;
  heroH1: string | null; // Compatibility alias
  heroSubtitle: string | null;
  heroSummary: string | null; // Compatibility alias
  content: string;
  icon: string | null;
  featuredImage: string | null;
  features: unknown[];
  faqs: { id?: string; question: string; answer: string }[];
  processSteps: unknown[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  canonicalUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  displayOrder: number; // Compatibility alias
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
  service: ServiceParentMeta;
  parent: ServiceParentMeta; // Compatibility alias
}

export interface ParentServiceOption {
  id: string;
  title: string;
  name: string;
  slug: string;
  status: string;
  sortOrder?: number;
  icon?: string | null;
  fullPath?: string;
  fullUrl?: string;
  _count?: {
    subServices?: number;
    children?: number;
  };
}

// -----------------------------------------------------------------------------
// Request / Response Query Interfaces
// -----------------------------------------------------------------------------

export interface GetServicesParams {
  search?: string;
  status?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface GetServicesResponse {
  data: ServiceItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetSubServicesParams {
  search?: string;
  serviceId?: string;
  parentId?: string; // Compatibility alias
  status?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface GetSubServicesResponse {
  data: SubServiceItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// -----------------------------------------------------------------------------
// DTO Payloads (No startingPrice or deliveryTime)
// -----------------------------------------------------------------------------

export interface CreateServicePayload {
  title: string;
  name?: string;
  slug: string;
  shortDescription?: string | null;
  shortIntro?: string | null;
  heroBadge?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroH1?: string | null;
  heroSubtitle?: string | null;
  heroSummary?: string | null;
  content?: string;
  icon?: string | null;
  featuredImage?: string | null;
  features?: unknown[];
  faqs?: { id?: string; question: string; answer: string }[];
  processSteps?: unknown[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  canonicalUrl?: string | null;
  isFeatured?: boolean;
  sortOrder?: number;
  displayOrder?: number;
  status?: string;
}

export type UpdateServicePayload = Partial<CreateServicePayload>;

export interface CreateSubServicePayload {
  serviceId: string;
  parentId?: string; // Compatibility alias
  title: string;
  name?: string;
  slug: string;
  shortDescription?: string | null;
  shortIntro?: string | null;
  heroBadge?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroH1?: string | null;
  heroSubtitle?: string | null;
  heroSummary?: string | null;
  content?: string;
  icon?: string | null;
  featuredImage?: string | null;
  features?: unknown[];
  faqs?: { id?: string; question: string; answer: string }[];
  processSteps?: unknown[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  canonicalUrl?: string | null;
  isFeatured?: boolean;
  sortOrder?: number;
  displayOrder?: number;
  status?: string;
}

export type UpdateSubServicePayload = Partial<CreateSubServicePayload>;

// -----------------------------------------------------------------------------
// Top-Level Services API Methods (/services)
// -----------------------------------------------------------------------------

/**
 * Fetch paginated & filtered list of parent services
 */
export async function getServices(
  params?: GetServicesParams,
): Promise<GetServicesResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  return apiRequest<GetServicesResponse>(`/services${qs ? `?${qs}` : ''}`, {
    method: 'GET',
  });
}

/**
 * Fetch lightweight list of top-level parent services for dropdowns
 */
export async function getParentServices(): Promise<ParentServiceOption[]> {
  return apiRequest<ParentServiceOption[]>('/services/parents', {
    method: 'GET',
  });
}

/**
 * Fetch a single parent service by ID or slug
 */
export async function getServiceById(idOrSlug: string): Promise<ServiceItem> {
  return apiRequest<ServiceItem>(`/services/${encodeURIComponent(idOrSlug)}`, {
    method: 'GET',
  });
}

/**
 * Create a new top-level parent service
 */
export async function createService(
  payload: CreateServicePayload,
): Promise<ServiceItem> {
  return apiRequest<ServiceItem>('/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing top-level parent service by ID or slug
 */
export async function updateService(
  id: string,
  payload: UpdateServicePayload,
): Promise<ServiceItem> {
  return apiRequest<ServiceItem>(`/services/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete a top-level parent service by ID or slug
 */
export async function deleteService(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(
    `/services/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  );
}

// -----------------------------------------------------------------------------
// Sub-Services API Methods (/sub-services)
// -----------------------------------------------------------------------------

/**
 * Fetch paginated & filtered list of sub-services
 */
export async function getSubServices(
  params?: GetSubServicesParams,
): Promise<GetSubServicesResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  const serviceId = params?.serviceId || params?.parentId;
  if (serviceId && serviceId !== 'all') query.set('serviceId', serviceId);
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString();
  return apiRequest<GetSubServicesResponse>(`/sub-services${qs ? `?${qs}` : ''}`, {
    method: 'GET',
  });
}

/**
 * Fetch a single sub-service by ID or slug
 */
export async function getSubServiceById(
  idOrSlug: string,
  serviceId?: string,
): Promise<SubServiceItem> {
  const query = serviceId ? `?serviceId=${encodeURIComponent(serviceId)}` : '';
  return apiRequest<SubServiceItem>(
    `/sub-services/${encodeURIComponent(idOrSlug)}${query}`,
    {
      method: 'GET',
    },
  );
}

/**
 * Create a new sub-service attached to a parent service
 */
export async function createSubService(
  payload: CreateSubServicePayload,
): Promise<SubServiceItem> {
  return apiRequest<SubServiceItem>('/sub-services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing sub-service by ID or slug
 */
export async function updateSubService(
  id: string,
  payload: UpdateSubServicePayload,
): Promise<SubServiceItem> {
  return apiRequest<SubServiceItem>(`/sub-services/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete a sub-service by ID or slug
 */
export async function deleteSubService(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(
    `/sub-services/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  );
}
