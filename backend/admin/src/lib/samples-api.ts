import { apiRequest } from './auth-api';

export type SampleStatus = 'active' | 'draft' | 'archived';

export interface SampleSectionSEO {
  metaTitle: string;
  metaDescription: string;
}

export interface SampleSection {
  id: string;
  heading: string;
  shortSummary: string;
  status: SampleStatus;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  seo: SampleSectionSEO;
  sampleCount?: number;
  samples?: AcademicSample[];
  createdAt?: string;
  updatedAt: string;
}

export interface AcademicSampleFile {
  fileName: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  fileUrl: string;
}

export interface AcademicSample {
  id: string;
  sectionId: string;
  title: string;
  pageCount: number;
  academicLevel: string;
  documentType: string;
  citationStyle: string;
  customMetaLabel: string;
  customMetaValue: string;
  fileName?: string;
  fileType?: 'PDF' | 'DOCX';
  fileSize?: string;
  fileUrl?: string;
  documentFile: AcademicSampleFile;
  status: SampleStatus;
  displayOrder: number;
  createdAt?: string;
  updatedAt: string;
  section?: {
    id: string;
    heading: string;
  };
}

export interface GetSectionsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface SectionsSummary {
  totalCount: number;
  activeCount: number;
  draftCount: number;
  archivedCount: number;
}

export interface SampleSectionsResponse {
  data: SampleSection[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  summary: SectionsSummary;
}

export interface GetSamplesParams {
  search?: string;
  status?: string;
  sectionId?: string;
  academicLevel?: string;
  citationStyle?: string;
  page?: number;
  limit?: number;
}

export interface SamplesSummary {
  totalCount: number;
  activeCount: number;
  draftCount: number;
  archivedCount: number;
  totalPages: number;
}

export interface AcademicSamplesResponse {
  data: AcademicSample[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  summary: SamplesSummary;
}

export interface CreateSampleSectionPayload {
  heading: string;
  shortSummary: string;
  status?: SampleStatus;
  displayOrder?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  seo?: Partial<SampleSectionSEO>;
}

export type UpdateSampleSectionPayload = Partial<CreateSampleSectionPayload>;

export interface CreateAcademicSamplePayload {
  sectionId: string;
  title: string;
  pageCount: number;
  academicLevel: string;
  documentType: string;
  citationStyle: string;
  customMetaLabel?: string;
  customMetaValue?: string;
  fileName?: string;
  fileType?: 'PDF' | 'DOCX';
  fileSize?: string;
  fileUrl?: string;
  documentFile?: AcademicSampleFile;
  status?: SampleStatus;
  displayOrder?: number;
}

export type UpdateAcademicSamplePayload = Partial<CreateAcademicSamplePayload>;

export interface UploadDocumentResponse {
  fileName: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  fileUrl: string;
}

// ==========================================
// Discipline Sections API
// ==========================================

export async function getSampleSections(
  params?: GetSectionsParams,
): Promise<SampleSectionsResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.status && params.status !== 'all') query.append('status', params.status);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const qs = query.toString();
  return apiRequest<SampleSectionsResponse>(`/samples/sections${qs ? `?${qs}` : ''}`);
}

export async function getSampleSectionById(id: string): Promise<SampleSection> {
  return apiRequest<SampleSection>(`/samples/sections/${id}`);
}

export async function createSampleSection(
  payload: CreateSampleSectionPayload,
): Promise<SampleSection> {
  return apiRequest<SampleSection>('/samples/sections', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateSampleSection(
  id: string,
  payload: UpdateSampleSectionPayload,
): Promise<SampleSection> {
  return apiRequest<SampleSection>(`/samples/sections/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteSampleSection(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(`/samples/sections/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Academic Samples API
// ==========================================

export async function getAcademicSamples(
  params?: GetSamplesParams,
): Promise<AcademicSamplesResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.status && params.status !== 'all') query.append('status', params.status);
  if (params?.sectionId && params.sectionId !== 'all') query.append('sectionId', params.sectionId);
  if (params?.academicLevel && params.academicLevel !== 'all') query.append('academicLevel', params.academicLevel);
  if (params?.citationStyle && params.citationStyle !== 'all') query.append('citationStyle', params.citationStyle);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const qs = query.toString();
  return apiRequest<AcademicSamplesResponse>(`/samples/items${qs ? `?${qs}` : ''}`);
}

export async function getAcademicSampleById(id: string): Promise<AcademicSample> {
  return apiRequest<AcademicSample>(`/samples/items/${id}`);
}

export async function createAcademicSample(
  payload: CreateAcademicSamplePayload,
): Promise<AcademicSample> {
  const { documentFile, ...rest } = payload;
  const body = {
    ...rest,
    ...(rest.fileName || documentFile?.fileName
      ? { fileName: rest.fileName ?? documentFile?.fileName }
      : {}),
    ...(rest.fileType || documentFile?.fileType
      ? { fileType: rest.fileType ?? documentFile?.fileType }
      : {}),
    ...(rest.fileSize || documentFile?.fileSize
      ? { fileSize: rest.fileSize ?? documentFile?.fileSize }
      : {}),
    ...(rest.fileUrl || documentFile?.fileUrl
      ? { fileUrl: rest.fileUrl ?? documentFile?.fileUrl }
      : {}),
  };

  return apiRequest<AcademicSample>('/samples/items', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateAcademicSample(
  id: string,
  payload: UpdateAcademicSamplePayload,
): Promise<AcademicSample> {
  const { documentFile, ...rest } = payload;
  const body = {
    ...rest,
    ...(rest.fileName || documentFile?.fileName
      ? { fileName: rest.fileName ?? documentFile?.fileName }
      : {}),
    ...(rest.fileType || documentFile?.fileType
      ? { fileType: rest.fileType ?? documentFile?.fileType }
      : {}),
    ...(rest.fileSize || documentFile?.fileSize
      ? { fileSize: rest.fileSize ?? documentFile?.fileSize }
      : {}),
    ...(rest.fileUrl || documentFile?.fileUrl
      ? { fileUrl: rest.fileUrl ?? documentFile?.fileUrl }
      : {}),
  };

  return apiRequest<AcademicSample>(`/samples/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteAcademicSample(
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return apiRequest<{ deleted: boolean; id: string }>(`/samples/items/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// Document File Upload
// ==========================================

export async function uploadSampleDocument(file: File): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest<UploadDocumentResponse>('/samples/upload', {
    method: 'POST',
    body: formData,
  });
}

// ==========================================
// Public Storefront Query
// ==========================================

export async function getPublicSamples(): Promise<{
  data: SampleSection[];
  stats: { totalSections: number; totalSamples: number };
}> {
  return apiRequest<{
    data: SampleSection[];
    stats: { totalSections: number; totalSamples: number };
  }>('/samples/public');
}
