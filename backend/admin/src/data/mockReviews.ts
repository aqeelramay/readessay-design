export type ReviewStatus = "active" | "draft" | "archived";

export interface ReviewSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalSlug?: string;
}

export interface StudentReview {
  id: string;
  studentName: string;
  rating: number; // 1 to 5
  verified: boolean;
  quoteHeadline: string;
  reviewBody: string;
  courseLabel: string;
  timeAgoLabel: string;
  avatarUrl: string;
  status: ReviewStatus;
  displayOrder: number;
  updatedAt: string;
  seo: ReviewSEO;
}

export const INITIAL_REVIEWS: StudentReview[] = [
  {
    id: "rev-1",
    studentName: "Isabel Pearson",
    rating: 5,
    verified: true,
    quoteHeadline: '"I literally have no words to show my gratitude."',
    reviewBody:
      "Having had a lot of errors in my business assignments, my teachers kept asking me to revise it whenever I asked for their feedback. Finally, a friend of mine connected me to Readessay assignment experts who guided me through the whole process and edited and returned my assignment in no time! My teachers even praised me for the work done… Thank you so much!!",
    courseLabel: "Course: Business Assignment",
    timeAgoLabel: "2 days ago",
    avatarUrl: "/images/female-expert1.jpg",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
    seo: {
      metaTitle:
        "Isabel Pearson Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Isabel Pearson\'s verified student review on ReadEssay: "I literally have no words to show my gratitude." High distinction outcome on business coursework.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-2",
    studentName: "Charlie Reynolds",
    rating: 5,
    verified: true,
    quoteHeadline: '"Great services"',
    reviewBody:
      "All writers at readessay.com are really helpful and they have a big team that can manage assignments in every field that my friends and I have asked them to write for, with the expertise of PhD holders. Customer support is instant and communicative.",
    courseLabel: "Course: Academic Research",
    timeAgoLabel: "4 days ago",
    avatarUrl: "/images/male-expert1.jpg",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-10",
    seo: {
      metaTitle:
        "Charlie Reynolds Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Charlie Reynolds\' verified student review on ReadEssay: "Great services." Rapid research paper assistance and communicative academic support.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-3",
    studentName: "Rosie Riley",
    rating: 5,
    verified: true,
    quoteHeadline: '"You got me the highest marks!"',
    reviewBody:
      "I just got my assignment back from my professor and I secured the highest marks in the class. If that's not brilliant, I don't know what is! You are my go-to assignment experts for all my coursework now! They even included complete bibliography citations.",
    courseLabel: "Course: University Coursework",
    timeAgoLabel: "1 week ago",
    avatarUrl: "/images/female-expert2.jpg",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-09",
    seo: {
      metaTitle:
        "Rosie Riley Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Rosie Riley\'s verified review on ReadEssay: "You got me the highest marks!" Complete bibliography citations and top marks on university coursework.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-4",
    studentName: "Sean Hayes",
    rating: 5,
    verified: true,
    quoteHeadline: '"5 star services"',
    reviewBody:
      "I used readessay's Business Assignment services for the first time. My dissertation was expected in a month and I would never have got it done on schedule if it weren't for Mr. Luke at readessay.com. He finished it within 3 weeks as promised!",
    courseLabel: "Course: Business Dissertation",
    timeAgoLabel: "1 week ago",
    avatarUrl: "/images/male-expert2.jpg",
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-08",
    seo: {
      metaTitle: "Sean Hayes Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Sean Hayes\' verified review on ReadEssay: "5 star services." Delivered a complex business dissertation 1 week ahead of deadline.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-5",
    studentName: "Reece Welch",
    rating: 5,
    verified: true,
    quoteHeadline: '"I’ve found my salvation"',
    reviewBody:
      "My teacher loves to give complicated assignments. I delegated this task to readessay experts. They solved majority of the questions without a single complaint and every single calculation step was thoroughly annotated.",
    courseLabel: "Course: Complex Problem Sets",
    timeAgoLabel: "2 weeks ago",
    avatarUrl: "/images/female-expert1.jpg",
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-06",
    seo: {
      metaTitle:
        "Reece Welch Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Reece Welch\'s verified review on ReadEssay: "I’ve found my salvation." Clear annotated calculation steps for complex quantitative problem sets.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-6",
    studentName: "Mayra J. Alexander",
    rating: 5,
    verified: true,
    quoteHeadline: '"Readessay Exam Experts are lifesavers"',
    reviewBody:
      "Stressed about my dissertation because another company returned low quality with plagiarism. Readessay salvaged my paper, fixed grammar and removed all plagiarism within a day. They saved my graduation semester.",
    courseLabel: "Course: Master's Dissertation",
    timeAgoLabel: "2 weeks ago",
    avatarUrl: "/images/female-expert2.jpg",
    status: "active",
    displayOrder: 6,
    updatedAt: "2026-11-05",
    seo: {
      metaTitle:
        "Mayra J. Alexander Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Mayra J. Alexander\'s verified review on ReadEssay: "Readessay Exam Experts are lifesavers." Plagiarism-removal and rapid thesis salvage within 24 hours.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-7",
    studentName: "Albert P. Smith",
    rating: 5,
    verified: true,
    quoteHeadline: '"Professional services with punctuality."',
    reviewBody:
      "Readessay is always there in my time of need. Whenever I'm stuck with heavy workload, I count on them to turn in my exam online with promising quality. Timed quiz went off without a hitch and got an A!",
    courseLabel: "Course: Online Exam Assistance",
    timeAgoLabel: "3 weeks ago",
    avatarUrl: "/images/male-expert1.jpg",
    status: "active",
    displayOrder: 7,
    updatedAt: "2026-11-03",
    seo: {
      metaTitle:
        "Albert P. Smith Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Albert P. Smith\'s verified review on ReadEssay: "Professional services with punctuality." Timed assessment guidance with top-grade outcomes.',
      canonicalSlug: "reviews",
    },
  },
  {
    id: "rev-8",
    studentName: "Charlie Hilton",
    rating: 5,
    verified: true,
    quoteHeadline: '"Best writing services I’ve come across."',
    reviewBody:
      "Finished assignments in super short time span. Passed through premium plagiarism checker with zero plagiarism. Astounded with their quality! The customer portal made tracking revisions simple.",
    courseLabel: "Course: Urgent Assignment",
    timeAgoLabel: "3 weeks ago",
    avatarUrl: "/images/male-expert2.jpg",
    status: "draft",
    displayOrder: 8,
    updatedAt: "2026-11-01",
    seo: {
      metaTitle:
        "Charlie Hilton Review — Verified Student Testimonial | ReadEssay",
      metaDescription:
        'Read Charlie Hilton\'s review on ReadEssay: "Best writing services I’ve come across." Rapid turnaround and zero-plagiarism originality.',
      canonicalSlug: "reviews",
    },
  },
];

/**
 * Helpers to query mock student reviews
 */
export function getReviewById(id: string): StudentReview | undefined {
  return INITIAL_REVIEWS.find((r) => r.id === id);
}

export function getAllReviews(): StudentReview[] {
  return INITIAL_REVIEWS;
}
