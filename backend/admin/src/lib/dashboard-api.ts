import { apiRequest } from './auth-api';

export interface DashboardServicesStats {
  totalServices: number;
  publishedServices: number;
  draftServices: number;
  totalSubServices: number;
  publishedSubServices: number;
  draftSubServices: number;
}

export interface DashboardReviewsStats {
  totalReviews: number;
  publishedReviews: number;
  pendingOrDraftReviews: number;
  featuredReviews: number;
  averageRating: number;
}

export interface DashboardSamplesStats {
  totalSections: number;
  activeSections: number;
  totalSamples: number;
  activeSamples: number;
  totalPagesArchived: number;
}

export interface DashboardBlogStats {
  totalCategories: number;
  publishedCategories: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
}

export interface DashboardCalculatorStats {
  activeLevels: number;
  activeDeadlines: number;
  totalRateCells: number;
  wordsPerPage: number;
  sampleBaseRate: number;
  currencySymbol: string;
}

export interface DashboardRecentPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface DashboardRecentReview {
  id: string;
  reviewerName: string;
  rating: number;
  serviceName: string;
  status: string;
  createdAt: string;
}

export interface DashboardRecentSample {
  id: string;
  title: string;
  academicLevel: string;
  fileType: string;
  pageCount: number;
  status: string;
  section?: {
    heading: string;
  };
}

export interface DashboardRecentActivity {
  posts: DashboardRecentPost[];
  reviews: DashboardRecentReview[];
  samples: DashboardRecentSample[];
}

export interface DashboardExpertsStats {
  totalExperts: number;
  publishedExperts: number;
  featuredExperts: number;
}

export interface DashboardStatsResponse {
  services: DashboardServicesStats;
  reviews: DashboardReviewsStats;
  samples: DashboardSamplesStats;
  blog: DashboardBlogStats;
  calculator: DashboardCalculatorStats;
  experts?: DashboardExpertsStats;
  recent: DashboardRecentActivity;
}

/**
 * Fetch unified dashboard statistics and recent content from the NestJS API
 */
export async function getDashboardStats(): Promise<DashboardStatsResponse> {
  return apiRequest<DashboardStatsResponse>('/dashboard/stats');
}
