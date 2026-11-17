import { PublicService, PublicReview, getPublicServiceTree, getPublicReviews } from './public-api';

export const DEFAULT_SERVICES: PublicService[] = [
  {
    id: 'srv-online-class',
    title: 'Online Class Help',
    slug: 'online-class-help',
    badgeLabel: 'Most Popular',
    shortDescription: 'Keeping up with lectures, quizzes, and assignments can be overwhelming. We will take your online class and manage your coursework.',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      { id: 'sub-1', title: 'Take My Class', slug: 'take-my-class', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-2', title: 'Course Assistance', slug: 'course-assistance', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-3', title: 'Protected Exams', slug: 'protected-exams', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
    ],
  },
  {
    id: 'srv-exam-help',
    title: 'Exam Help',
    slug: 'exam-help',
    badgeLabel: 'Guaranteed Pass',
    shortDescription: 'Are online proctored exams too stressful? Deadlines intimidating? Find verified doctoral experts ready to take assessments with total privacy.',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      { id: 'sub-4', title: 'Protected Exam Help', slug: 'protected-exam-help', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-5', title: 'Quiz & Test Assistance', slug: 'quiz-test-assistance', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-6', title: 'Proctored Tests', slug: 'proctored-tests', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
    ],
  },
  {
    id: 'srv-assignment-help',
    title: 'Assignment Help',
    slug: 'assignment-help',
    badgeLabel: 'PhD Experts',
    shortDescription: 'Rigorous analysis, research and citations. ReadEssay has writers trained across all disciplines ready for urgent guidelines.',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      { id: 'sub-7', title: 'Statistics Assignment', slug: 'assignment-statistics', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-8', title: 'Computer Science', slug: 'assignment-cs', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-9', title: 'Business Management', slug: 'assignment-business', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-10', title: 'Accounting', slug: 'assignment-accounting', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-11', title: 'Mathematics', slug: 'assignment-math', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-12', title: 'Essay Writing', slug: 'assignment-essay', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
    ],
  },
  {
    id: 'srv-homework-help',
    title: 'Homework Help',
    slug: 'homework-help',
    badgeLabel: '24h Delivery',
    shortDescription: 'Fast turnaround, step-by-step problem sets across STEM, coding, engineering, economics, and finance.',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      { id: 'sub-13', title: 'Statistics Homework', slug: 'hw-statistics', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-14', title: 'Economics Homework', slug: 'hw-economics', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-15', title: 'College Homework', slug: 'hw-college', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-16', title: 'CS & Coding Help', slug: 'hw-cs', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-17', title: 'Engineering Help', slug: 'hw-engineering', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
      { id: 'sub-18', title: 'Finance Homework', slug: 'hw-finance', status: 'PUBLISHED', createdAt: '', updatedAt: '' },
    ],
  },
];

export const DEFAULT_REVIEWS: PublicReview[] = [
  {
    id: 'rev-1',
    clientName: 'Natasha',
    serviceTitle: 'Online Course Service',
    rating: 5,
    comment: 'ReadEssay helped me with the most challenging course. Their experts took care of everything while I focused on my job.',
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-10-15',
    createdAt: '2026-10-15T00:00:00Z',
  },
  {
    id: 'rev-2',
    clientName: 'John',
    serviceTitle: 'Protected Exams Service',
    rating: 5,
    comment: "Their exam help is a lifesaver. I didn't expect to ace the subject. But I did! Hats off to you!",
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-10-12',
    createdAt: '2026-10-12T00:00:00Z',
  },
  {
    id: 'rev-3',
    clientName: 'Abraham',
    serviceTitle: 'Academic Helpers',
    rating: 5,
    comment: 'Their academic helpers are not only professional and reliable but also affordable. I was really scared at first, but now I recommend them to everyone.',
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-10-08',
    createdAt: '2026-10-08T00:00:00Z',
  },
  {
    id: 'rev-4',
    clientName: 'Stevia',
    serviceTitle: 'Online Class Services',
    rating: 5,
    comment: "One of my friends referred me to ReadEssay for their online class services. I couldn't handle online classes with a full-time job, but now I love their services.",
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-09-28',
    createdAt: '2026-09-28T00:00:00Z',
  },
  {
    id: 'rev-5',
    clientName: 'Marcus D.',
    serviceTitle: 'Assignment Help',
    rating: 5,
    comment: 'Scored an A on my master-level finance and econometric models. Flawless citations and delivered ahead of schedule.',
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-09-20',
    createdAt: '2026-09-20T00:00:00Z',
  },
  {
    id: 'rev-6',
    clientName: 'Emily W.',
    serviceTitle: 'Dissertation Guidance',
    rating: 5,
    comment: 'The PhD mentor guided me through statistical hypothesis testing seamlessly. Highly recommended!',
    isVerified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-09-14',
    createdAt: '2026-09-14T00:00:00Z',
  },
];

export const FALLBACK_AVATARS = [
  '/images/faisal-alhad.png',
  '/images/kimberley-wood.png',
  '/images/sarah-alsaud.png',
];

export function resolveReviewAvatar(avatar: string | null | undefined, index: number): string {
  if (avatar && avatar.trim().length > 0) return avatar;
  return FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];
}

/**
 * Fetch service tree with ISR caching and graceful fallback
 */
export async function fetchServiceTree(): Promise<PublicService[]> {
  try {
    const data = await getPublicServiceTree({
      next: { revalidate: 60 },
    });
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

/**
 * Fetch featured reviews with ISR caching and graceful fallback
 */
export async function fetchFeaturedReviews(): Promise<PublicReview[]> {
  try {
    const res = await getPublicReviews(
      { isFeatured: true, limit: 6 },
      { next: { revalidate: 60 } },
    );
    if (Array.isArray(res)) {
      return res.length > 0 ? res : DEFAULT_REVIEWS;
    }
    if (res && typeof res === 'object') {
      const anyRes = res as unknown as Record<string, unknown>;
      if (Array.isArray(anyRes.data) && anyRes.data.length > 0) {
        return anyRes.data.map((item: Record<string, unknown>, idx: number) => ({
          id: String(item.id || `rev-${idx}`),
          clientName: String(item.reviewerName || item.studentName || item.clientName || 'Student'),
          serviceTitle: (item.service as { title?: string })?.title || (item.courseLabel as string) || (item.subject as string) || 'Academic Service',
          serviceSlug: (item.service as { slug?: string })?.slug || undefined,
          rating: Number(item.rating || 5),
          reviewDate: String(item.reviewDate || new Date().toISOString().split('T')[0]),
          comment: String(item.comment || ''),
          isVerified: Boolean(item.isVerified ?? true),
          isFeatured: Boolean(item.isFeatured ?? true),
          status: 'PUBLISHED',
          createdAt: String(item.createdAt || new Date().toISOString()),
        }));
      }
      if (Array.isArray(res.reviews) && res.reviews.length > 0) {
        return res.reviews;
      }
    }
    return DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}
