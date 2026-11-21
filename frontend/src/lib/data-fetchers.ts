import {
  PublicService,
  PublicSubService,
  PublicReview,
  PublicReviewsStats,
  PublicSampleSection,
  PublicAcademicSample,
  PublicFaqItem,
  PublicBlogCategory,
  PublicBlogPost,
  PublicBlogPostsResponse,
  PublicCalculatorResponse,
  PublicExpert,
  getPublicServiceTree,
  getPublicServiceBySlug,
  getPublicSubService,
  getPublicReviews,
  getPublicSamples,
  getPublicBlogCategories,
  getPublicBlogCategoryBySlug,
  getPublicBlogPosts,
  getPublicBlogPostBySlug,
  getPublicCalculator,
  getPublicExperts,
  getPublicExpertBySlug,
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

export const ASSIGNMENT_DISCIPLINES = [
  { slug: "assignment-accounting", title: "Accounting Assignment Help", icon: "account_balance_wallet", desc: "Master balance sheets, financial reporting, taxation, and auditing with accurate balance-matching solutions." },
  { slug: "assignment-business", title: "Business Assignment Help", icon: "business_center", desc: "Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports." },
  { slug: "assignment-corporate-finance", title: "Corporate Finance Assignment Help", icon: "trending_up", desc: "Advanced capital budgeting, DCF valuation models, M&A cases, and WACC calculations." },
  { slug: "assignment-cs", title: "CS Assignment Help", icon: "terminal", desc: "Clean and tested Python, Java, C++, SQL scripts, database ERDs, and algorithm documentation." },
  { slug: "assignment-finance", title: "Finance Assignment Help", icon: "pie_chart", desc: "Portfolio management, risk hedging, asset pricing, and financial statement ratio analysis." },
  { slug: "assignment-history", title: "History Assignment Help", icon: "history_edu", desc: "Primary source critiques, historiographical reviews, archival citations, and chronological thesis papers." },
  { slug: "assignment-hr", title: "Human Resource Assignment Help", icon: "groups", desc: "Talent acquisition models, workplace dispute resolution, OSHA policies, and HR strategy briefs." },
  { slug: "assignment-humanities", title: "Humanities Assignment Help", icon: "auto_stories", desc: "Deep textual synthesis, cultural critiques, ethics frameworks, and philosophy term essays." },
  { slug: "assignment-management", title: "Management Assignment Help", icon: "manage_accounts", desc: "Organizational leadership frameworks, SWOT/PESTLE reviews, and supply chain logistics papers." },
  { slug: "assignment-marketing", title: "Marketing Assignment Help", icon: "campaign", desc: "Omnichannel consumer persona studies, brand positioning roadmaps, and digital marketing pitches." },
  { slug: "assignment-math", title: "Mathematics Assignment Help", icon: "functions", desc: "Step-by-step calculus derivations, linear algebra, discrete math, and differential proofs." },
  { slug: "assignment-online", title: "Online Assignment Help", icon: "devices", desc: "Full-term online coursework monitoring, weekly portal submissions, and quick turnaround tasks." },
  { slug: "assignment-btec-hnd", title: "BTEC HND Business Assignment Help", icon: "workspace_premium", desc: "Unit-aligned Pass/Merit/Distinction criteria solutions with full referencing and rubrics." },
  { slug: "assignment-science", title: "Science Assignment", icon: "science", desc: "Biology lab reports, chemistry synthesis write-ups, physics simulations, and scientific papers." },
  { slug: "assignment-statistics", title: "Statistics Assignment Help", icon: "insights", desc: "Rigorous SPSS, R, Stata, and Python data pipelines, ANOVA tests, and APA summary charts." },
  { slug: "assignment-bournemouth", title: "Bournemouth University Assignment Help", icon: "school", desc: "Bespoke coursework crafted strictly according to BU assessment briefs and grading rubrics." },
  { slug: "assignment-business-strategy", title: "Business Strategy Assignment Help", icon: "schema", desc: "Porter's Five Forces, Blue Ocean frameworks, and corporate turnaround strategy roadmaps." },
  { slug: "assignment-coventry", title: "Coventry University Assignment Help", icon: "account_balance", desc: "Tailored module coursework crafted to meet Coventry academic criteria and CU Harvard citation styles." },
  { slug: "assignment-management-operations", title: "Management and Operations Assignment", icon: "precision_manufacturing", desc: "Lean Six Sigma workflows, inventory modeling, bottleneck mitigation, and operations planning." },
  { slug: "assignment-uk-law", title: "UK Business Law Assignment Help", icon: "gavel", desc: "Comprehensive IRAC legal analysis covering English contract law, company law, and tort liability." },
  { slug: "assignment-ucb", title: "University College Birmingham Assignment Help", icon: "hotel_class", desc: "Coursework customized to UCB vocational, business, and hospitality module requirements." },
  { slug: "assignment-uclan", title: "University of Central Lancashire Assignment Help", icon: "local_library", desc: "UCLan-specific module assignments adhering strictly to department learning outcomes." },
  { slug: "assignment-uea", title: "University of East Anglia Assignment Help", icon: "history", desc: "Research-backed assignments formatted in exact UEA citation protocols and assessment matrices." },
  { slug: "assignment-westminster", title: "University of Westminster Assignment Help", icon: "apartment", desc: "High-scoring Westminster coursework solutions across London business and tech modules." },
  { slug: "assignment-international-marketing", title: "International Marketing Assignment Help", icon: "public", desc: "Cross-cultural consumer behavior studies, global entry strategies, and foreign market analysis." },
  { slug: "assignment-research-project", title: "Research Project Help", icon: "query_stats", desc: "Literature reviews, empirical methodology design, statistical validation, and final dissertation writeups." },
];

export const DEFAULT_SERVICES: PublicService[] = [
  {
    id: 'srv-online-class',
    title: 'Online Class Help',
    slug: 'online-class-help',
    icon: 'school',
    displayOrder: 1,
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
        icon: 'school',
        displayOrder: 1,
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
        icon: 'laptop_chromebook',
        displayOrder: 2,
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
        icon: 'verified_user',
        displayOrder: 3,
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
    icon: 'quiz',
    displayOrder: 2,
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
        icon: 'lock_open',
        displayOrder: 1,
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
        icon: 'quiz',
        displayOrder: 2,
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
        icon: 'timer',
        displayOrder: 3,
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
    icon: 'edit_document',
    displayOrder: 3,
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
            "id": "sub-assignment-accounting",
            "title": "Accounting Assignment Help",
            "slug": "assignment-accounting",
            "icon": "account_balance_wallet",
            "displayOrder": 1,
            "heroBadge": "Expert Accounting Assignment Support for Every Academic Level",
            "heroTitle": "Accounting Assignment Help to Achieve Better Grades with Confidence",
            "heroSubtitle": "Get reliable accounting assignment help from experienced subject specialists. From financial accounting and auditing to taxation and cost accounting, receive expert guidance to tackle complex topics and meet your deadlines.",
            "shortDescription": "Master balance sheets, financial reporting, taxation, and auditing with accurate balance-matching solutions.",
            "content": "Does the conception of reasoning the compound questions of accounting fears the blood of your nerves and gives a sense of relaxation after the appropriate acknowledgment? Is the extreme terror of complex equations permitting you to get in an authorized website expert seekers that can help you with a great response just a way ahead? This website is particularly made to calm students’ fear and give them the best solution. You can have easy access to the website just a click ahead. The complexity can be tinctured from financial-cost-tax accounting. Our experts are extremely devoted and committed to their assigned work. Just click the order button on the website mentioned below, provides us with your basic details, and holds responsible for grading you up on your mark sheet. Keep the continuity of evaluating the entire article worth and know-how we work by putting our experts best, grading you up by meeting the given deadlines.",
            "status": "PUBLISHED",
            "features": [
                  "100% Authentic Mode of Payment",
                  "Customized Accounting Task as Sample for Free",
                  "No Copied Material: 99.9% Plagiarism-Free",
                  "Fastest and Immediate Delivery of Mail",
                  "Excel Spreadsheets with Active Dynamic Formulas"
            ],
            "processSteps": [
                  {
                        "stepNumber": 1,
                        "title": "Upload Requirements & Rubrics",
                        "description": "Submit your accounting problem set, trial balance data, or corporate case study with required GAAP/IFRS standards."
                  },
                  {
                        "stepNumber": 2,
                        "title": "Doctoral CPA Matching",
                        "description": "We allocate a certified accountant or university lecturer experienced in your specific accounting branch."
                  },
                  {
                        "stepNumber": 3,
                        "title": "Dynamic Excel & Narrative Solutions",
                        "description": "Specialists build balanced worksheets, formula derivations, ledger accounts, and explanatory write-ups."
                  },
                  {
                        "stepNumber": 4,
                        "title": "Dual-Audit Quality Verification",
                        "description": "A senior reviewer verifies balance sheet reconciliation and Turnitin originality before on-time delivery."
                  }
            ],
            "faqs": [
                  {
                        "question": "1. Can your accounting experts solve assignments in Microsoft Excel with working formulas?",
                        "answer": "Yes, absolutely. Most university accounting modules require dynamic Excel spreadsheets showing formulas for depreciation, NPV, CVP analysis, or ledger summations. We provide clean, fully documented Excel files along with narrative Word reports."
                  },
                  {
                        "question": "2. Do you follow US GAAP or International IFRS standards?",
                        "answer": "We follow whichever standard is mandated by your institution. When ordering, simply specify whether your course is grounded in US GAAP, IFRS, UK FRS 102, or Australian AASB standards, and our regional specialists will formulate the balance sheets accordingly."
                  },
                  {
                        "question": "3. What if my balance sheet or trial balance does not balance?",
                        "answer": "Every accounting paper undergoes a dual-audit verification process by a senior reviewer before delivery. In the rare event of any discrepancy, we provide unlimited free revisions until your working papers are 100% accurate and aligned."
                  },
                  {
                        "question": "4. How fast can I receive an urgent accounting assignment?",
                        "answer": "Our express turnaround team handles emergency requests in as little as 6 to 12 hours. We have accounting specialists active 24/7 across multiple global time zones ready to begin immediately upon order placement."
                  }
            ],
            "seoTitle": "Accounting Assignment Help | ReadEssay",
            "seoDescription": "Step-by-step university accounting problem sets, ledger reconciliations, and financial statements.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-business",
            "title": "Business Assignment Help",
            "slug": "assignment-business",
            "icon": "business_center",
            "displayOrder": 2,
            "heroBadge": "MBA & Executive Case Analysis",
            "heroTitle": "Business Assignment Help for MBA & Undergrads",
            "heroSubtitle": "Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.",
            "shortDescription": "Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.",
            "content": "Evaluate real-world enterprise scenarios with actionable strategic insights, peer-reviewed Harvard Business Review citations, and data-backed recommendations.",
            "status": "PUBLISHED",
            "seoTitle": "Business Assignment Help | ReadEssay",
            "seoDescription": "Executive case analysis, strategic frameworks, and marketing plans authored by MBA and PhD scholars.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-corporate-finance",
            "title": "Corporate Finance Assignment Help",
            "slug": "assignment-corporate-finance",
            "icon": "trending_up",
            "displayOrder": 3,
            "heroBadge": "Capital Budgeting & Valuation",
            "heroTitle": "Corporate Finance Assignment Help & Valuation Models",
            "heroSubtitle": "Advanced capital budgeting, DCF valuation models, M&A cases, and WACC calculations.",
            "shortDescription": "Advanced capital budgeting, DCF valuation models, M&A cases, and WACC calculations.",
            "content": "Complex corporate valuation models, discounted cash flow (DCF) projections, merger & acquisition case briefs, and capital structure optimizations.",
            "status": "PUBLISHED",
            "seoTitle": "Corporate Finance Assignment Help | ReadEssay",
            "seoDescription": "Advanced corporate finance modeling, WACC derivations, and M&A valuation case studies.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-cs",
            "title": "CS Assignment Help",
            "slug": "assignment-cs",
            "icon": "terminal",
            "displayOrder": 4,
            "heroBadge": "Clean Architecture & Code Verification",
            "heroTitle": "Computer Science Assignment Help Across All Tech Stacks",
            "heroSubtitle": "Clean and tested Python, Java, C++, SQL scripts, database ERDs, and algorithm documentation.",
            "shortDescription": "Clean and tested Python, Java, C++, SQL scripts, database ERDs, and algorithm documentation.",
            "content": "From Python, Java, and C++ to React, Node.js, and SQL, our software engineers provide production-grade code with thorough inline comments, documentation, and test suites.",
            "status": "PUBLISHED",
            "seoTitle": "Computer Science Assignment Help | ReadEssay",
            "seoDescription": "Python, Java, C++, and web development assignment assistance with documented code and unit tests.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-finance",
            "title": "Finance Assignment Help",
            "slug": "assignment-finance",
            "icon": "pie_chart",
            "displayOrder": 5,
            "heroBadge": "Portfolio Management & Asset Pricing",
            "heroTitle": "Finance Assignment Help for Investment & Risk Analysis",
            "heroSubtitle": "Portfolio management, risk hedging, asset pricing, and financial statement ratio analysis.",
            "shortDescription": "Portfolio management, risk hedging, asset pricing, and financial statement ratio analysis.",
            "content": "In-depth portfolio management analysis, modern portfolio theory (MPT), CAPM regressions, derivatives hedging strategies, and financial ratio analytics.",
            "status": "PUBLISHED",
            "seoTitle": "Finance Assignment Help | ReadEssay",
            "seoDescription": "Financial statement ratio analysis, asset pricing models, and investment portfolio coursework.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-history",
            "title": "History Assignment Help",
            "slug": "assignment-history",
            "icon": "history_edu",
            "displayOrder": 6,
            "heroBadge": "Historiography & Archival Research",
            "heroTitle": "History Assignment Help Across Modern, Medieval & Ancient Eras",
            "heroSubtitle": "Primary source critiques, historiographical reviews, archival citations, and chronological thesis papers.",
            "shortDescription": "Primary source critiques, historiographical reviews, archival citations, and chronological thesis papers.",
            "content": "Comprehensive historical investigations with rigorous primary source evaluations, Chicago/Turabian footnotes, historiographical debates, and chronological thesis development.",
            "status": "PUBLISHED",
            "seoTitle": "History Assignment Help | ReadEssay",
            "seoDescription": "Primary source critiques, archival reviews, and historical research papers formatted in Chicago/Turabian.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-hr",
            "title": "Human Resource Assignment Help",
            "slug": "assignment-hr",
            "icon": "groups",
            "displayOrder": 7,
            "heroBadge": "Strategic Human Capital Management",
            "heroTitle": "HR Assignment Help for Strategic Talent & Organizational Policy",
            "heroSubtitle": "Talent acquisition models, workplace dispute resolution, OSHA policies, and HR strategy briefs.",
            "shortDescription": "Talent acquisition models, workplace dispute resolution, OSHA policies, and HR strategy briefs.",
            "content": "Critical appraisals of talent retention models, employee relations law, DEI initiatives, organizational culture transformations, and performance management frameworks.",
            "status": "PUBLISHED",
            "seoTitle": "Human Resource Assignment Help | ReadEssay",
            "seoDescription": "Strategic HR case studies, talent management frameworks, and workforce policy papers.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-humanities",
            "title": "Humanities Assignment Help",
            "slug": "assignment-humanities",
            "icon": "auto_stories",
            "displayOrder": 8,
            "heroBadge": "Critical Theory & Cultural Inquiry",
            "heroTitle": "Humanities Assignment Help Across Philosophy, Literature & Arts",
            "heroSubtitle": "Deep textual synthesis, cultural critiques, ethics frameworks, and philosophy term essays.",
            "shortDescription": "Deep textual synthesis, cultural critiques, ethics frameworks, and philosophy term essays.",
            "content": "Scholarly exploration of philosophical movements, political doctrines, cultural anthropology, and world literature formatted with nuanced argumentative prose.",
            "status": "PUBLISHED",
            "seoTitle": "Humanities Assignment Help | ReadEssay",
            "seoDescription": "Scholarly humanities research, literature syntheses, and philosophical argumentation written to academic rubrics.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-management",
            "title": "Management Assignment Help",
            "slug": "assignment-management",
            "icon": "manage_accounts",
            "displayOrder": 9,
            "heroBadge": "Executive Leadership & Strategy",
            "heroTitle": "Management Assignment Help for Organizational Leadership",
            "heroSubtitle": "Organizational leadership frameworks, SWOT/PESTLE reviews, and supply chain logistics papers.",
            "shortDescription": "Organizational leadership frameworks, SWOT/PESTLE reviews, and supply chain logistics papers.",
            "content": "Actionable management case solutions applying Kotter’s change models, Mintzberg managerial roles, stakeholder matrices, and corporate strategy frameworks.",
            "status": "PUBLISHED",
            "seoTitle": "Management Assignment Help | ReadEssay",
            "seoDescription": "Executive leadership models, organizational behavior case studies, and corporate strategy papers.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-marketing",
            "title": "Marketing Assignment Help",
            "slug": "assignment-marketing",
            "icon": "campaign",
            "displayOrder": 10,
            "heroBadge": "Digital Strategy & Brand Positioning",
            "heroTitle": "Marketing Assignment Help for Brand Growth & Consumer Analytics",
            "heroSubtitle": "Omnichannel consumer persona studies, brand positioning roadmaps, and digital marketing pitches.",
            "shortDescription": "Omnichannel consumer persona studies, brand positioning roadmaps, and digital marketing pitches.",
            "content": "Data-driven marketing reports integrating STP segmentation, digital inbound funnel blueprints, customer journey mapping, and ROI attribution modeling.",
            "status": "PUBLISHED",
            "seoTitle": "Marketing Assignment Help | ReadEssay",
            "seoDescription": "Digital marketing strategies, consumer behavior analyses, and brand positioning plans.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-math",
            "title": "Mathematics Assignment Help",
            "slug": "assignment-math",
            "icon": "functions",
            "displayOrder": 11,
            "heroBadge": "Step-by-Step Proofs & Calculations",
            "heroTitle": "Mathematics Assignment Help Across Calculus & Discrete Math",
            "heroSubtitle": "Step-by-step calculus derivations, linear algebra, discrete math, and differential proofs.",
            "shortDescription": "Step-by-step calculus derivations, linear algebra, discrete math, and differential proofs.",
            "content": "Receive detailed step-by-step mathematical derivations with LaTeX-formatted equations, clear geometric diagrams, and validated numerical answers.",
            "status": "PUBLISHED",
            "seoTitle": "Mathematics Assignment Help | ReadEssay",
            "seoDescription": "Detailed mathematical derivations, calculus problem sets, and linear algebra proofs solved step by step.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-online",
            "title": "Online Assignment Help",
            "slug": "assignment-online",
            "icon": "devices",
            "displayOrder": 12,
            "heroBadge": "24/7 Digital Portal Support",
            "heroTitle": "Online Assignment Help for Urgent Deadlines & Coursework",
            "heroSubtitle": "Full-term online coursework monitoring, weekly portal submissions, and quick turnaround tasks.",
            "shortDescription": "Full-term online coursework monitoring, weekly portal submissions, and quick turnaround tasks.",
            "content": "End-to-end coursework support across Canvas, Blackboard, Brightspace, and Moodle with verified residential VPN safety and rapid submission cycles.",
            "status": "PUBLISHED",
            "seoTitle": "Online Assignment Help | ReadEssay",
            "seoDescription": "24/7 online assignment writing and portal submission management across all academic disciplines.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-btec-hnd",
            "title": "BTEC HND Business Assignment Help",
            "slug": "assignment-btec-hnd",
            "icon": "workspace_premium",
            "displayOrder": 13,
            "heroBadge": "Pearson BTEC Level 4 & 5 Verification",
            "heroTitle": "BTEC HND Business Assignment Help with Guaranteed Merit & Distinction",
            "heroSubtitle": "Unit-aligned Pass/Merit/Distinction criteria solutions with full referencing and rubrics.",
            "shortDescription": "Unit-aligned Pass/Merit/Distinction criteria solutions with full referencing and rubrics.",
            "content": "Structured specifically to Pearson BTEC specifications, fulfilling all P, M, and D learning outcomes with Harvard citations and corporate evidence backing.",
            "status": "PUBLISHED",
            "seoTitle": "BTEC HND Business Assignment Help | ReadEssay",
            "seoDescription": "Pearson BTEC Level 4/5 Business coursework with guaranteed Pass, Merit, and Distinction criteria fulfillment.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-science",
            "title": "Science Assignment",
            "slug": "assignment-science",
            "icon": "science",
            "displayOrder": 14,
            "heroBadge": "Empirical Laboratory & Field Sciences",
            "heroTitle": "Science Assignment Help Across Biology, Chemistry & Physics",
            "heroSubtitle": "Biology lab reports, chemistry synthesis write-ups, physics simulations, and scientific papers.",
            "shortDescription": "Biology lab reports, chemistry synthesis write-ups, physics simulations, and scientific papers.",
            "content": "Tackle laboratory experiments, biological data interpretation, organic chemistry synthesis pathways, and classical/quantum physics problem sets with verified accuracy.",
            "status": "PUBLISHED",
            "seoTitle": "Science Assignment Help | ReadEssay",
            "seoDescription": "University biology, chemistry, and physics assignment help with detailed lab reports and scientific calculations.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-statistics",
            "title": "Statistics Assignment Help",
            "slug": "assignment-statistics",
            "icon": "insights",
            "displayOrder": 15,
            "heroBadge": "Quantitative Data Analysis & SPSS",
            "heroTitle": "Statistics Assignment Help with SPSS, R, Python & Stata",
            "heroSubtitle": "Rigorous SPSS, R, Stata, and Python data pipelines, ANOVA tests, and APA summary charts.",
            "shortDescription": "Rigorous SPSS, R, Stata, and Python data pipelines, ANOVA tests, and APA summary charts.",
            "content": "Tackle complex datasets and statistical models with ease. Our experts generate clean syntax, descriptive statistics, inferential tests, and comprehensive APA write-ups.",
            "status": "PUBLISHED",
            "seoTitle": "Statistics Assignment Help | ReadEssay",
            "seoDescription": "SPSS, R, Python, and Stata statistical data analysis and econometric homework solutions.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-bournemouth",
            "title": "Bournemouth University Assignment Help",
            "slug": "assignment-bournemouth",
            "icon": "school",
            "displayOrder": 16,
            "heroBadge": "UK University Bespoke Guidance",
            "heroTitle": "Bournemouth University Coursework & Dissertation Assistance",
            "heroSubtitle": "Bespoke coursework crafted strictly according to BU assessment briefs and grading rubrics.",
            "shortDescription": "Bespoke coursework crafted strictly according to BU assessment briefs and grading rubrics.",
            "content": "Specialized support calibrated to Bournemouth University faculty guidelines, BU Harvard referencing rules, and unit-specific marking criteria.",
            "status": "PUBLISHED",
            "seoTitle": "Bournemouth University Assignment Help | ReadEssay",
            "seoDescription": "Tailored academic support for Bournemouth University undergraduates and postgraduates across all faculties.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-business-strategy",
            "title": "Business Strategy Assignment Help",
            "slug": "assignment-business-strategy",
            "icon": "schema",
            "displayOrder": 17,
            "heroBadge": "Competitive Advantage & Corporate Direction",
            "heroTitle": "Business Strategy Assignment Help for Enterprise Case Studies",
            "heroSubtitle": "Porter's Five Forces, Blue Ocean frameworks, and corporate turnaround strategy roadmaps.",
            "shortDescription": "Porter's Five Forces, Blue Ocean frameworks, and corporate turnaround strategy roadmaps.",
            "content": "Advanced strategic planning briefs analyzing resource-based views (RBV), VRIO matrices, blue ocean innovation, and transnational enterprise governance.",
            "status": "PUBLISHED",
            "seoTitle": "Business Strategy Assignment Help | ReadEssay",
            "seoDescription": "Strategic management, corporate turnaround roadmaps, and competitive advantage case studies.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-coventry",
            "title": "Coventry University Assignment Help",
            "slug": "assignment-coventry",
            "icon": "account_balance",
            "displayOrder": 18,
            "heroBadge": "CU Modular Framework Alignment",
            "heroTitle": "Coventry University Coursework Help & CU Harvard Citation Standards",
            "heroSubtitle": "Tailored module coursework crafted to meet Coventry academic criteria and CU Harvard citation styles.",
            "shortDescription": "Tailored module coursework crafted to meet Coventry academic criteria and CU Harvard citation styles.",
            "content": "Dedicated academic guidance tailored to Coventry University modular briefs, incorporating strict CU Harvard referencing and faculty assessment rubrics.",
            "status": "PUBLISHED",
            "seoTitle": "Coventry University Assignment Help | ReadEssay",
            "seoDescription": "Custom assignment assistance formatted to Coventry University curriculum and grading standards.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-management-operations",
            "title": "Management and Operations Assignment",
            "slug": "assignment-management-operations",
            "icon": "precision_manufacturing",
            "displayOrder": 19,
            "heroBadge": "Supply Chain & Process Optimization",
            "heroTitle": "Management & Operations Coursework with Lean Six Sigma Workflows",
            "heroSubtitle": "Lean Six Sigma workflows, inventory modeling, bottleneck mitigation, and operations planning.",
            "shortDescription": "Lean Six Sigma workflows, inventory modeling, bottleneck mitigation, and operations planning.",
            "content": "Comprehensive operations management papers covering EOQ inventory formulas, Theory of Constraints (TOC), value stream mapping, and total quality management (TQM).",
            "status": "PUBLISHED",
            "seoTitle": "Operations Management Assignment Help | ReadEssay",
            "seoDescription": "Lean Six Sigma, supply chain logistics, and process operations management assignments.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-uk-law",
            "title": "UK Business Law Assignment Help",
            "slug": "assignment-uk-law",
            "icon": "gavel",
            "displayOrder": 20,
            "heroBadge": "English Common Law & IRAC Mastery",
            "heroTitle": "UK Business Law Assignment Help with OSCOLA Referencing",
            "heroSubtitle": "Comprehensive IRAC legal analysis covering English contract law, company law, and tort liability.",
            "shortDescription": "Comprehensive IRAC legal analysis covering English contract law, company law, and tort liability.",
            "content": "Flawless legal argumentation structured around Issue, Rule, Application, and Conclusion (IRAC) covering Companies Act 2006, Consumer Rights Act, and precedent case law.",
            "status": "PUBLISHED",
            "seoTitle": "UK Business Law Assignment Help | ReadEssay",
            "seoDescription": "IRAC legal problem questions, English commercial law, and OSCOLA formatted jurisprudence essays.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-ucb",
            "title": "University College Birmingham Assignment Help",
            "slug": "assignment-ucb",
            "icon": "hotel_class",
            "displayOrder": 21,
            "heroBadge": "UCB Curriculum & Rubric Compliance",
            "heroTitle": "University College Birmingham Coursework & Vocational Mentoring",
            "heroSubtitle": "Coursework customized to UCB vocational, business, and hospitality module requirements.",
            "shortDescription": "Coursework customized to UCB vocational, business, and hospitality module requirements.",
            "content": "Expert assistance formatted to University College Birmingham assignment templates, supporting culinary, business, tourism, and education modules.",
            "status": "PUBLISHED",
            "seoTitle": "University College Birmingham Assignment Help | ReadEssay",
            "seoDescription": "Specialized academic support for UCB students aligned to university rubrics and learning outcomes.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-uclan",
            "title": "University of Central Lancashire Assignment Help",
            "slug": "assignment-uclan",
            "icon": "local_library",
            "displayOrder": 22,
            "heroBadge": "UCLan Faculty Standards Alignment",
            "heroTitle": "UCLan Assignment Help Across Business, Health & STEM",
            "heroSubtitle": "UCLan-specific module assignments adhering strictly to department learning outcomes.",
            "shortDescription": "UCLan-specific module assignments adhering strictly to department learning outcomes.",
            "content": "Coursework designed around University of Central Lancashire department expectations, featuring comprehensive source reviews and proper APA/Harvard citations.",
            "status": "PUBLISHED",
            "seoTitle": "UCLan Assignment Help | ReadEssay",
            "seoDescription": "Custom coursework and dissertation guidance tailored to University of Central Lancashire requirements.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-uea",
            "title": "University of East Anglia Assignment Help",
            "slug": "assignment-uea",
            "icon": "history",
            "displayOrder": 23,
            "heroBadge": "UEA Research & Grading Protocol",
            "heroTitle": "University of East Anglia Coursework & Essay Writing Support",
            "heroSubtitle": "Research-backed assignments formatted in exact UEA citation protocols and assessment matrices.",
            "shortDescription": "Research-backed assignments formatted in exact UEA citation protocols and assessment matrices.",
            "content": "High-caliber academic papers written in accordance with University of East Anglia school guidelines, ensuring in-depth literature synthesis and critical analysis.",
            "status": "PUBLISHED",
            "seoTitle": "University of East Anglia Assignment Help | ReadEssay",
            "seoDescription": "Tailored academic research and essay assistance for University of East Anglia degree modules.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-westminster",
            "title": "University of Westminster Assignment Help",
            "slug": "assignment-westminster",
            "icon": "apartment",
            "displayOrder": 24,
            "heroBadge": "London Collegiate Marking Matrices",
            "heroTitle": "University of Westminster Assignment Help Across Tech & Business",
            "heroSubtitle": "High-scoring Westminster coursework solutions across London business and tech modules.",
            "shortDescription": "High-scoring Westminster coursework solutions across London business and tech modules.",
            "content": "Expert guidance covering University of Westminster undergraduate and master’s modules, formatted strictly to Westminster guidelines and Harvard referencing.",
            "status": "PUBLISHED",
            "seoTitle": "University of Westminster Assignment Help | ReadEssay",
            "seoDescription": "Custom academic support for Westminster students with guaranteed first-class research quality.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-international-marketing",
            "title": "International Marketing Assignment Help",
            "slug": "assignment-international-marketing",
            "icon": "public",
            "displayOrder": 25,
            "heroBadge": "Global Market Entry & Cross-Cultural Strategy",
            "heroTitle": "International Marketing Coursework & Global Campaign Design",
            "heroSubtitle": "Cross-cultural consumer behavior studies, global entry strategies, and foreign market analysis.",
            "shortDescription": "Cross-cultural consumer behavior studies, global entry strategies, and foreign market analysis.",
            "content": "In-depth global market assessments covering CAGE distance frameworks, Hofstede cultural dimensions, multinational product adaptation, and international marketing mix plans.",
            "status": "PUBLISHED",
            "seoTitle": "International Marketing Assignment Help | ReadEssay",
            "seoDescription": "Global market entry strategies, cross-cultural consumer analysis, and international marketing briefs.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-assignment-research-project",
            "title": "Research Project Help",
            "slug": "assignment-research-project",
            "icon": "query_stats",
            "displayOrder": 26,
            "heroBadge": "Doctoral Dissertation & Empirical Thesis",
            "heroTitle": "Academic Research Project Help for Dissertations & Capstone Projects",
            "heroSubtitle": "Literature reviews, empirical methodology design, statistical validation, and final dissertation writeups.",
            "shortDescription": "Literature reviews, empirical methodology design, statistical validation, and final dissertation writeups.",
            "content": "Full capstone and dissertation guidance from proposal drafting and ethics clearance through quantitative/qualitative methodology to findings, discussion, and recommendations.",
            "status": "PUBLISHED",
            "seoTitle": "Research Project Help & Dissertations | ReadEssay",
            "seoDescription": "Comprehensive thesis guidance, literature reviews, and empirical methodology support by PhD scholars.",
            "createdAt": "",
            "updatedAt": ""
      }
],
  },
  {
    id: 'srv-homework-help',
    title: 'Homework Help',
    slug: 'homework-help',
    icon: 'auto_stories',
    displayOrder: 4,
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
            "id": "sub-hw-statistics",
            "title": "Statistics",
            "slug": "hw-statistics",
            "icon": "bar_chart",
            "displayOrder": 1,
            "heroBadge": "Step-by-Step Probability & Stats",
            "heroTitle": "Statistics Homework Help with Clear Step-by-Step Math",
            "heroSubtitle": "Probability distributions, hypothesis tests, ANOVA, and data sets with step-by-step mathematical working.",
            "shortDescription": "Probability distributions, hypothesis tests, ANOVA, and data sets with step-by-step mathematical working.",
            "content": "Clear calculations showing all intermediate working for statistical homework sets, normal distribution curves, and hypothesis testing.",
            "status": "PUBLISHED",
            "seoTitle": "Statistics Homework Help | ReadEssay",
            "seoDescription": "Fast statistics homework solutions with full formulas, normal curve calculations, and data analysis.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-cs",
            "title": "Computer Science",
            "slug": "hw-cs",
            "icon": "code",
            "displayOrder": 2,
            "heroBadge": "Debugging & Coding Problem Sets",
            "heroTitle": "Computer Science Homework & Code Debugging Help",
            "heroSubtitle": "Bug fixing, logic verification, and algorithm implementations that pass automated grading test suites.",
            "shortDescription": "Bug fixing, logic verification, and algorithm implementations that pass automated grading test suites.",
            "content": "Clean code snippets in Python, C++, Java, and SQL that compile smoothly without errors and pass automated unit test suites.",
            "status": "PUBLISHED",
            "seoTitle": "Computer Science Homework & Coding Help | ReadEssay",
            "seoDescription": "Programming homework help, bug fixing, and algorithm implementation with test cases.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-business",
            "title": "Business Mgmt",
            "slug": "hw-business",
            "icon": "business_center",
            "displayOrder": 3,
            "heroBadge": "Business Problem Sets & Case Briefs",
            "heroTitle": "Business Management Homework Help for Undergrads & Postgrads",
            "heroSubtitle": "Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.",
            "shortDescription": "Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.",
            "content": "Actionable homework solutions for business management problem sets, corporate decision trees, and organizational strategy briefs.",
            "status": "PUBLISHED",
            "seoTitle": "Business Management Homework Help | ReadEssay",
            "seoDescription": "Business management worksheets, executive case questions, and strategic frameworks.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-accounting",
            "title": "Accounting",
            "slug": "hw-accounting",
            "icon": "calculate",
            "displayOrder": 4,
            "heroBadge": "Balance Sheets & Ledger Entries",
            "heroTitle": "Accounting Homework Help with Working Excel Formulas",
            "heroSubtitle": "Master balance sheets, managerial cost accounting, taxation, and statutory audit problem sets.",
            "shortDescription": "Master balance sheets, managerial cost accounting, taxation, and statutory audit problem sets.",
            "content": "Step-by-step accounting problem sets with dynamic Excel worksheets, journal entries, T-accounts, and ledger reconciliation.",
            "status": "PUBLISHED",
            "seoTitle": "Accounting Homework Help | ReadEssay",
            "seoDescription": "Accurate university accounting homework solutions with Excel ledger files and balance sheet workings.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-math",
            "title": "Mathematics",
            "slug": "hw-math",
            "icon": "functions",
            "displayOrder": 5,
            "heroBadge": "Calculus, Algebra & Discrete Math",
            "heroTitle": "Mathematics Homework Help with Detailed Derivations",
            "heroSubtitle": "Differential equations, linear algebra, vector calculus, and discrete mathematics with clear step-by-step proofs.",
            "shortDescription": "Differential equations, linear algebra, vector calculus, and discrete mathematics with clear step-by-step proofs.",
            "content": "Step-by-step derivations for college calculus, matrix operations, differential equations, and proofs validated by graduate mathematicians.",
            "status": "PUBLISHED",
            "seoTitle": "Mathematics Homework Help | ReadEssay",
            "seoDescription": "Step-by-step math homework derivations, calculus worksheets, and linear algebra problem sets.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-humanities",
            "title": "Humanities",
            "slug": "hw-humanities",
            "icon": "menu_book",
            "displayOrder": 6,
            "heroBadge": "Critical Responses & Textual Synthesis",
            "heroTitle": "Humanities Homework Help Across History, Ethics & Philosophy",
            "heroSubtitle": "In-depth historical analysis, philosophical ethics, sociological frameworks, and comparative literature.",
            "shortDescription": "In-depth historical analysis, philosophical ethics, sociological frameworks, and comparative literature.",
            "content": "Thoughtful critical responses, reading reflections, ethics discussion prompts, and historical analysis formatted to faculty guidelines.",
            "status": "PUBLISHED",
            "seoTitle": "Humanities Homework Help | ReadEssay",
            "seoDescription": "Scholarly humanities reading responses, ethics discussion questions, and history worksheets.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-science",
            "title": "Natural Science",
            "slug": "hw-science",
            "icon": "biotech",
            "displayOrder": 7,
            "heroBadge": "Lab Calculations & Scientific Analysis",
            "heroTitle": "Natural Science Homework Help in Biology, Chemistry & Physics",
            "heroSubtitle": "Comprehensive lab reports, chemical kinetics, organic synthesis, genetics, and mechanics problem sets.",
            "shortDescription": "Comprehensive lab reports, chemical kinetics, organic synthesis, genetics, and mechanics problem sets.",
            "content": "Scientific worksheets, stoichiometry balancing, genetics Punnett squares, kinematics calculations, and lab analysis.",
            "status": "PUBLISHED",
            "seoTitle": "Natural Science Homework Help | ReadEssay",
            "seoDescription": "University biology, chemistry, and physics homework assistance with step-by-step problem set solutions.",
            "createdAt": "",
            "updatedAt": ""
      },
      {
            "id": "sub-hw-essay",
            "title": "Essay Writing",
            "slug": "hw-essay",
            "icon": "edit_document",
            "displayOrder": 8,
            "heroBadge": "Short Papers & Structured Essays",
            "heroTitle": "Essay Writing Homework Help for College & University Students",
            "heroSubtitle": "Argumentative, analytical, narrative, and comparative essays crafted with peer-reviewed academic rigor.",
            "shortDescription": "Argumentative, analytical, narrative, and comparative essays crafted with peer-reviewed academic rigor.",
            "content": "Well-structured weekly essays, argumentative papers, and literature responses formatted in APA, MLA, Harvard, or Chicago styles.",
            "status": "PUBLISHED",
            "seoTitle": "Essay Writing Homework Help | ReadEssay",
            "seoDescription": "College essay homework help, short papers, thesis development, and peer-reviewed citation formatting.",
            "createdAt": "",
            "updatedAt": ""
      }
],
  },
];

export const DEFAULT_REVIEWS: PublicReview[] = [
  {
    id: 'rev-1',
    reviewerName: 'Isabel Pearson',
    clientName: 'Isabel Pearson',
    studentName: 'Isabel Pearson',
    reviewerInitials: 'IP',
    reviewerAvatar: '/images/female-expert1.jpg',
    academicLevel: 'Undergraduate',
    subject: 'Business Assignment',
    courseLabel: 'Course: Business Assignment • 2 days ago',
    paperType: 'Case Study',
    rating: 5,
    title: '"I literally have no words to show my gratitude."',
    quoteHeadline: '"I literally have no words to show my gratitude."',
    comment:
      'Having had a lot of errors in my business assignments, my teachers kept asking me to revise it whenever I asked for their feedback. Finally, a friend of mine connected me to Readessay assignment experts who guided me through the whole process and edited and returned my assignment in no time! My teachers even praised me for the work done… Thank you so much!!',
    reviewBody:
      'Having had a lot of errors in my business assignments, my teachers kept asking me to revise it whenever I asked for their feedback. Finally, a friend of mine connected me to Readessay assignment experts who guided me through the whole process and edited and returned my assignment in no time! My teachers even praised me for the work done… Thank you so much!!',
    orderRef: '#RE-4821',
    serviceTitle: 'Business Assignment Help',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-15',
    createdAt: '2026-11-15T00:00:00Z',
  },
  {
    id: 'rev-2',
    reviewerName: 'Charlie Reynolds',
    clientName: 'Charlie Reynolds',
    studentName: 'Charlie Reynolds',
    reviewerInitials: 'CR',
    reviewerAvatar: '/images/male-expert1.jpg',
    academicLevel: 'Master\'s',
    subject: 'Academic Research',
    courseLabel: 'Course: Academic Research • 4 days ago',
    paperType: 'Research Paper',
    rating: 5,
    title: '"Great services"',
    quoteHeadline: '"Great services"',
    comment:
      'All writers at readessay.com are really helpful and they have a big team that can manage assignments in every field that my friends and I have asked them to write for, with the expertise of PhD holders. Customer support is instant and communicative.',
    reviewBody:
      'All writers at readessay.com are really helpful and they have a big team that can manage assignments in every field that my friends and I have asked them to write for, with the expertise of PhD holders. Customer support is instant and communicative.',
    orderRef: '#RE-5104',
    serviceTitle: 'Academic Research Help',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-13',
    createdAt: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rev-3',
    reviewerName: 'Rosie Riley',
    clientName: 'Rosie Riley',
    studentName: 'Rosie Riley',
    reviewerInitials: 'RR',
    reviewerAvatar: '/images/female-expert2.jpg',
    academicLevel: 'Undergraduate',
    subject: 'University Coursework',
    courseLabel: 'Course: University Coursework • 1 week ago',
    paperType: 'Coursework Paper',
    rating: 5,
    title: '"You got me the highest marks!"',
    quoteHeadline: '"You got me the highest marks!"',
    comment:
      'I just got my assignment back from my professor and I secured the highest marks in the class. If that\'s not brilliant, I don\'t know what is! You are my go-to assignment experts for all my coursework now! They even included complete bibliography citations.',
    reviewBody:
      'I just got my assignment back from my professor and I secured the highest marks in the class. If that\'s not brilliant, I don\'t know what is! You are my go-to assignment experts for all my coursework now! They even included complete bibliography citations.',
    orderRef: '#RE-5389',
    serviceTitle: 'Assignment Help',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-10',
    createdAt: '2026-11-10T00:00:00Z',
  },
  {
    id: 'rev-4',
    reviewerName: 'Sean Hayes',
    clientName: 'Sean Hayes',
    studentName: 'Sean Hayes',
    reviewerInitials: 'SH',
    reviewerAvatar: '/images/male-expert2.jpg',
    academicLevel: 'PhD',
    subject: 'Business Dissertation',
    courseLabel: 'Course: Business Dissertation • 1 week ago',
    paperType: 'Dissertation',
    rating: 5,
    title: '"5 star services"',
    quoteHeadline: '"5 star services"',
    comment:
      'I used readessay\'s Business Assignment services for the first time. My dissertation was expected in a month and I would never have got it done on schedule if it weren\'t for Mr. Luke at readessay.com. He finished it within 3 weeks as promised!',
    reviewBody:
      'I used readessay\'s Business Assignment services for the first time. My dissertation was expected in a month and I would never have got it done on schedule if it weren\'t for Mr. Luke at readessay.com. He finished it within 3 weeks as promised!',
    orderRef: '#RE-5512',
    serviceTitle: 'Dissertation Guidance',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-09',
    createdAt: '2026-11-09T00:00:00Z',
  },
  {
    id: 'rev-5',
    reviewerName: 'Reece Welch',
    clientName: 'Reece Welch',
    studentName: 'Reece Welch',
    reviewerInitials: 'RW',
    reviewerAvatar: '/images/female-expert1.jpg',
    academicLevel: 'Undergraduate',
    subject: 'Complex Problem Sets',
    courseLabel: 'Course: Complex Problem Sets • 2 weeks ago',
    paperType: 'Problem Set',
    rating: 5,
    title: '"I’ve found my salvation"',
    quoteHeadline: '"I’ve found my salvation"',
    comment:
      'My teacher loves to give complicated assignments. I delegated this task to readessay experts. They solved majority of the questions without a single complaint and every single calculation step was thoroughly annotated.',
    reviewBody:
      'My teacher loves to give complicated assignments. I delegated this task to readessay experts. They solved majority of the questions without a single complaint and every single calculation step was thoroughly annotated.',
    orderRef: '#RE-5633',
    serviceTitle: 'Homework Help',
    serviceSlug: 'homework-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-03',
    createdAt: '2026-11-03T00:00:00Z',
  },
  {
    id: 'rev-6',
    reviewerName: 'Mayra J. Alexander',
    clientName: 'Mayra J. Alexander',
    studentName: 'Mayra J. Alexander',
    reviewerInitials: 'MA',
    reviewerAvatar: '/images/female-expert2.jpg',
    academicLevel: 'Master\'s',
    subject: 'Master\'s Dissertation',
    courseLabel: 'Course: Master\'s Dissertation • 2 weeks ago',
    paperType: 'Thesis',
    rating: 5,
    title: '"Readessay Exam Experts are lifesavers"',
    quoteHeadline: '"Readessay Exam Experts are lifesavers"',
    comment:
      'Stressed about my dissertation because another company returned low quality with plagiarism. Readessay salvaged my paper, fixed grammar and removed all plagiarism within a day. They saved my graduation semester.',
    reviewBody:
      'Stressed about my dissertation because another company returned low quality with plagiarism. Readessay salvaged my paper, fixed grammar and removed all plagiarism within a day. They saved my graduation semester.',
    orderRef: '#RE-5780',
    serviceTitle: 'Dissertation Guidance',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-11-01',
    createdAt: '2026-11-01T00:00:00Z',
  },
  {
    id: 'rev-7',
    reviewerName: 'Albert P. Smith',
    clientName: 'Albert P. Smith',
    studentName: 'Albert P. Smith',
    reviewerInitials: 'AS',
    reviewerAvatar: '/images/male-expert1.jpg',
    academicLevel: 'Undergraduate',
    subject: 'Online Exam Assistance',
    courseLabel: 'Course: Online Exam Assistance • 3 weeks ago',
    paperType: 'Online Exam',
    rating: 5,
    title: '"Professional services with punctuality."',
    quoteHeadline: '"Professional services with punctuality."',
    comment:
      'Readessay is always there in my time of need. Whenever I\'m stuck with heavy workload, I count on them to turn in my exam online with promising quality. Timed quiz went off without a hitch and got an A!',
    reviewBody:
      'Readessay is always there in my time of need. Whenever I\'m stuck with heavy workload, I count on them to turn in my exam online with promising quality. Timed quiz went off without a hitch and got an A!',
    orderRef: '#RE-5891',
    serviceTitle: 'Protected Exams Service',
    serviceSlug: 'exam-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-10-25',
    createdAt: '2026-10-25T00:00:00Z',
  },
  {
    id: 'rev-8',
    reviewerName: 'Charlie Hilton',
    clientName: 'Charlie Hilton',
    studentName: 'Charlie Hilton',
    reviewerInitials: 'CH',
    reviewerAvatar: '/images/male-expert2.jpg',
    academicLevel: 'Undergraduate',
    subject: 'Urgent Assignment',
    courseLabel: 'Course: Urgent Assignment • 3 weeks ago',
    paperType: 'Research Paper',
    rating: 5,
    title: '"Best writing services I’ve come across."',
    quoteHeadline: '"Best writing services I’ve come across."',
    comment:
      'Finished assignments in super short time span. Passed through premium plagiarism checker with zero plagiarism. Astounded with their quality! The customer portal made tracking revisions simple.',
    reviewBody:
      'Finished assignments in super short time span. Passed through premium plagiarism checker with zero plagiarism. Astounded with their quality! The customer portal made tracking revisions simple.',
    orderRef: '#RE-5942',
    serviceTitle: 'Assignment Help',
    serviceSlug: 'assignment-help',
    isVerified: true,
    verified: true,
    isFeatured: true,
    status: 'PUBLISHED',
    reviewDate: '2026-10-22',
    createdAt: '2026-10-22T00:00:00Z',
  },
];

export const REVIEWS_FAQS: PublicFaqItem[] = [
  {
    question: '1. Are these customer reviews from verified students?',
    answer:
      'Yes, absolutely. Every testimonial featured on ReadEssay.com is linked to a completed order ID. We periodically invite students from universities across the US, UK, Australia, and Canada to share their authentic feedback and grade portal results after submitting their papers.',
  },
  {
    question: '2. What happens if I am not completely satisfied with my paper or assignment?',
    answer:
      'We provide an unconditional 100% Satisfaction Guarantee. If any section does not follow your uploaded instructions or grading rubric, you receive unlimited free revisions. If we still fail to meet your confirmed criteria, our 100% money-back guarantee policy protects your purchase.',
  },
  {
    question: '3. How does ReadEssay ensure 100% plagiarism-free content?',
    answer:
      'All written solutions are created from scratch by our subject matter PhD researchers. Prior to releasing the document to your student dashboard, our editorial board processes it through licensed plagiarism and AI-detection tools (Turnitin and CopyScape) to guarantee originality.',
  },
  {
    question: '4. Can I communicate directly with my assigned academic specialist?',
    answer:
      'Yes! Through our encrypted student portal and WhatsApp coordination, you can communicate in real time, share course notes, ask questions regarding progress, and provide feedback on drafts directly to your writer.',
  },
];

export const SAMPLES_FAQS: PublicFaqItem[] = [
  {
    question: '1. Are these sample academic papers genuinely submitted student works?',
    answer:
      'Yes. The documents featured in our public repository are real academic assignments and capstone projects crafted by our researcher network, released with explicit student consent and complete redaction of all personal and institutional identifiers.',
  },
  {
    question: '2. How does ReadEssay protect student privacy when publishing samples?',
    answer:
      'Confidentiality is our non-negotiable core standard. We scrub student names, instructor references, course IDs, university logos, and submission timestamps. We only showcase exemplar pieces with explicit signed release waivers for open academic benchmarking.',
  },
  {
    question: '3. Can I use these sample documents directly in my university coursework?',
    answer:
      'Our published samples are indexed across all major similarity scanners (including Turnitin, iThenticate, and SafeAssign). Direct copy-pasting will trigger high plagiarism flags. These papers are designed as model examples, structuring guides, and citation references. If you need bespoke coursework written specifically for your assignment prompt, our PhD specialists can generate original content from scratch.',
  },
  {
    question: '4. How can I order an original, custom paper on the exact same topic?',
    answer:
      'Simply click the “Order Similar” link on any card, or use the top order button. You can upload your syllabus, prompt sheet, rubrics, and preferred primary sources. Our portal matches you with an expert who has proven mastery in that specific subject niche within 15 minutes.',
  },
  {
    question: '5. Are the citation styles and formatting guidelines kept up to date?',
    answer:
      'Yes. All sample materials and custom deliverables strictly adhere to the latest editions: APA 7th Edition, MLA 9th Edition, Chicago 17th Notes & Bibliography, OSCOLA (4th), Harvard referencing, and IEEE numerical conventions. In-text citations and reference lists are verified for complete bibliographic accuracy.',
  },
];

export const DEFAULT_SAMPLE_SECTIONS: PublicSampleSection[] = [
  {
    id: 'sec-accounting',
    heading: 'Accounting & Corporate Finance',
    shortSummary:
      'Our accounting and finance samples demonstrate rigorous quantitative ledger analysis, cash flow cycle modeling, IFRS/GAAP compliance, and working capital optimization.',
    status: 'active',
    displayOrder: 1,
    metaTitle: 'Accounting & Corporate Finance Samples | ReadEssay',
    metaDescription:
      'Exemplar academic accounting and corporate finance research papers, audits, and financial analysis models.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-acc-1',
        sectionId: 'sec-accounting',
        title: 'The Characteristics of a Firm with a Long Operating Cycle & Cash Flow',
        pageCount: 2,
        academicLevel: 'Masters Degree',
        documentType: 'Financial Analysis Q&A',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Software Used',
        customMetaValue: 'Excel • Solver',
        fileName: 'Operating_Cycle_Cash_Flow_Analysis.pdf',
        fileType: 'PDF',
        fileSize: '1.4 MB',
        fileUrl: '/samples/accounting/Operating_Cycle_Cash_Flow_Analysis.pdf',
        documentFile: {
          fileName: 'Operating_Cycle_Cash_Flow_Analysis.pdf',
          fileType: 'PDF',
          fileSize: '1.4 MB',
          fileUrl: '/samples/accounting/Operating_Cycle_Cash_Flow_Analysis.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-acc-2',
        sectionId: 'sec-accounting',
        title: 'Cadbury Beverages & CRUSH Brands Working Capital Audit',
        pageCount: 6,
        academicLevel: 'Undergraduate',
        documentType: 'Case Study',
        citationStyle: 'Harvard Format',
        customMetaLabel: 'Audit Scope',
        customMetaValue: 'GAAP Ratio Benchmarks',
        fileName: 'Cadbury_Working_Capital_Audit.docx',
        fileType: 'DOCX',
        fileSize: '840 KB',
        fileUrl: '/samples/accounting/Cadbury_Working_Capital_Audit.docx',
        documentFile: {
          fileName: 'Cadbury_Working_Capital_Audit.docx',
          fileType: 'DOCX',
          fileSize: '840 KB',
          fileUrl: '/samples/accounting/Cadbury_Working_Capital_Audit.docx',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-acc-3',
        sectionId: 'sec-accounting',
        title: 'Arthur Andersen & Enron Ethics & Financial Reporting Failure',
        pageCount: 4,
        academicLevel: 'Masters',
        documentType: 'Research Report',
        citationStyle: 'Chicago 17th',
        customMetaLabel: 'Ethics Standard',
        customMetaValue: 'SOX Act Compliance',
        fileName: 'Andersen_Enron_Reporting_Ethics.pdf',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        fileUrl: '/samples/accounting/Andersen_Enron_Reporting_Ethics.pdf',
        documentFile: {
          fileName: 'Andersen_Enron_Reporting_Ethics.pdf',
          fileType: 'PDF',
          fileSize: '2.1 MB',
          fileUrl: '/samples/accounting/Andersen_Enron_Reporting_Ethics.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-business',
    heading: 'Business & Management Assignments',
    shortSummary:
      'Comprehensive business assignment samples showcasing strategic framework application (SWOT, PESTLE, Porter’s Five Forces, VRIO), organizational change management, and executive decision-making.',
    status: 'active',
    displayOrder: 2,
    metaTitle: 'Business & Management Academic Samples | ReadEssay',
    metaDescription:
      'Downloadable business management case studies, executive reports, and strategic plans.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-bus-1',
        sectionId: 'sec-business',
        title: 'Strategic Management & Global Expansion Analysis of Tesla Inc.',
        pageCount: 10,
        academicLevel: 'MBA / Masters',
        documentType: 'Case Study',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Framework',
        customMetaValue: "Porter's 5 • VRIO",
        fileName: 'Tesla_Strategic_Management_Expansion.pdf',
        fileType: 'PDF',
        fileSize: '3.2 MB',
        fileUrl: '/samples/business/Tesla_Strategic_Management_Expansion.pdf',
        documentFile: {
          fileName: 'Tesla_Strategic_Management_Expansion.pdf',
          fileType: 'PDF',
          fileSize: '3.2 MB',
          fileUrl: '/samples/business/Tesla_Strategic_Management_Expansion.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-bus-2',
        sectionId: 'sec-business',
        title: 'Unilever Sustainable Living Plan: Operational ESG Supply Audit',
        pageCount: 8,
        academicLevel: 'Undergraduate',
        documentType: 'Report',
        citationStyle: 'Harvard Format',
        customMetaLabel: 'Methodology',
        customMetaValue: 'Triple Bottom Line',
        fileName: 'Unilever_ESG_Supply_Chain_Audit.docx',
        fileType: 'DOCX',
        fileSize: '1.1 MB',
        fileUrl: '/samples/business/Unilever_ESG_Supply_Chain_Audit.docx',
        documentFile: {
          fileName: 'Unilever_ESG_Supply_Chain_Audit.docx',
          fileType: 'DOCX',
          fileSize: '1.1 MB',
          fileUrl: '/samples/business/Unilever_ESG_Supply_Chain_Audit.docx',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-bus-3',
        sectionId: 'sec-business',
        title: 'Change Leadership in Post-Merger Health System Integration',
        pageCount: 12,
        academicLevel: 'Masters / PhD',
        documentType: 'Academic Proposal',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Model',
        customMetaValue: 'Kotter 8-Stage Process',
        fileName: 'Change_Leadership_Health_Systems.pdf',
        fileType: 'PDF',
        fileSize: '4.1 MB',
        fileUrl: '/samples/business/Change_Leadership_Health_Systems.pdf',
        documentFile: {
          fileName: 'Change_Leadership_Health_Systems.pdf',
          fileType: 'PDF',
          fileSize: '4.1 MB',
          fileUrl: '/samples/business/Change_Leadership_Health_Systems.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-economics',
    heading: 'Economics & Econometrics',
    shortSummary:
      'Empirical macroeconomic models, microeconomic game theory assessments, regression analyses, and policy impact assessments with full datasets.',
    status: 'active',
    displayOrder: 3,
    metaTitle: 'Economics & Econometrics Samples | ReadEssay',
    metaDescription:
      'Rigorous macroeconomic, econometric, and regression analysis research papers and lab models.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-econ-1',
        sectionId: 'sec-economics',
        title: 'Empirical Analysis of Minimum Wage Shocks on Fast Food Labor',
        pageCount: 14,
        academicLevel: 'Masters Degree',
        documentType: 'Empirical Paper',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Econometric Tool',
        customMetaValue: 'STATA • Diff-in-Diff',
        fileName: 'Empirical_Minimum_Wage_Econometrics.pdf',
        fileType: 'PDF',
        fileSize: '2.9 MB',
        fileUrl: '/samples/economics/Empirical_Minimum_Wage_Econometrics.pdf',
        documentFile: {
          fileName: 'Empirical_Minimum_Wage_Econometrics.pdf',
          fileType: 'PDF',
          fileSize: '2.9 MB',
          fileUrl: '/samples/economics/Empirical_Minimum_Wage_Econometrics.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-econ-2',
        sectionId: 'sec-economics',
        title: 'Central Bank Digital Currencies (CBDCs) & Commercial Banking Liquidity',
        pageCount: 8,
        academicLevel: 'Undergraduate',
        documentType: 'Analytical Paper',
        citationStyle: 'Harvard Format',
        customMetaLabel: 'Scope',
        customMetaValue: 'Macroeconomic Policy',
        fileName: 'CBDC_Commercial_Bank_Liquidity.pdf',
        fileType: 'PDF',
        fileSize: '1.7 MB',
        fileUrl: '/samples/economics/CBDC_Commercial_Bank_Liquidity.pdf',
        documentFile: {
          fileName: 'CBDC_Commercial_Bank_Liquidity.pdf',
          fileType: 'PDF',
          fileSize: '1.7 MB',
          fileUrl: '/samples/economics/CBDC_Commercial_Bank_Liquidity.pdf',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-econ-3',
        sectionId: 'sec-economics',
        title: 'Time-Series Forecasting of US Energy Commodity Volatility',
        pageCount: 11,
        academicLevel: 'Masters',
        documentType: 'Quantitative Lab',
        citationStyle: 'Chicago 17th',
        customMetaLabel: 'Model',
        customMetaValue: 'GARCH(1,1) in R',
        fileName: 'Time_Series_Energy_Volatility_GARCH.pdf',
        fileType: 'PDF',
        fileSize: '3.5 MB',
        fileUrl: '/samples/economics/Time_Series_Energy_Volatility_GARCH.pdf',
        documentFile: {
          fileName: 'Time_Series_Energy_Volatility_GARCH.pdf',
          fileType: 'PDF',
          fileSize: '3.5 MB',
          fileUrl: '/samples/economics/Time_Series_Energy_Volatility_GARCH.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-english',
    heading: 'English & Comparative Literature',
    shortSummary:
      'Close-reading critiques, thematic discourse analyses, postcolonial literary theory essays, and Shakespearean textual commentary with flawless citation formatting.',
    status: 'active',
    displayOrder: 4,
    metaTitle: 'English & Comparative Literature Samples | ReadEssay',
    metaDescription:
      'Exemplar literary critiques, close readings, and comparative humanities dissertations.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-eng-1',
        sectionId: 'sec-english',
        title: 'Gothic Tropes and Moral Decadence in The Picture of Dorian Gray',
        pageCount: 7,
        academicLevel: 'Undergraduate',
        documentType: 'Literary Analysis',
        citationStyle: 'MLA 9th Edition',
        customMetaLabel: 'Primary Text',
        customMetaValue: 'Oscar Wilde (1890)',
        fileName: 'Gothic_Tropes_Dorian_Gray_Wilde.pdf',
        fileType: 'PDF',
        fileSize: '1.2 MB',
        fileUrl: '/samples/english/Gothic_Tropes_Dorian_Gray_Wilde.pdf',
        documentFile: {
          fileName: 'Gothic_Tropes_Dorian_Gray_Wilde.pdf',
          fileType: 'PDF',
          fileSize: '1.2 MB',
          fileUrl: '/samples/english/Gothic_Tropes_Dorian_Gray_Wilde.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-eng-2',
        sectionId: 'sec-english',
        title: "Postcolonial Subversion in Chinua Achebe's Things Fall Apart",
        pageCount: 9,
        academicLevel: 'Masters Degree',
        documentType: 'Critical Essay',
        citationStyle: 'MLA 9th Edition',
        customMetaLabel: 'Critical Lens',
        customMetaValue: 'Spivak & Said Theory',
        fileName: 'Postcolonial_Subversion_Things_Fall_Apart.docx',
        fileType: 'DOCX',
        fileSize: '620 KB',
        fileUrl: '/samples/english/Postcolonial_Subversion_Things_Fall_Apart.docx',
        documentFile: {
          fileName: 'Postcolonial_Subversion_Things_Fall_Apart.docx',
          fileType: 'DOCX',
          fileSize: '620 KB',
          fileUrl: '/samples/english/Postcolonial_Subversion_Things_Fall_Apart.docx',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-eng-3',
        sectionId: 'sec-english',
        title: "Trauma and Fragmented Narration in Woolf's Mrs. Dalloway",
        pageCount: 6,
        academicLevel: 'Undergraduate',
        documentType: 'Close Reading',
        citationStyle: 'Chicago 17th',
        customMetaLabel: 'Literary Device',
        customMetaValue: 'Stream of Consciousness',
        fileName: 'Trauma_Narrative_Woolf_Mrs_Dalloway.pdf',
        fileType: 'PDF',
        fileSize: '980 KB',
        fileUrl: '/samples/english/Trauma_Narrative_Woolf_Mrs_Dalloway.pdf',
        documentFile: {
          fileName: 'Trauma_Narrative_Woolf_Mrs_Dalloway.pdf',
          fileType: 'PDF',
          fileSize: '980 KB',
          fileUrl: '/samples/english/Trauma_Narrative_Woolf_Mrs_Dalloway.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-law',
    heading: 'Law & Jurisprudence',
    shortSummary:
      'Rigorous legal briefs, IRAC statutory interpretations, judicial precedent analyses, and international human rights dissertations cited in strict OSCOLA & Bluebook formats.',
    status: 'active',
    displayOrder: 5,
    metaTitle: 'Law & Jurisprudence Academic Samples | ReadEssay',
    metaDescription:
      'Legal memoranda, judicial case reviews, and OSCOLA-formatted legal research papers.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-law-1',
        sectionId: 'sec-law',
        title: 'Comparative Analysis of Duty of Care in English and Scots Tort Law',
        pageCount: 12,
        academicLevel: 'LLB / Masters',
        documentType: 'Legal Memorandum',
        citationStyle: 'OSCOLA Standard',
        customMetaLabel: 'Leading Authority',
        customMetaValue: 'Caparo v Dickman [1990]',
        fileName: 'Duty_of_Care_English_Scots_Law.pdf',
        fileType: 'PDF',
        fileSize: '2.4 MB',
        fileUrl: '/samples/law/Duty_of_Care_English_Scots_Law.pdf',
        documentFile: {
          fileName: 'Duty_of_Care_English_Scots_Law.pdf',
          fileType: 'PDF',
          fileSize: '2.4 MB',
          fileUrl: '/samples/law/Duty_of_Care_English_Scots_Law.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-law-2',
        sectionId: 'sec-law',
        title: 'Corporate Manslaughter & Corporate Homicide Act 2007 Review',
        pageCount: 8,
        academicLevel: 'Undergraduate',
        documentType: 'Case Critique',
        citationStyle: 'OSCOLA Standard',
        customMetaLabel: 'Statutory Focus',
        customMetaValue: 'Senior Mgmt Test §1(3)',
        fileName: 'Corporate_Manslaughter_Act_Review.docx',
        fileType: 'DOCX',
        fileSize: '890 KB',
        fileUrl: '/samples/law/Corporate_Manslaughter_Act_Review.docx',
        documentFile: {
          fileName: 'Corporate_Manslaughter_Act_Review.docx',
          fileType: 'DOCX',
          fileSize: '890 KB',
          fileUrl: '/samples/law/Corporate_Manslaughter_Act_Review.docx',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-law-3',
        sectionId: 'sec-law',
        title: 'International Humanitarian Law and Autonomous Weapon Systems (LAWS)',
        pageCount: 15,
        academicLevel: 'LLM / PhD',
        documentType: 'Law Review Article',
        citationStyle: 'OSCOLA Standard',
        customMetaLabel: 'Treaty Regime',
        customMetaValue: 'Geneva Conventions Add. I',
        fileName: 'IHL_Autonomous_Weapons_Review.pdf',
        fileType: 'PDF',
        fileSize: '3.8 MB',
        fileUrl: '/samples/law/IHL_Autonomous_Weapons_Review.pdf',
        documentFile: {
          fileName: 'IHL_Autonomous_Weapons_Review.pdf',
          fileType: 'PDF',
          fileSize: '3.8 MB',
          fileUrl: '/samples/law/IHL_Autonomous_Weapons_Review.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-math',
    heading: 'Mathematics & Statistics',
    shortSummary:
      'Advanced mathematical proofs, stochastic calculus, Bayesian multilevel modeling, and algorithmic problem sets rendered in LaTeX with complete working steps.',
    status: 'active',
    displayOrder: 6,
    metaTitle: 'Mathematics & Statistics Academic Samples | ReadEssay',
    metaDescription:
      'LaTeX problem sets, Bayesian multilevel models, and mathematical proofs.',
    sampleCount: 3,
    samples: [
      {
        id: 'samp-math-1',
        sectionId: 'sec-math',
        title: 'Zero-Knowledge Proofs in Decentralized Healthcare Database Auditing',
        pageCount: 9,
        academicLevel: 'Masters',
        documentType: 'Technical Paper',
        citationStyle: 'IEEE Standard',
        customMetaLabel: 'Notation',
        customMetaValue: 'LaTeX • ZK-SNARKs',
        fileName: 'Zero_Knowledge_Healthcare_Auditing.pdf',
        fileType: 'PDF',
        fileSize: '3.4 MB',
        fileUrl: '/samples/math/Zero_Knowledge_Healthcare_Auditing.pdf',
        documentFile: {
          fileName: 'Zero_Knowledge_Healthcare_Auditing.pdf',
          fileType: 'PDF',
          fileSize: '3.4 MB',
          fileUrl: '/samples/math/Zero_Knowledge_Healthcare_Auditing.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-math-2',
        sectionId: 'sec-math',
        title: 'Bayesian Multilevel Modeling for Longitudinal Clinical Datasets',
        pageCount: 7,
        academicLevel: 'Masters / PhD',
        documentType: 'Statistical Lab',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Packages',
        customMetaValue: 'R (brms • Stan)',
        fileName: 'Bayesian_Multilevel_Longitudinal_Data.pdf',
        fileType: 'PDF',
        fileSize: '2.2 MB',
        fileUrl: '/samples/math/Bayesian_Multilevel_Longitudinal_Data.pdf',
        documentFile: {
          fileName: 'Bayesian_Multilevel_Longitudinal_Data.pdf',
          fileType: 'PDF',
          fileSize: '2.2 MB',
          fileUrl: '/samples/math/Bayesian_Multilevel_Longitudinal_Data.pdf',
        },
        status: 'active',
        displayOrder: 2,
      },
      {
        id: 'samp-math-3',
        sectionId: 'sec-math',
        title: 'Stochastic Calculus & Black-Scholes Derivative Hedging Proofs',
        pageCount: 6,
        academicLevel: 'Undergraduate',
        documentType: 'Problem Set',
        citationStyle: 'LaTeX / None',
        customMetaLabel: 'Core Equation',
        customMetaValue: "Itô's Lemma Proof",
        fileName: 'Stochastic_Calculus_Black_Scholes.pdf',
        fileType: 'PDF',
        fileSize: '1.8 MB',
        fileUrl: '/samples/math/Stochastic_Calculus_Black_Scholes.pdf',
        documentFile: {
          fileName: 'Stochastic_Calculus_Black_Scholes.pdf',
          fileType: 'PDF',
          fileSize: '1.8 MB',
          fileUrl: '/samples/math/Stochastic_Calculus_Black_Scholes.pdf',
        },
        status: 'active',
        displayOrder: 3,
      },
    ],
  },
  {
    id: 'sec-psychology',
    heading: 'Psychology & Behavioral Sciences',
    shortSummary:
      'Rigorous empirical write-ups, DSM-5 case conceptualizations, cognitive bias investigations, and clinical trial reviews adhering to APA 7th standards.',
    status: 'active',
    displayOrder: 7,
    metaTitle: 'Psychology & Behavioral Sciences Samples | ReadEssay',
    metaDescription:
      'Empirical reviews, DSM-5 clinical case studies, and cognitive psychology research papers.',
    sampleCount: 2,
    samples: [
      {
        id: 'samp-psych-1',
        sectionId: 'sec-psychology',
        title: 'Cognitive Biases in Digital Decision-Making & Algorithmic UX Interface Design',
        pageCount: 8,
        academicLevel: 'Masters',
        documentType: 'Research Paper',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Core Theory',
        customMetaValue: 'Kahneman System 1 & 2',
        fileName: 'Cognitive_Biases_Digital_UX_Design.pdf',
        fileType: 'PDF',
        fileSize: '2.7 MB',
        fileUrl: '/samples/psychology/Cognitive_Biases_Digital_UX_Design.pdf',
        documentFile: {
          fileName: 'Cognitive_Biases_Digital_UX_Design.pdf',
          fileType: 'PDF',
          fileSize: '2.7 MB',
          fileUrl: '/samples/psychology/Cognitive_Biases_Digital_UX_Design.pdf',
        },
        status: 'active',
        displayOrder: 1,
      },
      {
        id: 'samp-psych-2',
        sectionId: 'sec-psychology',
        title: 'PTSD Neurological Pathways and Trauma-Informed Clinical Intervention',
        pageCount: 6,
        academicLevel: 'Masters Degree',
        documentType: 'Clinical Case Study',
        citationStyle: 'APA 7th Edition',
        customMetaLabel: 'Clinical Base',
        customMetaValue: 'DSM-5 • fMRI Correlates',
        fileName: 'PTSD_Neurological_Trauma_Clinical.docx',
        fileType: 'DOCX',
        fileSize: '950 KB',
        fileUrl: '/samples/psychology/PTSD_Neurological_Trauma_Clinical.docx',
        documentFile: {
          fileName: 'PTSD_Neurological_Trauma_Clinical.docx',
          fileType: 'DOCX',
          fileSize: '950 KB',
          fileUrl: '/samples/psychology/PTSD_Neurological_Trauma_Clinical.docx',
        },
        status: 'active',
        displayOrder: 2,
      },
    ],
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
    const cleanSub = subServiceSlug.trim().toLowerCase();
    const sub = parentService.subServices.find(
      (ss) =>
        ss.slug === cleanSub ||
        ss.slug === `assignment-${cleanSub}` ||
        ss.slug === cleanSub.replace(/^assignment-/, '') ||
        ss.slug === `hw-${cleanSub}` ||
        ss.slug === cleanSub.replace(/^hw-/, '')
    );
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

  // Fallback lookup for Assignment Help full 26-disciplines catalog
  if (serviceSlug === 'assignment-help') {
    const cleanSub = subServiceSlug.trim().toLowerCase();
    const discipline = ASSIGNMENT_DISCIPLINES.find(
      (d) =>
        d.slug === cleanSub ||
        d.slug === `assignment-${cleanSub}` ||
        d.slug.replace(/^assignment-/, '') === cleanSub
    );
    if (discipline) {
      return {
        id: `sub-${discipline.slug}`,
        title: discipline.title,
        slug: discipline.slug,
        icon: discipline.icon,
        heroBadge: `Expert ${discipline.title} for Every Academic Level`,
        heroTitle: `${discipline.title} to Achieve Better Grades with Confidence`,
        heroSubtitle: discipline.desc,
        shortDescription: discipline.desc,
        content: `Rigorous academic guidance in ${discipline.title}. Our faculty experts provide step-by-step verified solutions, comprehensive Turnitin reports, and 24/7 dedicated support.`,
        status: 'PUBLISHED',
        service: {
          id: parentService?.id || 'srv-assignment-help',
          title: parentService?.title || 'Assignment Help',
          slug: 'assignment-help',
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

// ============================================================================
// Reviews Directory Fetcher
// ============================================================================

export interface PublicReviewsDirectoryResult {
  reviews: PublicReview[];
  stats: PublicReviewsStats;
}

function calculateRatingBreakdown(reviews: PublicReview[]): Record<number, number> {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating || 5)));
    breakdown[star] = (breakdown[star] || 0) + 1;
  }
  return breakdown;
}

export async function fetchAllPublicReviews(): Promise<PublicReviewsDirectoryResult> {
  try {
    const res = await getPublicReviews(
      {},
      { next: { revalidate: 60 } },
    );

    let rawList: Record<string, unknown>[] = [];
    let avg = 4.95;
    let total = 0;

    if (res && typeof res === 'object') {
      const anyRes = res as unknown as Record<string, unknown>;
      if (Array.isArray(anyRes.data) && anyRes.data.length > 0) {
        rawList = anyRes.data as Record<string, unknown>[];
      } else if (Array.isArray(anyRes.reviews) && anyRes.reviews.length > 0) {
        rawList = anyRes.reviews as Record<string, unknown>[];
      } else if (Array.isArray(res) && res.length > 0) {
        rawList = res as unknown as Record<string, unknown>[];
      }

      if (anyRes.stats && typeof anyRes.stats === 'object') {
        const s = anyRes.stats as Record<string, unknown>;
        if (typeof s.averageRating === 'number') avg = s.averageRating;
        if (typeof s.totalReviews === 'number') total = s.totalReviews;
      }
    }

    if (rawList.length > 0) {
      const reviews: PublicReview[] = rawList.map((item, idx) => {
        const rating = Number(item.rating || 5);
        const name = String(
          item.reviewerName || item.studentName || item.authorName || item.clientName || 'Student',
        );
        const rawAvatar = item.reviewerAvatar || item.avatarUrl;
        const avatar = typeof rawAvatar === 'string' && rawAvatar.trim().length > 0
          ? rawAvatar
          : resolveReviewAvatar(undefined, idx);

        return {
          id: String(item.id || `rev-${idx}`),
          reviewerName: name,
          clientName: name,
          studentName: name,
          reviewerInitials: (item.reviewerInitials as string) || name.slice(0, 2).toUpperCase(),
          reviewerAvatar: avatar,
          academicLevel: (item.academicLevel as string) || 'Undergraduate',
          subject: (item.subject as string) || 'Academic Coursework',
          courseLabel:
            (item.courseLabel as string) ||
            `Course: ${(item.subject as string) || 'Academic Coursework'}`,
          paperType: (item.paperType as string) || 'Research Paper',
          rating,
          title: (item.title as string) || (item.quoteHeadline as string) || 'Exceptional Quality & Support',
          quoteHeadline: (item.title as string) || (item.quoteHeadline as string) || 'Exceptional Quality & Support',
          comment: String(item.comment || item.reviewBody || ''),
          reviewBody: String(item.comment || item.reviewBody || ''),
          orderRef: (item.orderRef as string) || `#RE-${4800 + idx * 73}`,
          serviceId: (item.serviceId as string) || null,
          subServiceId: (item.subServiceId as string) || null,
          isVerified: Boolean(item.isVerified ?? item.verified ?? true),
          verified: Boolean(item.isVerified ?? item.verified ?? true),
          isFeatured: Boolean(item.isFeatured ?? true),
          sortOrder: Number(item.sortOrder || item.displayOrder || idx + 1),
          displayOrder: Number(item.sortOrder || item.displayOrder || idx + 1),
          reviewDate: String(item.reviewDate || new Date().toISOString().split('T')[0]),
          status: 'PUBLISHED',
          createdAt: String(item.createdAt || new Date().toISOString()),
          service: (item.service as { id: string; title: string; slug: string }) || null,
          subService: (item.subService as { id: string; title: string; slug: string }) || null,
          serviceTitle: (item.service as { title?: string })?.title || (item.subject as string) || 'Academic Service',
          serviceSlug: (item.service as { slug?: string })?.slug || undefined,
        };
      });

      const breakdown = calculateRatingBreakdown(reviews);
      return {
        reviews,
        stats: {
          averageRating: avg || 4.9,
          totalReviews: total || reviews.length,
          ratingBreakdown: breakdown,
        },
      };
    }

    const defaultBreakdown = calculateRatingBreakdown(DEFAULT_REVIEWS);
    return {
      reviews: DEFAULT_REVIEWS,
      stats: {
        averageRating: 4.95,
        totalReviews: DEFAULT_REVIEWS.length,
        ratingBreakdown: defaultBreakdown,
      },
    };
  } catch {
    const defaultBreakdown = calculateRatingBreakdown(DEFAULT_REVIEWS);
    return {
      reviews: DEFAULT_REVIEWS,
      stats: {
        averageRating: 4.95,
        totalReviews: DEFAULT_REVIEWS.length,
        ratingBreakdown: defaultBreakdown,
      },
    };
  }
}

// ============================================================================
// Samples Directory Fetcher
// ============================================================================

export interface PublicSamplesDirectoryResult {
  sections: PublicSampleSection[];
  totalSamples: number;
}

export async function fetchPublicSamplesDirectory(): Promise<PublicSamplesDirectoryResult> {
  try {
    const res = await getPublicSamples(
      {},
      { next: { revalidate: 60 } },
    );

    if (res && typeof res === 'object') {
      const sectionsRaw = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.sections)
          ? res.sections
          : null;

      if (sectionsRaw && sectionsRaw.length > 0) {
        const sections: PublicSampleSection[] = sectionsRaw
          .filter((sec) => sec.status === 'active' || !sec.status)
          .map((sec, secIdx) => {
            const rawSamples = Array.isArray(sec.samples) ? sec.samples : [];
            const samples: PublicAcademicSample[] = rawSamples
              .filter((s) => s.status === 'active' || !s.status)
              .map((s, sIdx) => {
                const docFile = s.documentFile || {
                  fileName: s.fileName || `${s.title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
                  fileType: (s.fileType as 'PDF' | 'DOCX') || 'PDF',
                  fileSize: s.fileSize || '1.5 MB',
                  fileUrl: s.fileUrl || `/samples/${s.fileName || 'sample.pdf'}`,
                };

                return {
                  id: String(s.id || `samp-${secIdx}-${sIdx}`),
                  sectionId: String(s.sectionId || sec.id),
                  title: String(s.title || 'Academic Research Sample'),
                  pageCount: Number(s.pageCount || 1),
                  academicLevel: String(s.academicLevel || 'Undergraduate'),
                  documentType: String(s.documentType || 'Research Paper'),
                  citationStyle: String(s.citationStyle || 'APA 7th Edition'),
                  customMetaLabel: s.customMetaLabel || null,
                  customMetaValue: s.customMetaValue || null,
                  fileName: docFile.fileName,
                  fileType: docFile.fileType,
                  fileSize: docFile.fileSize,
                  fileUrl: docFile.fileUrl,
                  documentFile: docFile,
                  status: s.status || 'active',
                  displayOrder: Number(s.displayOrder || sIdx + 1),
                  createdAt: s.createdAt,
                  updatedAt: s.updatedAt,
                };
              });

            return {
              id: String(sec.id || `sec-${secIdx}`),
              heading: String(sec.heading || 'Academic Discipline'),
              shortSummary: String(sec.shortSummary || ''),
              status: sec.status || 'active',
              displayOrder: Number(sec.displayOrder || secIdx + 1),
              metaTitle: sec.metaTitle || `${sec.heading} Samples | ReadEssay`,
              metaDescription: sec.metaDescription || sec.shortSummary || null,
              sampleCount: samples.length,
              samples,
            };
          });

        const totalSamples =
          res.stats?.totalSamples ??
          sections.reduce((acc, s) => acc + s.samples.length, 0);

        return {
          sections,
          totalSamples,
        };
      }
    }

    const totalSamples = DEFAULT_SAMPLE_SECTIONS.reduce(
      (acc, s) => acc + s.samples.length,
      0,
    );
    return {
      sections: DEFAULT_SAMPLE_SECTIONS,
      totalSamples,
    };
  } catch {
    const totalSamples = DEFAULT_SAMPLE_SECTIONS.reduce(
      (acc, s) => acc + s.samples.length,
      0,
    );
    return {
      sections: DEFAULT_SAMPLE_SECTIONS,
      totalSamples,
    };
  }
}

// ============================================================================
// Blog Default Data & Fetchers
// ============================================================================

export const DEFAULT_BLOG_CATEGORIES: PublicBlogCategory[] = [
  {
    id: 'cat-dissertation',
    name: 'Dissertation & Thesis Mastery',
    slug: 'dissertation-thesis-mastery',
    badgeLabel: 'Category',
    shortDescription:
      'Comprehensive blueprints, committee objection handling, and chapter-by-chapter guidelines for graduate scholars.',
    displayOrder: 1,
    status: 'published',
    postCount: 3,
    seo: {
      metaTitle: 'Dissertation & Thesis Mastery Guides | ReadEssay Blog',
      metaDescription:
        'Actionable guides on structuring master dissertations, methodology selection, and defense preparation.',
      canonicalSlug: 'dissertation-thesis-mastery',
    },
  },
  {
    id: 'cat-academic-writing',
    name: 'Academic Writing & Essays',
    slug: 'academic-writing-essays',
    badgeLabel: 'Category',
    shortDescription:
      'Master the principles of scholarly prose, critical synthesis, and academic argumentation.',
    displayOrder: 2,
    status: 'published',
    postCount: 2,
    seo: {
      metaTitle: 'Academic Writing & Essay Guides | ReadEssay Blog',
      metaDescription:
        'Learn how to write high-scoring university essays, literature reviews, and critical critiques.',
      canonicalSlug: 'academic-writing-essays',
    },
  },
  {
    id: 'cat-referencing',
    name: 'University Guides & Referencing',
    slug: 'research-methodology-referencing',
    badgeLabel: 'Category',
    shortDescription:
      'In-depth breakdowns of APA 7th, Harvard, OSCOLA, and Chicago citation rules with instant formatting examples.',
    displayOrder: 3,
    status: 'published',
    postCount: 1,
    seo: {
      metaTitle: 'Referencing & Citation Guides | ReadEssay Blog',
      metaDescription:
        'Master academic referencing standards and avoid common plagiarism pitfalls.',
      canonicalSlug: 'research-methodology-referencing',
    },
  },
  {
    id: 'cat-exam-prep',
    name: 'Exam Preparation & Revision',
    slug: 'exam-preparation-revision',
    badgeLabel: 'Category',
    shortDescription:
      'Proven cognitive recall strategies, spaced repetition schedules, and stress reduction methods.',
    displayOrder: 4,
    status: 'published',
    postCount: 1,
    seo: {
      metaTitle: 'Exam Preparation & Revision Strategies | ReadEssay Blog',
      metaDescription:
        'Scientific pacing, active recall, and cognitive strategies to ace university examinations.',
      canonicalSlug: 'exam-preparation-revision',
    },
  },
  {
    id: 'cat-student-life',
    name: 'Student Life, Career & Wellness',
    slug: 'student-life-wellness',
    badgeLabel: 'Category',
    shortDescription:
      'Proven strategies for balancing employment, coursework deadlines, and mental wellness.',
    displayOrder: 5,
    status: 'published',
    postCount: 1,
    seo: {
      metaTitle: 'Student Life & Career Balance | ReadEssay Blog',
      metaDescription:
        'Time management frameworks and wellness advice for busy collegiate students.',
      canonicalSlug: 'student-life-wellness',
    },
  },
];

export const DEFAULT_BLOG_POSTS: PublicBlogPost[] = [
  {
    id: 'post-1',
    categoryId: 'cat-dissertation',
    title:
      "How to Structure a Master's Dissertation: The Complete Chapter-by-Chapter Blueprint",
    slug: 'how-to-structure-a-masters-dissertation',
    excerpt:
      'A definitive chapter-by-chapter blueprint covering word count percentages, methodology alignment, empirical reporting, and committee defense tactics.',
    readTime: '8 min read',
    publishedAt: '2024-10-24',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ69LFSgBNZ2h1755hnc9BJm9FHy6LNw_PaKHfP_wc5tkz1yP34K1Lk1YBwJOfrvZ-2ECQV5PJi0tY4HxbXcVU20z2GhN6pCg-_LaEn8IZNxfUz-2IpGyTOH5P8TlEOlfqA6skHbT-kRl-dfou5sg8jMKI2dh0wCUA11CH2_kLtrq900VNrtteElaSf0dLpZyd7r7hoeqe8W_wjR1isaJ_1ZgQSyBiE3lhUC_pnE7n',
      altText:
        'Academic dissertation research writing setup, college student working on a literature review thesis chapter with open laptop',
      caption:
        'Figure 1.0: Empirical research formulation and reference management in progress at an Oxford graduate study cubicle. Photo: ReadEssay Editorial Archive.',
    },
    contentHtml: `
      <h2>1. Understanding the Core Architecture of Graduate Dissertations</h2>
      <p>A master's dissertation is not merely an extended course paper; it represents a comprehensive, methodologically sound contribution to scholarly discourse. At its foundation, academic graduate writing requires a symmetrical alignment between your epistemological stance, empirical questions, and analytical conclusions.</p>
      <p>When committee members evaluate a submission, they seek internal methodological coherence above all else. Many candidates encounter developmental roadblocks by treating each section in isolation. For instance, if your statement of the problem in Chapter 1 highlights a deficit in qualitative organizational experiences, your analytical toolkit in Chapter 3 cannot arbitrarily pivot into non-contextual statistical metrics without rigorous theoretical bridging.</p>
      <p>Before drafting initial sentences, candidates should construct a detailed chapter prospectus. A standard North American and UK postgraduate thesis generally conforms to between 12,000 and 25,000 words, structured strategically across five classical pillars.</p>

      <h2>2. The Standard 5-Chapter Dissertation Framework</h2>
      <p>While certain interdisciplinary faculties allow slight variations (such as portfolio-based or article-compilation theses), the five-chapter model remains the gold standard recognized by graduate examination boards across Harvard, Oxford, Stanford, and Australian Group of Eight institutions.</p>
      <ul>
        <li><strong>Chapter 1 (Introduction & Problem Statement):</strong> Contextualizes the entire inquiry, establishing why your research matters, identifying an unresolved gap, and presenting razor-sharp Research Questions (RQs).</li>
        <li><strong>Chapter 2 (Systematic Literature Review):</strong> Typically accounts for 25% to 30% of the entire manuscript. It is not a summary of sources; it is a critical synthesis that categorizes prevailing debates, contrasts theoretical assumptions, and grounds your empirical work in an established framework.</li>
        <li><strong>Chapter 3 (Research Methodology):</strong> Serves as the blueprint making your inquiry fully replicable, specifying research paradigm, design, population, sampling formulas, and ethical compliance.</li>
        <li><strong>Chapter 4 (Findings):</strong> Presents unvarnished empirical evidence and descriptive/inferential statistical tests without speculative editorializing.</li>
        <li><strong>Chapter 5 (Discussion & Conclusion):</strong> Interprets what your findings mean in conversation with scholars cited in Chapter 2, outlining boundaries and practical industry implications.</li>
      </ul>

      <blockquote class="border-l-4 border-orange bg-orange/5 p-4 rounded-r-xl my-4 text-sm text-text-primary not-italic">
        <strong class="block text-navy font-semibold mb-1">Faculty Insider Note: Methodological Alignment</strong>
        Committees frequently scrutinize the direct alignment between Chapter 1 and Chapter 3. Every secondary research question formulated in your introduction must directly map to an identifiable data collection instrument and statistical or thematic protocol in your methodology chapter.
      </blockquote>

      <h2>3. Chapter Breakdown & Word Count Allocation</h2>
      <p>To ensure your dissertation does not become top-heavy in conceptualization while remaining anemic in empirical verification, follow this accredited percentage benchmark across your manuscript:</p>

      <div class="overflow-x-auto my-4">
        <table class="w-full text-left border-collapse text-xs border border-border">
          <thead>
            <tr class="bg-canvas border-b border-border">
              <th class="p-2.5 font-bold text-navy">Chapter</th>
              <th class="p-2.5 font-bold text-navy">Percentage</th>
              <th class="p-2.5 font-bold text-navy">Target Objective</th>
              <th class="p-2.5 font-bold text-navy">Common Pitfall</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="p-2.5 font-semibold text-navy">1. Introduction</td>
              <td class="p-2.5">10% – 12%</td>
              <td class="p-2.5">Empirical gap, RQs & rationale</td>
              <td class="p-2.5 text-red-600">Vague research scope</td>
            </tr>
            <tr class="border-b border-border">
              <td class="p-2.5 font-semibold text-navy">2. Literature Review</td>
              <td class="p-2.5">25% – 30%</td>
              <td class="p-2.5">Critical scholarly synthesis</td>
              <td class="p-2.5 text-red-600">Annotated bibliography style</td>
            </tr>
            <tr class="border-b border-border">
              <td class="p-2.5 font-semibold text-navy">3. Methodology</td>
              <td class="p-2.5">15% – 20%</td>
              <td class="p-2.5">Replicable research design</td>
              <td class="p-2.5 text-red-600">Unjustified sample size</td>
            </tr>
            <tr class="border-b border-border">
              <td class="p-2.5 font-semibold text-navy">4. Findings</td>
              <td class="p-2.5">20% – 25%</td>
              <td class="p-2.5">Empirical evidence & statistical tables</td>
              <td class="p-2.5 text-red-600">Premature interpretation</td>
            </tr>
            <tr>
              <td class="p-2.5 font-semibold text-navy">5. Discussion & Conclusion</td>
              <td class="p-2.5">15% – 20%</td>
              <td class="p-2.5">Synthesis with prior literature</td>
              <td class="p-2.5 text-red-600">Unsupported generalizations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Common Faculty Objections & How to Preempt Them</h2>
      <p>During defense hearings, committee examiners focus on specific structural vulnerabilities. Anticipating these points in your text prevents extensive revisions:</p>
      <ul>
        <li><strong>Disconnected Theoretical Framework:</strong> In Chapter 5, explicitly revisit the models established in Chapter 2, demonstrating how findings modify or reinforce them.</li>
        <li><strong>Dated Citations:</strong> Ensure at least 65% of your cited literature has been published within the last 3 to 5 years.</li>
        <li><strong>Underpowered Sample Size:</strong> Include a verified power analysis or saturation justification directly in your methodology chapter.</li>
      </ul>
    `,
    author: {
      name: 'Dr. David Moraine',
      credentials: 'PhD, Oxford Alum',
      roleSubtitle:
        'Senior Academic Research Faculty • Verified ReadEssay Advisor',
      experienceLine:
        'Senior Research Fellow • 14+ Years Postgraduate Advising • 45+ Peer-Reviewed Publications',
      bio: 'Dr. Moraine holds a Doctorate in Educational Research from the University of Oxford. Over the past decade, he has served on graduate defense committees and led the Academic Research Integrity board at ReadEssay.com, mentoring over 1,200 candidates to successful completion.',
    },
    faqSection: {
      tagline: 'Dissertation Structuring Inquiries',
      heading: 'Frequently Asked Questions',
      items: [
        {
          id: 'faq-1',
          question:
            'What is the typical word count distribution across dissertation chapters?',
          answer:
            'Typically, Introduction takes 10%, Literature Review takes 25-30%, Methodology occupies 15-20%, Results takes 20-25%, and the Discussion/Conclusion comprises 15-20%. This ensures equal weight between your contextual scholarship and your original empirical data analysis.',
        },
        {
          id: 'faq-2',
          question:
            'Can I combine the Results and Discussion chapters in my thesis?',
          answer:
            "In specific disciplines, faculties permit an integrated 'Results and Discussion' chapter. However, for most North American and UK social science and business master's programs, examiners strictly prefer keeping pure findings isolated from speculative interpretation.",
        },
        {
          id: 'faq-3',
          question:
            'How does ReadEssay ensure 100% academic integrity and original research guidance?',
          answer:
            'All ReadEssay specialists are certified postgraduates with verified terminal degrees. We perform comprehensive Turnitin similarity indexing, ensure zero AI contamination, adhere to strict confidentiality non-disclosure pacts, and assist candidates through personalized editorial feedback without ghostwriting.',
        },
        {
          id: 'faq-4',
          question:
            'How early before defense deadlines should I seek professional dissertation proofreading?',
          answer:
            'We strongly advise submitting your draft for full proofreading and formatting at least 3 to 4 weeks prior to your official committee submission date.',
        },
      ],
    },
    tocHeadings: [
      '1. Understanding the Core Architecture of Graduate Dissertations',
      '2. The Standard 5-Chapter Dissertation Framework',
      '3. Chapter Breakdown & Word Count Allocation',
      '4. Common Faculty Objections & How to Preempt Them',
    ],
    relatedPosts: [
      {
        id: 'post-2',
        title:
          'Mastering Literature Reviews: Synthesizing Scholarly Sources Without Plagiarism',
        slug: 'mastering-literature-reviews-synthesizing-sources',
        excerpt:
          'Learn the synthesis matrix method to weave contrasting scholarly viewpoints into a cohesive, high-scoring critical critique.',
        readTime: '5 min read',
        publishedAt: '2024-10-19',
        featuredImage: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k',
        },
      },
      {
        id: 'post-3',
        title:
          'APA 7th vs. Chicago 17th: Deciding Which Citation Standard Your Faculty Requires',
        slug: 'apa-7th-vs-chicago-17th-citation-guide',
        excerpt:
          'A clear comparative breakdown of in-text citations, footnote rules, and bibliographic entries with instant formatting examples.',
        readTime: '6 min read',
        publishedAt: '2024-10-15',
        featuredImage: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nf62w4NDgsoFO0hDN2DwhYUeKC5JW1Se7CwDzqcXVsF5pYRxrQCKTuZEcecKuzxq0l8rJgBgXTbtlZUnPmg7YOp_3W5Kuf_4iES-RzCqNVJKKCF0mU73VOGbqgss1eVs-W_Djo5Tq-jcQpokjrrf_MVu2gySuIKIJkjekhwlBpGjhoBO0vmz-_y3-D0WkFdY264lnauDxhwGtx-sdKSAGbeBDOD009SRR1iyWROw',
        },
      },
      {
        id: 'post-7',
        title:
          'Quantitative vs. Qualitative Research: Selecting Your Dissertation Methodology',
        slug: 'quantitative-vs-qualitative-dissertation-methodology',
        excerpt:
          'How to justify your sampling methodology, statistical instrumentation, and ethical compliance to your thesis committee.',
        readTime: '9 min read',
        publishedAt: '2024-09-22',
        featuredImage: {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nf62w4NDgsoFO0hDN2DwhYUeKC5JW1Se7CwDzqcXVsF5pYRxrQCKTuZEcecKuzxq0l8rJgBgXTbtlZUnPmg7YOp_3W5Kuf_4iES-RzCqNVJKKCF0mU73VOGbqgss1eVs-W_Djo5Tq-jcQpokjrrf_MVu2gySuIKIJkjekhwlBpGjhoBO0vmz-_y3-D0WkFdY264lnauDxhwGtx-sdKSAGbeBDOD009SRR1iyWROw',
        },
      },
    ],
    seo: {
      metaTitle:
        "How to Structure a Master's Dissertation: Chapter Blueprint | ReadEssay",
      metaDescription:
        'Master the 5-chapter dissertation framework with recommended word count percentages, methodology alignment, and preemption tactics for defense hearings.',
      canonicalSlug: 'how-to-structure-a-masters-dissertation',
    },
    category: {
      id: 'cat-dissertation',
      name: 'Dissertation & Thesis Mastery',
      slug: 'dissertation-thesis-mastery',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-10-24T00:00:00.000Z',
    updatedAt: '2024-10-24T00:00:00.000Z',
  },
  {
    id: 'post-2',
    categoryId: 'cat-academic-writing',
    title:
      'Mastering Literature Reviews: Synthesizing Scholarly Sources Without Plagiarism',
    slug: 'mastering-literature-reviews-synthesizing-sources',
    excerpt:
      'Learn the synthesis matrix method to weave contrasting scholarly viewpoints into a cohesive, high-scoring critical critique.',
    readTime: '5 min read',
    publishedAt: '2024-10-19',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k',
      altText:
        'Modern university library study scene with an open academic laptop',
    },
    contentHtml: `
      <h2>1. The Difference Between Summarizing and Synthesizing</h2>
      <p>A literature review is not a serial catalog of abstracts. True synthesis groups literature around themes, conceptual tensions, and methodological gaps.</p>
      <h2>2. Building a Synthesis Matrix</h2>
      <p>Use a cross-tabular grid with columns for Authors, Theoretical Focus, Methodology, Sample Size, Key Findings, and Limitations.</p>
    `,
    author: {
      name: 'Prof. David Sterling',
      credentials: 'MA (Oxon), Fellow HEA',
      roleSubtitle: 'Senior Rhetoric Specialist',
      experienceLine: '18+ Years Academic Advising',
      bio: 'Prof. Sterling specializes in rhetoric, composition, and literature synthesis.',
    },
    tocHeadings: [
      '1. The Difference Between Summarizing and Synthesizing',
      '2. Building a Synthesis Matrix',
    ],
    category: {
      id: 'cat-academic-writing',
      name: 'Academic Writing & Essays',
      slug: 'academic-writing-essays',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-10-19T00:00:00.000Z',
    updatedAt: '2024-10-19T00:00:00.000Z',
  },
  {
    id: 'post-3',
    categoryId: 'cat-referencing',
    title:
      'APA 7th vs. Chicago 17th: Deciding Which Citation Standard Your Faculty Requires',
    slug: 'apa-7th-vs-chicago-17th-citation-guide',
    excerpt:
      'A clear comparative breakdown of in-text citations, footnote rules, and bibliographic entries with instant formatting examples.',
    readTime: '6 min read',
    publishedAt: '2024-10-15',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nf62w4NDgsoFO0hDN2DwhYUeKC5JW1Se7CwDzqcXVsF5pYRxrQCKTuZEcecKuzxq0l8rJgBgXTbtlZUnPmg7YOp_3W5Kuf_4iES-RzCqNVJKKCF0mU73VOGbqgss1eVs-W_Djo5Tq-jcQpokjrrf_MVu2gySuIKIJkjekhwlBpGjhoBO0vmz-_y3-D0WkFdY264lnauDxhwGtx-sdKSAGbeBDOD009SRR1iyWROw',
      altText: 'Academic citation guides and modern books stacked neatly on desk',
    },
    contentHtml: `
      <h2>1. Author-Date vs. Notes-Bibliography Systems</h2>
      <p>APA 7th utilizes the author-date convention predominantly in the behavioral and social sciences. Chicago 17th offers both author-date and footnotes systems.</p>
    `,
    author: {
      name: 'Dr. Alan Crawford',
      credentials: 'PhD, Cambridge',
      roleSubtitle: 'Academic Documentation Lead',
      experienceLine: '12+ Years Editorial Advising',
      bio: 'Dr. Crawford oversees citation accuracy and compliance across major style manuals.',
    },
    tocHeadings: ['1. Author-Date vs. Notes-Bibliography Systems'],
    category: {
      id: 'cat-referencing',
      name: 'University Guides & Referencing',
      slug: 'research-methodology-referencing',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-10-15T00:00:00.000Z',
    updatedAt: '2024-10-15T00:00:00.000Z',
  },
  {
    id: 'post-4',
    categoryId: 'cat-exam-prep',
    title:
      'Beating Exam Anxiety: Cognitive Pacing and Active Recall for Finals Week',
    slug: 'beating-exam-anxiety-cognitive-pacing',
    excerpt:
      'Actionable spaced-repetition schedules and stress reduction methods designed to help collegiate students retain complex formulas.',
    readTime: '4 min read',
    publishedAt: '2024-10-11',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfLv_5jV-SqHgByK037AJJEA96qaSIe07dwqcW-q58ZEnU6jzsyZWHMjeQHrvZvVoxjcVQQiyO2DoMGBeLYhfIJh4XnewvXhT2UC_b7SWh98bZ6bYndWYBG06erPuHjXwGrEn5J3hEJNNSbZyxiTLn4Vk0t18i9CucowgNWrZjKbWj3tJbU81qjRzleOA2KzUlOeE2SxGrWuMfGK8GOWe0_vok9-UI9-u925qBzASc',
      altText:
        'University student studying with textbooks and tablet in modern common room',
    },
    contentHtml: `
      <h2>1. Spaced Repetition over Cramming</h2>
      <p>Distributed practice enhances long-term memory consolidation far superior to late-night cram sessions.</p>
    `,
    author: {
      name: 'Dr. Sarah Jenkins',
      credentials: 'PhD, Stanford University',
      roleSubtitle: 'Learning Design Fellow',
      experienceLine: '10+ Years Cognitive Education Advising',
      bio: 'Dr. Jenkins provides study systems and cognitive retrieval advisory.',
    },
    tocHeadings: ['1. Spaced Repetition over Cramming'],
    category: {
      id: 'cat-exam-prep',
      name: 'Exam Preparation & Revision',
      slug: 'exam-preparation-revision',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-10-11T00:00:00.000Z',
    updatedAt: '2024-10-11T00:00:00.000Z',
  },
  {
    id: 'post-5',
    categoryId: 'cat-academic-writing',
    title:
      'Writing a Flawless Case Study Analysis in Corporate Finance & Business Law',
    slug: 'flawless-case-study-analysis-corporate-finance',
    excerpt:
      'A rigorous walkthrough on applying SWOT, PESTLE, and DCF valuation frameworks to executive business problem statements.',
    readTime: '7 min read',
    publishedAt: '2024-10-06',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k',
      altText: 'Modern university study scene with open laptop and notebooks',
    },
    contentHtml: `
      <h2>1. The Anatomy of an Executive Case Study</h2>
      <p>Executive business case studies demand structured synthesis: executive summary, strategic diagnostic, alternative evaluations, and implementation roadmaps.</p>
    `,
    author: {
      name: 'Dr. David Moraine',
      credentials: 'PhD, Oxford Alum',
      roleSubtitle: 'Senior Academic Research Faculty',
      experienceLine: '14+ Years Postgraduate Advising',
      bio: 'Dr. Moraine mentors candidates across business and legal case studies.',
    },
    tocHeadings: ['1. The Anatomy of an Executive Case Study'],
    category: {
      id: 'cat-academic-writing',
      name: 'Academic Writing & Essays',
      slug: 'academic-writing-essays',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-10-06T00:00:00.000Z',
    updatedAt: '2024-10-06T00:00:00.000Z',
  },
  {
    id: 'post-6',
    categoryId: 'cat-student-life',
    title:
      'Balancing Full-Time Employment & College: Real Scheduling Frameworks',
    slug: 'balancing-full-time-employment-and-college',
    excerpt:
      'Proven strategies for non-traditional students balancing career responsibilities with rigorous weekly coursework deadlines.',
    readTime: '5 min read',
    publishedAt: '2024-09-29',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANOeAUUmubATeZTbNbOvnrQT2PrGPOTC-tBO_TaEG-e2PRNolHPjtU3Y4Heur2KG2WKugvalSURkDr4V1I8c1G0tA-DC5by7DpgzaJ9mmH1v96EJMptpVqjxcJf-08AG-qXjmEvRuOymdD9oZIGmySXVLozePN2pgedI7n-CWuZj2o8wOUA9izyYVQgNklOxl_j0-6f6PVE2ohfU0_RLpy2T0SaVzoENbsBWPOnMt8',
      altText: 'Diverse collegiate study group around modern seminar table',
    },
    contentHtml: `
      <h2>1. Time Blocking for Working Scholars</h2>
      <p>Balancing a 40-hour work week with collegiate writing requires strict temporal boundaries. Reserve dedicated 90-minute morning blocks.</p>
    `,
    author: {
      name: 'Prof. David Sterling',
      credentials: 'MA (Oxon), Fellow HEA',
      roleSubtitle: 'Senior Rhetoric Specialist',
      experienceLine: '18+ Years Academic Advising',
      bio: 'Prof. Sterling mentors non-traditional graduate candidates.',
    },
    tocHeadings: ['1. Time Blocking for Working Scholars'],
    category: {
      id: 'cat-student-life',
      name: 'Student Life, Career & Wellness',
      slug: 'student-life-wellness',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-09-29T00:00:00.000Z',
    updatedAt: '2024-09-29T00:00:00.000Z',
  },
  {
    id: 'post-7',
    categoryId: 'cat-dissertation',
    title:
      'Quantitative vs. Qualitative Research: Selecting Your Dissertation Methodology',
    slug: 'quantitative-vs-qualitative-dissertation-methodology',
    excerpt:
      'How to justify your sampling methodology, statistical instrumentation, and ethical compliance to your thesis committee.',
    readTime: '9 min read',
    publishedAt: '2024-09-22',
    featuredImage: {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nf62w4NDgsoFO0hDN2DwhYUeKC5JW1Se7CwDzqcXVsF5pYRxrQCKTuZEcecKuzxq0l8rJgBgXTbtlZUnPmg7YOp_3W5Kuf_4iES-RzCqNVJKKCF0mU73VOGbqgss1eVs-W_Djo5Tq-jcQpokjrrf_MVu2gySuIKIJkjekhwlBpGjhoBO0vmz-_y3-D0WkFdY264lnauDxhwGtx-sdKSAGbeBDOD009SRR1iyWROw',
      altText: 'Stack of academic books and citation guides on desk',
    },
    contentHtml: `
      <h2>1. Epistemological Paradigms Compared</h2>
      <p>Quantitative inquiries stem from positivist paradigms seeking causal inference. Qualitative studies embrace interpretivism and phenomenology.</p>
    `,
    author: {
      name: 'Dr. Sarah Jenkins',
      credentials: 'PhD, Stanford University',
      roleSubtitle: 'Learning Design Fellow',
      experienceLine: '10+ Years Research Methodology Advising',
      bio: 'Dr. Jenkins provides research methodology advisory for quantitative and mixed-methods dissertations.',
    },
    tocHeadings: ['1. Epistemological Paradigms Compared'],
    category: {
      id: 'cat-dissertation',
      name: 'Dissertation & Thesis Mastery',
      slug: 'dissertation-thesis-mastery',
      badgeLabel: 'Category',
    },
    status: 'published',
    createdAt: '2024-09-22T00:00:00.000Z',
    updatedAt: '2024-09-22T00:00:00.000Z',
  },
];

export async function fetchPublicBlogCategories(): Promise<PublicBlogCategory[]> {
  try {
    const res = await getPublicBlogCategories({ next: { revalidate: 60 } });
    if (Array.isArray(res) && res.length > 0) {
      return res;
    }
    return DEFAULT_BLOG_CATEGORIES;
  } catch {
    return DEFAULT_BLOG_CATEGORIES;
  }
}

export async function fetchPublicBlogCategoryBySlug(
  slug: string,
): Promise<PublicBlogCategory | null> {
  try {
    const res = await getPublicBlogCategoryBySlug(slug, {
      next: { revalidate: 60 },
    });
    if (res && res.slug) {
      return res;
    }
  } catch {
    // Fall through to fallback
  }

  const found = DEFAULT_BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (found) {
    const categoryPosts = DEFAULT_BLOG_POSTS.filter(
      (p) => p.category?.slug === slug || p.categoryId === found.id,
    );
    return {
      ...found,
      posts: categoryPosts,
      postCount: categoryPosts.length,
    };
  }

  return null;
}

export async function fetchPublicBlogPosts(params?: {
  categorySlug?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PublicBlogPostsResponse> {
  try {
    const res = await getPublicBlogPosts(params, { next: { revalidate: 60 } });
    if (res && Array.isArray(res.posts) && res.posts.length > 0) {
      return res;
    }
  } catch {
    // Fall through to fallback
  }

  let posts = [...DEFAULT_BLOG_POSTS];

  if (params?.categorySlug) {
    posts = posts.filter((p) => p.category?.slug === params.categorySlug);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
        (p.author?.name && p.author.name.toLowerCase().includes(q)),
    );
  }

  const page = params?.page || 1;
  const limit = params?.limit || 50;
  const total = posts.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = posts.slice((page - 1) * limit, page * limit);

  return {
    posts: paginated,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function fetchPublicBlogPostBySlug(
  slug: string,
): Promise<PublicBlogPost | null> {
  try {
    const res = await getPublicBlogPostBySlug(slug, {
      next: { revalidate: 60 },
    });
    if (res && res.slug) {
      return res;
    }
  } catch {
    // Fall through to fallback
  }

  const found = DEFAULT_BLOG_POSTS.find((p) => p.slug === slug);
  return found || null;
}

// ============================================================================
// Order Pricing & Calculator Fallback Dataset
// ============================================================================

export const DEFAULT_CALCULATOR_DATA: PublicCalculatorResponse = {
  config: {
    id: 'default',
    widgetTitle: 'Calculate Order Price',
    widgetSubtitle: 'Instant estimate tailored to your exact academic needs',
    badgeText: 'PRICE CALCULATOR',
    ctaButtonText: 'Continue with Order',
    currencySymbol: '$',
    wordsPerPage: 275,
    minPages: 1,
    maxPages: 200,
    defaultPages: 1,
    defaultLevelSlug: 'undergraduate',
    defaultDeadlineSlug: '6-days',
    useServicesFromCatalog: true,
  },
  levels: [
    { id: 'lvl-hs', name: 'High School', slug: 'high-school', displayOrder: 1, isActive: true },
    { id: 'lvl-col', name: 'College', slug: 'college', displayOrder: 2, isActive: true },
    { id: 'lvl-ug', name: 'Undergraduate', slug: 'undergraduate', displayOrder: 3, isActive: true },
    { id: 'lvl-ms', name: 'Master', slug: 'master', displayOrder: 4, isActive: true },
    { id: 'lvl-phd', name: 'PhD', slug: 'phd', displayOrder: 5, isActive: true },
  ],
  deadlines: [
    { id: 'dl-3h', label: '3 hrs', slug: '3-hrs', hours: 3, displayOrder: 1, isActive: true },
    { id: 'dl-12h', label: '12 hrs', slug: '12-hrs', hours: 12, displayOrder: 2, isActive: true },
    { id: 'dl-24h', label: '24 hrs', slug: '24-hrs', hours: 24, displayOrder: 3, isActive: true },
    { id: 'dl-48h', label: '48 hrs', slug: '48-hrs', hours: 48, displayOrder: 4, isActive: true },
    { id: 'dl-3d', label: '3 days', slug: '3-days', hours: 72, displayOrder: 5, isActive: true },
    { id: 'dl-4d', label: '4 days', slug: '4-days', hours: 96, displayOrder: 6, isActive: true },
    { id: 'dl-6d', label: '6 days', slug: '6-days', hours: 144, displayOrder: 7, isActive: true },
    { id: 'dl-10d', label: '10 days', slug: '10-days', hours: 240, displayOrder: 8, isActive: true },
    { id: 'dl-20d', label: '20 days', slug: '20-days', hours: 480, displayOrder: 9, isActive: true },
  ],
  paperTypes: [
    { id: 'pt-1', name: 'Essay', slug: 'essay', multiplier: 1.0, displayOrder: 1, isActive: true },
    { id: 'pt-2', name: 'Term Paper', slug: 'term-paper', multiplier: 1.0, displayOrder: 2, isActive: true },
    { id: 'pt-3', name: 'Research Paper', slug: 'research-paper', multiplier: 1.05, displayOrder: 3, isActive: true },
    { id: 'pt-4', name: 'Coursework', slug: 'coursework', multiplier: 1.0, displayOrder: 4, isActive: true },
    { id: 'pt-5', name: 'Case Study', slug: 'case-study', multiplier: 1.1, displayOrder: 5, isActive: true },
    { id: 'pt-6', name: 'Dissertation', slug: 'dissertation', multiplier: 1.3, displayOrder: 6, isActive: true },
    { id: 'pt-7', name: 'Thesis', slug: 'thesis', multiplier: 1.25, displayOrder: 7, isActive: true },
  ],
  services: [
    { id: 'svc-1', title: 'Essay Writing', slug: 'essay-writing' },
    { id: 'svc-2', title: 'Assignment Help', slug: 'assignment-help' },
    { id: 'svc-3', title: 'Dissertation Help', slug: 'dissertation-help' },
    { id: 'svc-4', title: 'Coursework Help', slug: 'coursework-help' },
    { id: 'svc-5', title: 'Research Paper Help', slug: 'research-paper-help' },
    { id: 'svc-6', title: 'Thesis Writing Help', slug: 'thesis-writing-help' },
  ],
  rates: [
    // High School
    { id: 'r-1', levelId: 'lvl-hs', deadlineId: 'dl-3h', pricePerPage: 15.99 },
    { id: 'r-2', levelId: 'lvl-hs', deadlineId: 'dl-12h', pricePerPage: 14.99 },
    { id: 'r-3', levelId: 'lvl-hs', deadlineId: 'dl-24h', pricePerPage: 13.99 },
    { id: 'r-4', levelId: 'lvl-hs', deadlineId: 'dl-48h', pricePerPage: 12.99 },
    { id: 'r-5', levelId: 'lvl-hs', deadlineId: 'dl-3d', pricePerPage: 11.99 },
    { id: 'r-6', levelId: 'lvl-hs', deadlineId: 'dl-4d', pricePerPage: 10.99 },
    { id: 'r-7', levelId: 'lvl-hs', deadlineId: 'dl-6d', pricePerPage: 9.99 },
    { id: 'r-8', levelId: 'lvl-hs', deadlineId: 'dl-10d', pricePerPage: 7.99 },
    { id: 'r-9', levelId: 'lvl-hs', deadlineId: 'dl-20d', pricePerPage: 5.99 },
    // College (High School x 1.25)
    { id: 'r-10', levelId: 'lvl-col', deadlineId: 'dl-3h', pricePerPage: 19.99 },
    { id: 'r-11', levelId: 'lvl-col', deadlineId: 'dl-12h', pricePerPage: 18.74 },
    { id: 'r-12', levelId: 'lvl-col', deadlineId: 'dl-24h', pricePerPage: 17.49 },
    { id: 'r-13', levelId: 'lvl-col', deadlineId: 'dl-48h', pricePerPage: 16.24 },
    { id: 'r-14', levelId: 'lvl-col', deadlineId: 'dl-3d', pricePerPage: 14.99 },
    { id: 'r-15', levelId: 'lvl-col', deadlineId: 'dl-4d', pricePerPage: 13.74 },
    { id: 'r-16', levelId: 'lvl-col', deadlineId: 'dl-6d', pricePerPage: 12.49 },
    { id: 'r-17', levelId: 'lvl-col', deadlineId: 'dl-10d', pricePerPage: 9.99 },
    { id: 'r-18', levelId: 'lvl-col', deadlineId: 'dl-20d', pricePerPage: 7.49 },
    // Undergraduate (College x 1.25)
    { id: 'r-19', levelId: 'lvl-ug', deadlineId: 'dl-3h', pricePerPage: 24.98 },
    { id: 'r-20', levelId: 'lvl-ug', deadlineId: 'dl-12h', pricePerPage: 23.42 },
    { id: 'r-21', levelId: 'lvl-ug', deadlineId: 'dl-24h', pricePerPage: 21.86 },
    { id: 'r-22', levelId: 'lvl-ug', deadlineId: 'dl-48h', pricePerPage: 20.30 },
    { id: 'r-23', levelId: 'lvl-ug', deadlineId: 'dl-3d', pricePerPage: 18.73 },
    { id: 'r-24', levelId: 'lvl-ug', deadlineId: 'dl-4d', pricePerPage: 17.17 },
    { id: 'r-25', levelId: 'lvl-ug', deadlineId: 'dl-6d', pricePerPage: 15.61 },
    { id: 'r-26', levelId: 'lvl-ug', deadlineId: 'dl-10d', pricePerPage: 12.48 },
    { id: 'r-27', levelId: 'lvl-ug', deadlineId: 'dl-20d', pricePerPage: 9.36 },
    // Master (Undergraduate x 1.25)
    { id: 'r-28', levelId: 'lvl-ms', deadlineId: 'dl-3h', pricePerPage: 31.23 },
    { id: 'r-29', levelId: 'lvl-ms', deadlineId: 'dl-12h', pricePerPage: 29.28 },
    { id: 'r-30', levelId: 'lvl-ms', deadlineId: 'dl-24h', pricePerPage: 27.32 },
    { id: 'r-31', levelId: 'lvl-ms', deadlineId: 'dl-48h', pricePerPage: 25.37 },
    { id: 'r-32', levelId: 'lvl-ms', deadlineId: 'dl-3d', pricePerPage: 23.42 },
    { id: 'r-33', levelId: 'lvl-ms', deadlineId: 'dl-4d', pricePerPage: 21.46 },
    { id: 'r-34', levelId: 'lvl-ms', deadlineId: 'dl-6d', pricePerPage: 19.51 },
    { id: 'r-35', levelId: 'lvl-ms', deadlineId: 'dl-10d', pricePerPage: 15.61 },
    { id: 'r-36', levelId: 'lvl-ms', deadlineId: 'dl-20d', pricePerPage: 11.70 },
    // PhD (Master x 1.25)
    { id: 'r-37', levelId: 'lvl-phd', deadlineId: 'dl-3h', pricePerPage: 39.04 },
    { id: 'r-38', levelId: 'lvl-phd', deadlineId: 'dl-12h', pricePerPage: 36.60 },
    { id: 'r-39', levelId: 'lvl-phd', deadlineId: 'dl-24h', pricePerPage: 34.16 },
    { id: 'r-40', levelId: 'lvl-phd', deadlineId: 'dl-48h', pricePerPage: 31.71 },
    { id: 'r-41', levelId: 'lvl-phd', deadlineId: 'dl-3d', pricePerPage: 29.27 },
    { id: 'r-42', levelId: 'lvl-phd', deadlineId: 'dl-4d', pricePerPage: 26.83 },
    { id: 'r-43', levelId: 'lvl-phd', deadlineId: 'dl-6d', pricePerPage: 24.39 },
    { id: 'r-44', levelId: 'lvl-phd', deadlineId: 'dl-10d', pricePerPage: 19.51 },
    { id: 'r-45', levelId: 'lvl-phd', deadlineId: 'dl-20d', pricePerPage: 14.62 },
  ],
};

/**
 * Server Component fetcher for Order Pricing & Calculator with ISR caching & offline fallback.
 */
export async function fetchPublicCalculator(): Promise<PublicCalculatorResponse> {
  try {
    const res = await getPublicCalculator({
      next: { revalidate: 60 },
    });
    if (res && res.config && Array.isArray(res.levels) && res.levels.length > 0) {
      return res;
    }
  } catch {
    // Graceful fallback to default matrix
  }

  return DEFAULT_CALCULATOR_DATA;
}

// ============================================================================
// Top Experts Data & Fetchers
// ============================================================================

export const DEFAULT_EXPERTS: PublicExpert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Alan Crawford',
    slug: 'dr-alan-crawford',
    roleTitle: 'Senior Forensic Accounting & Auditing Specialist',
    university: 'Oxford University',
    degree: 'Ph.D., CPA',
    avatarUrl: '/images/male-expert1.jpg',
    rating: 4.99,
    completedOrders: 1420,
    successRate: '99.8%',
    experienceYears: 10,
    bio: 'Dr. Alan Crawford is a seasoned academic and forensic accounting specialist with over a decade of teaching and practical auditing experience. He holds a Ph.D. from Oxford University and is a certified CPA, specializing in complex ledger reconciliations, forensic audit investigations, and international corporate reporting standards.',
    specialties: ['Forensic Accounting', 'Auditing', 'Corporate Finance', 'IFRS & GAAP'],
    featuredReviewQuote: 'Dr. Crawford helped me master my advanced forensic accounting coursework with unmatched clarity and precision.',
    featuredReviewAuthor: 'David K., Oxford M.Sc. Student',
    isFeatured: true,
    displayOrder: 1,
    status: 'published',
  },
  {
    id: 'exp-2',
    name: 'Dr. Elena Morales',
    slug: 'dr-elena-morales',
    roleTitle: 'Corporate Finance & Econometrics Specialist',
    university: 'LSE (London School of Economics)',
    degree: 'M.Sc., CMA',
    avatarUrl: '/images/female-expert1.jpg',
    rating: 4.98,
    completedOrders: 1150,
    successRate: '99.5%',
    experienceYears: 8,
    bio: 'Dr. Elena Morales combines theoretical rigor with financial market acumen. With credentials from LSE, she specializes in quantitative econometrics, corporate capital structure, derivative pricing, and applied statistical modeling.',
    specialties: ['Corporate Finance', 'Econometrics', 'Financial Modeling', 'Portfolio Management'],
    featuredReviewQuote: 'Elena broke down our econometrics regression models step-by-step. Scored top marks in our cohort!',
    featuredReviewAuthor: 'Sophia M., LSE Graduate',
    isFeatured: true,
    displayOrder: 2,
    status: 'published',
  },
  {
    id: 'exp-3',
    name: 'Prof. David Sterling',
    slug: 'prof-david-sterling',
    roleTitle: 'Computer Science, AI & Systems Architect',
    university: 'MIT / Stanford University',
    degree: 'Ph.D., AI Systems',
    avatarUrl: '/images/male-expert2.jpg',
    rating: 4.99,
    completedOrders: 1840,
    successRate: '99.9%',
    experienceYears: 12,
    bio: 'Prof. David Sterling is an expert in computational intelligence, distributed cloud systems, and algorithmic development. Holding a Ph.D. in AI Systems, he has mentored hundreds of students through complex software engineering, neural networks, and algorithmic problem sets.',
    specialties: ['Computer Science', 'Python & AI', 'Machine Learning', 'Data Structures', 'Cloud Systems'],
    featuredReviewQuote: 'David’s code was clean, fully commented, and passed every automated unit test suite effortlessly.',
    featuredReviewAuthor: 'James R., Stanford CS Senior',
    isFeatured: true,
    displayOrder: 3,
    status: 'published',
  },
  {
    id: 'exp-4',
    name: 'Dr. Sarah Jenkins',
    slug: 'dr-sarah-jenkins',
    roleTitle: 'Behavioral Psychology & Healthcare Specialist',
    university: 'University of Queensland',
    degree: 'Ph.D., Clinical Psychology',
    avatarUrl: '/images/female-expert2.jpg',
    rating: 4.97,
    completedOrders: 980,
    successRate: '99.4%',
    experienceYears: 7,
    bio: 'Dr. Sarah Jenkins specializes in clinical psychology, public healthcare administration, and empirical qualitative analysis. She provides structured mentorship in research methodology, clinical trial designs, and behavioral health diagnostics.',
    specialties: ['Behavioral Psychology', 'Healthcare Management', 'Clinical Research', 'Cognitive Neuroscience'],
    featuredReviewQuote: 'Her guidance through my healthcare capstone thesis was incredible. Thoughtful, empathetic, and academically impeccable.',
    featuredReviewAuthor: 'Emily T., UQ Healthcare Student',
    isFeatured: true,
    displayOrder: 4,
    status: 'published',
  },
  {
    id: 'exp-5',
    name: 'Dr. Marcus Vance',
    slug: 'dr-marcus-vance',
    roleTitle: 'Pure & Applied Mathematics Specialist',
    university: 'Florida International University',
    degree: 'Ph.D., Pure & Applied Mathematics',
    avatarUrl: '/images/male-expert1.jpg',
    rating: 4.99,
    completedOrders: 1210,
    successRate: '99.7%',
    experienceYears: 9,
    bio: 'Dr. Marcus Vance holds a doctorate in Pure and Applied Mathematics. His domain spans discrete mathematical logic, algebraic geometry, cryptographic algorithms, and multi-variable calculus problem sets.',
    specialties: ['Mathematics', 'Advanced Calculus', 'Cryptography', 'Linear Algebra', 'Differential Equations'],
    featuredReviewQuote: 'Marcus transformed my fear of advanced differential equations into pure confidence. Outstanding tutor.',
    featuredReviewAuthor: 'Liam B., FIU Mathematics Major',
    isFeatured: true,
    displayOrder: 5,
    status: 'published',
  },
  {
    id: 'exp-6',
    name: 'Dr. Rachel Kim',
    slug: 'dr-rachel-kim',
    roleTitle: 'Biochemistry & Molecular Analysis Specialist',
    university: 'American University of the Middle East',
    degree: 'Ph.D., Organic Chemistry',
    avatarUrl: '/images/female-expert1.jpg',
    rating: 4.98,
    completedOrders: 890,
    successRate: '99.6%',
    experienceYears: 6,
    bio: 'Dr. Rachel Kim is an active researcher in molecular synthesis and bio-organic mechanisms. She assists students across collegiate chemistry, biochemical kinetics, NMR spectroscopy, and laboratory paper formulations.',
    specialties: ['Biochemistry', 'Organic Chemistry', 'Molecular Biology', 'Spectroscopic Analysis'],
    featuredReviewQuote: 'Rachel made organic synthesis retro-analysis crystal clear. Her annotated diagrams were lifesavers.',
    featuredReviewAuthor: 'Amina S., AUM Pre-Med Student',
    isFeatured: true,
    displayOrder: 6,
    status: 'published',
  },
];

export const TOP_EXPERTS_FAQS: PublicFaqItem[] = [
  {
    question: 'How are ReadEssay academic experts vetted and selected?',
    answer:
      'Every expert undergoes a rigorous multi-stage credentialing process: verified Ph.D. or Master’s degrees from top accredited global universities, a proctored subject proficiency examination, and an initial probation period with dual-audited deliverables.',
  },
  {
    question: 'Can I communicate directly with my assigned expert?',
    answer:
      'Yes! Through our dedicated academic dashboard and 24/7 WhatsApp concierge desk, you can relay lecture notes, professor rubrics, and feedback directly to your assigned expert in real-time.',
  },
  {
    question: 'What happens if my professor requests revisions on the coursework?',
    answer:
      'All deliverables come with unlimited complimentary revisions. Submit your professor’s amendment notes within your revision window, and your expert will refine the work to perfection within 12 to 24 hours.',
  },
  {
    question: 'Are deliverables guaranteed to be original and AI-free?',
    answer:
      '100%. Every paper is crafted entirely from scratch. Before release, it passes our internal Turnitin non-repository similarity and AI-detection filters, ensuring a 0% AI index and complete originality with an audit certificate.',
  },
  {
    question: 'How do I connect with a specific specialist from the directory?',
    answer:
      'View the specialist’s profile to review their research background and academic credentials, or reach out to our 24/7 academic coordinators via WhatsApp or Live Chat to request priority matching with that scholar.',
  },
];

/**
 * Server Component fetcher for Top Experts with ISR caching & offline fallback.
 */
export async function fetchPublicExperts(params?: {
  featured?: boolean;
  specialty?: string;
}): Promise<PublicExpert[]> {
  try {
    const data = await getPublicExperts(params, {
      next: { revalidate: 60, tags: ['experts'] },
    });
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('fetchPublicExperts: Failed to fetch from API, falling back to defaults:', err);
  }

  let list = [...DEFAULT_EXPERTS];
  if (params?.featured) {
    list = list.filter((e) => e.isFeatured);
  }
  if (params?.specialty) {
    const s = params.specialty.toLowerCase();
    list = list.filter((e) =>
      e.specialties.some((spec) => spec.toLowerCase().includes(s)),
    );
  }
  return list;
}

/**
 * Server Component fetcher for a single Expert by slug.
 */
export async function fetchExpertBySlug(slug: string): Promise<PublicExpert | null> {
  try {
    const expert = await getPublicExpertBySlug(slug, {
      next: { revalidate: 60, tags: [`expert-${slug}`] },
    });
    if (expert && expert.slug) {
      return expert;
    }
  } catch (err) {
    console.warn(`fetchExpertBySlug: Failed to fetch "${slug}" from API, checking defaults:`, err);
  }

  return DEFAULT_EXPERTS.find((e) => e.slug === slug) || null;
}


