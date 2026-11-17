import {
  PublicService,
  PublicSubService,
  PublicReview,
  PublicFaqItem,
  getPublicServiceTree,
  getPublicServiceBySlug,
  getPublicSubService,
  getPublicReviews,
} from './public-api';

export const DEFAULT_FAQS: PublicFaqItem[] = [
  {
    question: '1. How do you guarantee plagiarism-free and AI-free assignments?',
    answer:
      'Each assignment is researched from scratch and written by human academic professionals. Before release, the document runs through our internal Turnitin non-repository license and advanced AI detection filters to ensure a 0% AI and < 5% raw plagiarism score. A complimentary digital verification report is included.',
  },
  {
    question: '2. Can I communicate directly with the assignment specialist assigned to me?',
    answer:
      'Yes. You can relay notes, lecture presentations, and revision prompts directly through your assigned student dashboard or coordinate via our 24/7 WhatsApp academic concierge desk.',
  },
  {
    question: '3. What referencing styles do you support (APA, Harvard, OSCOLA, IEEE, Chicago)?',
    answer:
      'Our Ph.D. scholars are certified in every major global formatting guideline: APA 7th edition, Harvard (including university-specific variants such as Coventry Harvard), OSCOLA for UK law, IEEE for computer science and engineering, Chicago, MLA 9, and Vancouver.',
  },
  {
    question: '4. What happens if my tutor requests amendments or revisions after submission?',
    answer:
      "We provide unlimited free revisions. Simply provide your professor's feedback sheet or rubric commentary, and your assigned writer will implement the changes within 12 to 24 hours at no extra charge.",
  },
  {
    question: '5. Can you handle urgent assignments with 6 to 12 hour deadlines?',
    answer:
      'Yes. Our rapid deployment team operates 24/7 across multiple time zones. We routinely deliver completed undergraduate papers, case analyses, and coding solutions in under 6 to 12 hours while maintaining strict academic quality.',
  },
  {
    question: '6. Is my student identity and university portal login kept confidential?',
    answer:
      'Confidentiality is total. We execute military-grade 256-bit encryption and strict internal NDAs. We never request identifying personal information beyond what is necessary to deliver your assignment, and data is permanently purged post-completion.',
  },
  {
    question: '7. Do you provide complete raw code files, datasets, and calculation worksheets?',
    answer:
      'Absolutely. If your assignment involves Excel spreadsheets, SPSS syntax, Python scripts, SQL queries, or MATLAB simulations, all raw editable files, clean dependencies, and step-by-step documentation are packaged with the final report.',
  },
  {
    question: '8. How do your university-specific assignment services work?',
    answer:
      "For institutions like Bournemouth, Coventry, UCLan, and Westminster, we maintain a dedicated bench of alumni and adjunct researchers who understand the university's distinct module descriptors, grading matrices, and reference styles.",
  },
];

export const DEFAULT_SERVICES: PublicService[] = [
  {
    id: 'srv-online-class',
    title: 'Online Class Help',
    slug: 'online-class-help',
    badgeLabel: 'Most Popular',
    heroBadge: 'Complete Semester & Course Management',
    heroTitle: 'Stress-Free Online Class Help For Top Grade Outcomes',
    heroSubtitle:
      'Keeping up with lectures, quizzes, and assignments can be overwhelming. We will take your online class, attend weekly modules, and manage your coursework with complete privacy.',
    shortDescription:
      'Keeping up with lectures, quizzes, and assignments can be overwhelming. We will take your online class and manage your coursework.',
    content:
      'ReadEssay provides comprehensive online class assistance for students across US, UK, Canadian, and Australian universities. Our PhD subject specialists attend lectures, participate in weekly discussion boards, complete timed assignments, and take proctored quizzes. Everything is managed under residential VPN IP protocols matching your university location to maintain 100% security and confidentiality.',
    status: 'PUBLISHED',
    features: [
      'Weekly Discussions & Forum Participation',
      'Timed Portal Quizzes & Homework Management',
      'Local Residential VPN Matching IP Address',
      'Grade A or B Academic Guarantee',
      'Continuous 24/7 WhatsApp Updates',
    ],
    faqs: DEFAULT_FAQS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      {
        id: 'sub-1',
        title: 'Take My Class',
        slug: 'take-my-class',
        heroBadge: 'Full Coursework Management',
        heroTitle: 'Take My Online Class For Me with Guaranteed A/B Grades',
        heroSubtitle:
          'Lengthy coursework and endless discussions can overwhelm busy schedules. ReadEssay is ready to share the entire term workload with total privacy.',
        shortDescription: 'Full semester management from orientation to final exam.',
        content:
          'Our expert mentors take over your weekly syllabus, manage learning portals like Canvas, Blackboard, and Brightspace, and submit all deliverables ahead of time.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-2',
        title: 'Course Assistance',
        slug: 'course-assistance',
        heroBadge: 'Weekly Module Guidance',
        heroTitle: 'Professional Course Assistance Tailored to Your Degree',
        heroSubtitle: 'Targeted weekly help for difficult modules, assignments, and problem sets.',
        shortDescription: 'Targeted assistance for difficult modules and discussion boards.',
        content:
          'Get 1-on-1 support for complex coursework modules. Whether you need assistance decoding syllabus instructions or drafting discussion board responses, we are here.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-3',
        title: 'Protected Exams',
        slug: 'protected-exams',
        heroBadge: 'Proctored Assessment Support',
        heroTitle: 'Protected Online Exam Assistance with Zero Trace',
        heroSubtitle: 'Secure assessment support under Honorlock, Proctorio, Respondus Lockdown, and ProctorU.',
        shortDescription: 'Secure assessment support under Proctorio and Honorlock.',
        content:
          'Overcome exam stress with seasoned doctoral test takers. We navigate complex camera, screen, and browser monitoring software with airtight privacy.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  {
    id: 'srv-exam-help',
    title: 'Exam Help',
    slug: 'exam-help',
    badgeLabel: 'Guaranteed Pass',
    heroBadge: 'Guaranteed Passing Grades on Timed Tests',
    heroTitle: 'Doctoral Online Exam Help with 100% Confidentiality',
    heroSubtitle:
      'Are online proctored exams too stressful? Deadlines intimidating? Find verified doctoral experts ready to take assessments with total privacy and guaranteed A/B scores.',
    shortDescription:
      'Are online proctored exams too stressful? Deadlines intimidating? Find verified doctoral experts ready to take assessments with total privacy.',
    content:
      'Online exams present immense pressure with strict timers and complex proctoring software. ReadEssay has established proven assessment methods across Honorlock, Proctorio, Respondus Lockdown Browser, ProctorU, and Examity. Our specialists are ready across all time zones to secure top results with complete peace of mind.',
    status: 'PUBLISHED',
    features: [
      'Honorlock, Proctorio & Respondus Compatibility',
      'Doctoral Test Specialists across STEM & Business',
      'Domestic City-Level Residential VPN Proxies',
      'Guaranteed A or B Grade or Full Refund',
      'Real-Time Live Chat & WhatsApp Coordination',
    ],
    faqs: DEFAULT_FAQS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      {
        id: 'sub-4',
        title: 'Protected Exam Help',
        slug: 'protected-exam-help',
        heroBadge: 'Proctored Test Solutions',
        heroTitle: 'Protected Exam Help for Proctored Tests',
        heroSubtitle: 'Flawless execution during webcam and screen-monitored university exams.',
        shortDescription: 'Flawless execution during webcam and screen-monitored exams.',
        content:
          'Our proctored exam assistance bypasses anxiety. Experienced academic specialists guide you seamlessly through timed midterm and final assessments.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-5',
        title: 'Quiz & Test Assistance',
        slug: 'quiz-test-assistance',
        heroBadge: 'Weekly Quiz Perfection',
        heroTitle: 'Weekly Quiz & Test Assistance For Perfect GPAs',
        heroSubtitle: 'Never miss an unannounced quiz or weekly review assessment again.',
        shortDescription: 'Weekly quizzes, midterms, and timed test assistance.',
        content:
          'Boost your semester GPA by ensuring every weekly quiz achieves maximum points. Our experts solve complex multiple-choice, numerical, and essay prompts rapidly.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-6',
        title: 'Proctored Tests',
        slug: 'proctored-tests',
        heroBadge: 'Certification & University Tests',
        heroTitle: 'Proctored Tests Solutions for College & Professional Exams',
        heroSubtitle: 'Complete confidentiality for GRE, GMAT, TEAS, and college assessments.',
        shortDescription: 'Specialized support for GRE, GMAT, and collegiate proctored tests.',
        content:
          'Achieve competitive percentiles on high-stakes standardized assessments and university entrance examinations.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  {
    id: 'srv-assignment-help',
    title: 'Assignment Help',
    slug: 'assignment-help',
    badgeLabel: 'PhD Experts',
    heroBadge: 'Professional Assignment Help Designed Around Your Academic Needs',
    heroTitle: 'Top-Rated Assignment Help For High Grades & Academic Peace of Mind',
    heroSubtitle:
      'Get expert assignment help across multiple subjects from experienced academic specialists. Receive quality support, meet deadlines, and work towards better grades with confidence.',
    shortDescription:
      'Rigorous analysis, research and citations. ReadEssay has writers trained across all disciplines ready for urgent guidelines.',
    content:
      'Does the conception of reasoning compound questions fear the blood of your nerves? This platform is particularly made to calm students’ fear and give them the best solution. The complexity can be tinctured from financial-cost-tax accounting, statistical modeling, computer science, and business management. Our experts are devoted and committed to your assigned work. We guarantee to meet the time limit assigned by the seeker with 100% original Turnitin-verified submissions.',
    status: 'PUBLISHED',
    features: [
      '100% Unique Content (Turnitin < 5%, 0% AI)',
      'Strong Attention to Deadlines (6-12 Hour Turnarounds)',
      '24/7 Support Handled with Professionalism',
      '100% Money Back Guarantee',
      'Revisions as per your Desires!',
    ],
    faqs: DEFAULT_FAQS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      {
        id: 'sub-10',
        title: 'Accounting Assignment Help',
        slug: 'assignment-accounting',
        heroBadge: 'Expert Accounting Assignment Support for Every Academic Level',
        heroTitle: 'Accounting Assignment Help to Achieve Better Grades with Confidence',
        heroSubtitle:
          'Get reliable accounting assignment help from experienced subject specialists. From financial accounting and auditing to taxation and cost accounting, receive expert guidance to tackle complex topics and meet your deadlines.',
        shortDescription:
          'Master balance sheets, financial reporting, taxation, and auditing with accurate balance-matching solutions.',
        content:
          'Does the conception of reasoning the compound questions of accounting fears the blood of your nerves and gives a sense of relaxation after the appropriate acknowledgment? This website is particularly made to calm students’ fear and give them the best solution. The complexity can be tinctured from financial-cost-tax accounting. Our experts are extremely devoted and committed to their assigned work.',
        status: 'PUBLISHED',
        features: [
          'Cost-System Accounting Task Help (volume-profit analysis, activity-based costing, flexible budgeting)',
          'Tax Accounting Problem-Solutions (corporate tax, income tax, property tax calculations)',
          'Finance Accounting Task Help (budgeting, balance sheets, machine costing, financial graphs)',
          'Forensic Complex Situations Task (corporate solvency, bankruptcy analysis, audit trails)',
          'Audit Aspect of Accounting Assistance (absorption vs. variable costing, internal & external audits)',
        ],
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-7',
        title: 'Statistics Assignment Help',
        slug: 'assignment-statistics',
        heroBadge: 'Quantitative Analysis & Modeling',
        heroTitle: 'Statistics Assignment Help with SPSS, R, Python & Excel',
        heroSubtitle:
          'Hypothesis testing, regression analysis, ANOVA, and econometric forecasting made easy by doctorate statisticians.',
        shortDescription:
          'Hypothesis testing, regression analysis, ANOVA, and econometric forecasting made easy.',
        content:
          'Tackle complex datasets and statistical models with ease. Our experts generate clean syntax, descriptive statistics, inferential tests, and comprehensive APA write-ups.',
        status: 'PUBLISHED',
        features: [
          'SPSS Syntax, R Scripts, Python, & STATA Deliverables',
          'Parametric & Non-Parametric Hypothesis Testing',
          'Multivariate Linear & Logistic Regressions',
          'Complete Raw Data Files and Output Tables Included',
        ],
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-8',
        title: 'Computer Science Help',
        slug: 'assignment-cs',
        heroBadge: 'Clean Architecture & Code Verification',
        heroTitle: 'Computer Science Assignment Help Across All Tech Stacks',
        heroSubtitle:
          'Data structures, algorithms, full-stack development, machine learning, and database management solutions.',
        shortDescription:
          'Data structures, algorithms, web development, and database management solutions.',
        content:
          'From Python, Java, and C++ to React, Node.js, and SQL, our software engineers provide production-grade code with thorough inline comments, documentation, and test suites.',
        status: 'PUBLISHED',
        features: [
          'Python, Java, C++, TypeScript, & Go Support',
          'Object-Oriented Design & Algorithm Complexity (Big-O)',
          'Relational Database Schemas & Normalization (1NF-BCNF)',
          'Clean README Documentation & Execution Instructions',
        ],
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-9',
        title: 'Business Management Help',
        slug: 'assignment-business',
        heroBadge: 'MBA & Executive Case Analysis',
        heroTitle: 'Business Management Assignment Help for MBA & Undergrads',
        heroSubtitle:
          'Strategic frameworks, SWOT, PESTLE, Porter’s Five Forces, and corporate governance papers.',
        shortDescription:
          'Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.',
        content:
          'Evaluate real-world enterprise scenarios with actionable strategic insights, peer-reviewed Harvard Business Review citations, and data-backed recommendations.',
        status: 'PUBLISHED',
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-11',
        title: 'Mathematics Assignment Help',
        slug: 'assignment-math',
        heroBadge: 'Step-by-Step Proofs & Calculations',
        heroTitle: 'Mathematics Assignment Help Across Calculus & Discrete Math',
        heroSubtitle:
          'Differential equations, linear algebra, vector calculus, and discrete mathematics solved step by step.',
        shortDescription:
          'Differential equations, linear algebra, vector calculus, and discrete mathematics.',
        content:
          'Receive detailed step-by-step mathematical derivations with LaTeX-formatted equations, clear geometric diagrams, and validated answers.',
        status: 'PUBLISHED',
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-12',
        title: 'Essay Writing Help',
        slug: 'assignment-essay',
        heroBadge: 'Original Academic Prose',
        heroTitle: 'Custom Essay Writing Help for All Academic Levels',
        heroSubtitle:
          'Argumentative, persuasive, analytical, and narrative essays crafted with flawless citations.',
        shortDescription:
          'Argumentative, analytical, narrative, and comparative essays crafted with academic rigor.',
        content:
          'Compelling thesis statements, coherent topic sentences, critical arguments, and rigorous academic synthesis in APA, MLA, Harvard, or Chicago styles.',
        status: 'PUBLISHED',
        faqs: DEFAULT_FAQS,
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  {
    id: 'srv-homework-help',
    title: 'Homework Help',
    slug: 'homework-help',
    badgeLabel: '24h Delivery',
    heroBadge: 'Rapid Problem Set Solutions',
    heroTitle: 'Reliable Homework Help Across STEM, Humanities & Business',
    heroSubtitle:
      'Fast turnaround, step-by-step problem sets across STEM, coding, engineering, economics, and finance with verified accuracy.',
    shortDescription:
      'Fast turnaround, step-by-step problem sets across STEM, coding, engineering, economics, and finance.',
    content:
      'Stuck on late-night problem sets or weekly homework worksheets? ReadEssay pairs you with subject mentors capable of returning solved worksheets in under 6 hours with step-by-step working so you understand every formula.',
    status: 'PUBLISHED',
    features: [
      'Ultra-Fast Turnarounds (6 Hours Available)',
      'Step-by-Step Working & Formula Derivations',
      'Affordable Student-Friendly Flat Rates',
      'Unlimited Clarifications with Assigned Writer',
    ],
    faqs: DEFAULT_FAQS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subServices: [
      {
        id: 'sub-13',
        title: 'Statistics Homework',
        slug: 'hw-statistics',
        heroBadge: 'Step-by-Step Probability & Stats',
        heroTitle: 'Statistics Homework Help with Clear Step-by-Step Math',
        heroSubtitle: 'Probability distributions, confidence intervals, and z-test/t-test worksheets.',
        shortDescription: 'Probability distributions, hypothesis tests, and data sets.',
        content: 'Clear calculations showing all intermediate working for statistical homework sets.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-14',
        title: 'Economics Homework',
        slug: 'hw-economics',
        heroBadge: 'Micro & Macro Problem Sets',
        heroTitle: 'Economics Homework Help for Supply/Demand & Game Theory',
        heroSubtitle: 'Consumer equilibrium, IS-LM models, game theory matrices, and fiscal policy analyses.',
        shortDescription: 'Supply & demand curves, monetary policy, and econometrics.',
        content: 'Precise graphical analysis and economic computations for weekly problem sets.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-15',
        title: 'College Homework',
        slug: 'hw-college',
        heroBadge: 'Multi-Discipline Support',
        heroTitle: 'College Homework Help Across All University Courses',
        heroSubtitle: 'From humanities and history to introductory sciences and literature.',
        shortDescription: 'General college coursework, weekly worksheets, and readings.',
        content: 'Reliable weekly homework assistance to keep your GPA consistently at Dean’s List level.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-16',
        title: 'CS & Coding Help',
        slug: 'hw-cs',
        heroBadge: 'Debugging & Coding Problem Sets',
        heroTitle: 'Computer Science Homework & Code Debugging Help',
        heroSubtitle: 'Solve programming bugs, write algorithms, and pass automated unit test graders.',
        shortDescription: 'Bug fixing, logic verification, and algorithm implementations.',
        content: 'Clean code snippets that compile smoothly without errors or warnings.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-17',
        title: 'Engineering Help',
        slug: 'hw-engineering',
        heroBadge: 'Mechanical, Civil & Electrical STEM',
        heroTitle: 'Engineering Homework Help for Mechanics, Circuits & CAD',
        heroSubtitle: 'Statics, dynamics, circuit analysis, thermodynamics, and fluid mechanics.',
        shortDescription: 'Mechanical, electrical, civil, and chemical engineering sets.',
        content: 'Accurate engineering calculations adhering to standard SI/Imperial units and safety codes.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 'sub-18',
        title: 'Finance Homework',
        slug: 'hw-finance',
        heroBadge: 'Valuation & Capital Budgeting',
        heroTitle: 'Finance Homework Help for NPV, IRR & Stock Valuation',
        heroSubtitle: 'Time value of money, bond amortization schedules, and risk-return models.',
        shortDescription: 'NPV calculations, bond yields, and portfolio theory.',
        content: 'Excel financial models and step-by-step financial calculator keystroke explanations.',
        status: 'PUBLISHED',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
];

export const DEFAULT_REVIEWS: PublicReview[] = [
  {
    id: 'rev-1',
    clientName: 'Natasha',
    serviceTitle: 'Online Course Service',
    serviceSlug: 'online-class-help',
    rating: 5,
    comment:
      'ReadEssay helped me with the most challenging course. Their experts took care of everything while I focused on my job.',
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
    serviceSlug: 'exam-help',
    rating: 5,
    comment:
      "Their exam help is a lifesaver. I didn't expect to ace the subject. But I did! Hats off to you!",
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
    serviceSlug: 'assignment-help',
    rating: 5,
    comment:
      'Their academic helpers are not only professional and reliable but also affordable. I was really scared at first, but now I recommend them to everyone.',
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
    serviceSlug: 'online-class-help',
    rating: 5,
    comment:
      "One of my friends referred me to ReadEssay for their online class services. I couldn't handle online classes with a full-time job, but now I love their services.",
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
    serviceSlug: 'assignment-help',
    rating: 5,
    comment:
      'Scored an A on my master-level finance and econometric models. Flawless citations and delivered ahead of schedule.',
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
    serviceSlug: 'assignment-help',
    rating: 5,
    comment:
      'The PhD mentor guided me through statistical hypothesis testing seamlessly. Highly recommended!',
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
 * Fetch a single top-level service by slug with ISR caching and graceful fallback
 */
export async function fetchServiceBySlug(slug: string): Promise<PublicService | null> {
  try {
    const service = await getPublicServiceBySlug(slug, {
      next: { revalidate: 60 },
    });
    if (service) {
      return service;
    }
  } catch {
    // ignore
  }

  // Fallback to default services
  const fallback = DEFAULT_SERVICES.find((s) => s.slug === slug);
  if (fallback) {
    return fallback;
  }

  return null;
}

/**
 * Fetch a sub-service by parent service slug and sub-service slug with ISR caching and graceful fallback
 */
export async function fetchSubService(
  serviceSlug: string,
  subServiceSlug: string,
): Promise<PublicSubService | null> {
  try {
    const subService = await getPublicSubService(serviceSlug, subServiceSlug, {
      next: { revalidate: 60 },
    });
    if (subService) {
      return subService;
    }
  } catch {
    // ignore
  }

  // Fallback lookup
  const parentService = DEFAULT_SERVICES.find((s) => s.slug === serviceSlug);
  if (parentService && parentService.subServices) {
    const sub = parentService.subServices.find((ss) => ss.slug === subServiceSlug);
    if (sub) {
      return {
        ...sub,
        service: {
          id: parentService.id,
          title: parentService.title,
          slug: parentService.slug,
        },
      };
    }
  }

  return null;
}

/**
 * Fetch featured reviews with ISR caching and graceful fallback
 */
export async function fetchFeaturedReviews(params?: {
  serviceSlug?: string;
  subServiceSlug?: string;
  limit?: number;
}): Promise<PublicReview[]> {
  try {
    const res = await getPublicReviews(
      {
        isFeatured: true,
        limit: params?.limit || 6,
        serviceSlug: params?.serviceSlug,
        subServiceSlug: params?.subServiceSlug,
      },
      { next: { revalidate: 60 } },
    );
    if (Array.isArray(res) && res.length > 0) {
      return res;
    }
    if (res && typeof res === 'object') {
      const anyRes = res as unknown as Record<string, unknown>;
      if (Array.isArray(anyRes.data) && anyRes.data.length > 0) {
        return anyRes.data.map((item: Record<string, unknown>, idx: number) => ({
          id: String(item.id || `rev-${idx}`),
          clientName: String(
            item.reviewerName || item.studentName || item.clientName || 'Student',
          ),
          serviceTitle:
            (item.service as { title?: string })?.title ||
            (item.courseLabel as string) ||
            (item.subject as string) ||
            'Academic Service',
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
      if (Array.isArray(anyRes.reviews) && anyRes.reviews.length > 0) {
        return anyRes.reviews as PublicReview[];
      }
    }
    return DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}
