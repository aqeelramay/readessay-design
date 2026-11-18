import { apiRequest } from './auth-api';

export interface CalculatorConfig {
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
  createdAt: string;
  updatedAt: string;
}

export interface CalculatorLevel {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalculatorDeadline {
  id: string;
  label: string;
  slug: string;
  hours: number;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalculatorPaperType {
  id: string;
  name: string;
  slug: string;
  multiplier: number;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CalculatorRate {
  id: string;
  levelId: string;
  deadlineId: string;
  pricePerPage: number;
}

export interface CatalogServiceOption {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  icon?: string | null;
}

export interface AdminCalculatorData {
  config: CalculatorConfig;
  levels: CalculatorLevel[];
  deadlines: CalculatorDeadline[];
  paperTypes: CalculatorPaperType[];
  rates: CalculatorRate[];
  services: CatalogServiceOption[];
}

export async function getAdminCalculatorData(): Promise<AdminCalculatorData> {
  return apiRequest<AdminCalculatorData>('/calculator/admin');
}

export async function updateCalculatorConfig(
  payload: Partial<CalculatorConfig>,
): Promise<CalculatorConfig> {
  return apiRequest<CalculatorConfig>('/calculator/config', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function bulkUpdateCalculatorRates(
  rates: { levelId: string; deadlineId: string; pricePerPage: number }[],
): Promise<{ success: boolean; updatedCount: number }> {
  return apiRequest<{ success: boolean; updatedCount: number }>(
    '/calculator/rates/bulk',
    {
      method: 'PUT',
      body: JSON.stringify({ rates }),
    },
  );
}

export async function createCalculatorLevel(payload: {
  name: string;
  slug?: string;
  displayOrder?: number;
  isActive?: boolean;
}): Promise<CalculatorLevel> {
  return apiRequest<CalculatorLevel>('/calculator/levels', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCalculatorLevel(
  id: string,
  payload: Partial<CalculatorLevel>,
): Promise<CalculatorLevel> {
  return apiRequest<CalculatorLevel>(`/calculator/levels/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCalculatorLevel(
  id: string,
): Promise<CalculatorLevel> {
  return apiRequest<CalculatorLevel>(`/calculator/levels/${id}`, {
    method: 'DELETE',
  });
}

export async function createCalculatorDeadline(payload: {
  label: string;
  slug?: string;
  hours: number;
  displayOrder?: number;
  isActive?: boolean;
}): Promise<CalculatorDeadline> {
  return apiRequest<CalculatorDeadline>('/calculator/deadlines', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCalculatorDeadline(
  id: string,
  payload: Partial<CalculatorDeadline>,
): Promise<CalculatorDeadline> {
  return apiRequest<CalculatorDeadline>(`/calculator/deadlines/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCalculatorDeadline(
  id: string,
): Promise<CalculatorDeadline> {
  return apiRequest<CalculatorDeadline>(`/calculator/deadlines/${id}`, {
    method: 'DELETE',
  });
}

export async function createCalculatorPaperType(payload: {
  name: string;
  slug?: string;
  multiplier?: number;
  displayOrder?: number;
  isActive?: boolean;
}): Promise<CalculatorPaperType> {
  return apiRequest<CalculatorPaperType>('/calculator/paper-types', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCalculatorPaperType(
  id: string,
  payload: Partial<CalculatorPaperType>,
): Promise<CalculatorPaperType> {
  return apiRequest<CalculatorPaperType>(`/calculator/paper-types/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCalculatorPaperType(
  id: string,
): Promise<CalculatorPaperType> {
  return apiRequest<CalculatorPaperType>(`/calculator/paper-types/${id}`, {
    method: 'DELETE',
  });
}
