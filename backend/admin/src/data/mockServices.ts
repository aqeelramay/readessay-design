export type ServiceStatus = "active" | "draft" | "archived";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalSlug?: string;
}

export interface MainService {
  id: string;
  icon: string;
  name: string;
  slug: string;
  shortIntro: string;
  heroTagline: string;
  heroH1: string;
  heroSummary: string;
  faqs: FAQItem[];
  status: ServiceStatus;
  displayOrder: number;
  updatedAt: string;
  seo: ServiceSEO;
}

export type AccentColor = "orange" | "green" | "navy";

export interface SolutionCard {
  id: string;
  icon: string;
  accent: AccentColor;
  title: string;
  description: string;
}

export interface AcademicLevel {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface AccountabilityPillar {
  id: string;
  icon: string;
  accent: AccentColor;
  title: string;
  description: string;
}

export interface FeaturedExpert {
  id: string;
  name: string;
  credentials: string;
  experienceLine: string;
  rating: string;
  papersDelivered: string;
  verified: boolean;
}

export interface SubServiceSpecializedAssistance {
  tagline: string;
  heading: string;
  bodyParagraphs: string;
  ctaLabel: string;
  ctaUrl: string;
  youtubeUrl: string;
}

export interface SubServiceDetailedSolutions {
  tagline: string;
  heading: string;
  intro: string;
  cards: SolutionCard[];
}

export interface SubServiceAcademicFields {
  tagline: string;
  heading: string;
  intro: string;
  levels: AcademicLevel[];
}

export interface SubServiceAccountability {
  tagline: string;
  heading: string;
  intro: string;
  pillars: AccountabilityPillar[];
  featuredExperts: FeaturedExpert[];
}

export interface SubServiceFAQSection {
  tagline: string;
  heading: string;
  intro: string;
  items: FAQItem[];
}

export interface SubService {
  id: string;
  parentId: string; // References MainService.id
  name: string;
  slug: string;
  shortIntro: string;
  status: ServiceStatus;
  displayOrder: number;
  updatedAt: string;

  // Hero Section
  heroTagline: string;
  heroH1: string;
  heroSummary: string;

  // Specialized Assistance & Video Section
  specializedAssistance: SubServiceSpecializedAssistance;

  // Detailed Solutions Section (repeatable cards, e.g. 5 sub-discipline cards)
  detailedSolutions: SubServiceDetailedSolutions;

  // Respective Academic Fields Section (3-column academic level cards)
  academicFields: SubServiceAcademicFields;

  // Task Helpers Accountability & Featured Experts Section
  accountabilitySection: SubServiceAccountability;

  // Page FAQs Section
  faqSection: SubServiceFAQSection;

  // SEO Metadata
  seo: ServiceSEO;
}

/**
 * 6 Realistic Top-Level Parent Services (Informational / Academic Content Only)
 */
export const INITIAL_MAIN_SERVICES: MainService[] = [
  {
    id: "serv-assignment-help",
    icon: "BookOpen",
    name: "Assignment Help",
    slug: "assignment-help",
    shortIntro:
      "Structured academic assignment support across core university disciplines and marking rubrics.",
    heroTagline: "Comprehensive Subject Specializations",
    heroH1:
      "Explore Our Assignment Help Services Across 26 Core Disciplines & Universities",
    heroSummary:
      "Browse our specialized assignment solutions tailored for undergraduate, postgraduate, and university-specific curricula.",
    faqs: [
      {
        id: "faq-1",
        question: "How do your academic specialists approach complex coursework rubrics?",
        answer:
          "Each assignment brief is matched with an academic possessing advanced degree qualifications in that exact discipline. They analyze the university grading rubric, lecture notes, and learning outcomes to construct a structured response.",
      },
      {
        id: "faq-2",
        question: "Can I provide proprietary dataset files or institutional case studies?",
        answer:
          "Yes. Academic specialists can work with proprietary datasets, institutional case studies, and university-provided slide decks to ensure the resulting analysis mirrors course expectations.",
      },
      {
        id: "faq-3",
        question: "What citation and bibliographic styles are supported?",
        answer:
          "All major academic citation frameworks are fully supported, including APA 7th, Harvard, Chicago 17th, MLA 9th, OSCOLA for law, and IEEE for engineering and computer science.",
      },
    ],
    seo: {
      metaTitle: "Assignment Help & Academic Writing Guidance | ReadEssay",
      metaDescription:
        "Get professional university assignment assistance and research guidance from vetted subject-matter academics. 100% original, rubric-aligned scholarship.",
      canonicalSlug: "assignment-help",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "serv-dissertation-thesis",
    icon: "GraduationCap",
    name: "Dissertation & Thesis Help",
    slug: "dissertation-thesis-help",
    shortIntro:
      "Doctoral and Master's thesis research guidance, methodology frameworks, and chapter drafting.",
    heroTagline: "Advanced Postgraduate Research",
    heroH1:
      "Master's & PhD Dissertation Guidance Across Empirical and Theoretical Frameworks",
    heroSummary:
      "Partner with doctoral consultants to formulate rigorous research methodologies, conduct systematic literature reviews, and analyze empirical findings.",
    faqs: [
      {
        id: "faq-1",
        question: "Can assistance be provided for specific individual chapters?",
        answer:
          "Yes. Candidates can request guidance for single chapters such as the Literature Review, Methodology Framework, or Data Analysis and Findings.",
      },
      {
        id: "faq-2",
        question: "How is research ethics and participant confidentiality handled?",
        answer:
          "All research methodology advice strictly conforms to university ethics committee requirements, including participant consent protocols and data anonymization standards.",
      },
    ],
    seo: {
      metaTitle: "Dissertation & Master's Thesis Research Support | ReadEssay",
      metaDescription:
        "Postgraduate dissertation and thesis research guidance from PhD-level academics. Methodological design, literature reviews, and empirical analysis.",
      canonicalSlug: "dissertation-thesis-help",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-08",
  },
  {
    id: "serv-essay-writing",
    icon: "FileText",
    name: "Essay Writing Service",
    slug: "essay-writing-service",
    shortIntro:
      "Custom scholarly essays, argumentative papers, critical reflections, and admissions essays.",
    heroTagline: "Analytical & Argumentative Scholarship",
    heroH1:
      "Tailored University Essay Writing Guidance Across Disciplines and Pedagogies",
    heroSummary:
      "Develop structured academic arguments, synthesize peer-reviewed literature, and ensure strict citation integrity.",
    faqs: [
      {
        id: "faq-1",
        question: "What types of academic essays are supported?",
        answer:
          "Our academics support argumentative, analytical, expository, reflective, admissions, and narrative academic essays.",
      },
    ],
    seo: {
      metaTitle: "Academic Essay Writing & Critical Analysis | ReadEssay",
      metaDescription:
        "Professional scholarly essay writing and critical evaluation support. Vetted academics, rigorous citation standards, and verified originality.",
      canonicalSlug: "essay-writing-service",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-09",
  },
  {
    id: "serv-coursework-homework",
    icon: "ClipboardList",
    name: "Coursework & Homework Help",
    slug: "coursework-homework-help",
    shortIntro:
      "Modular continuous assessment support, problem sets, case briefs, and lab write-ups.",
    heroTagline: "Continuous Assessment & Problem Sets",
    heroH1:
      "Comprehensive Modular Coursework Solutions and Problem-Solving Assistance",
    heroSummary:
      "Master weekly problem sets, legal case briefs, and laboratory reports with step-by-step analytical derivations.",
    faqs: [
      {
        id: "faq-1",
        question: "Can you assist with weekly seminar tasks and continuous homework?",
        answer:
          "Yes, we provide ongoing modular assistance matching weekly syllabus milestones and problem sheet requirements.",
      },
    ],
    seo: {
      metaTitle: "University Coursework & Homework Support | ReadEssay",
      metaDescription:
        "Structured coursework problem solving, laboratory reports, and seminar exercises across undergraduate and graduate degrees.",
      canonicalSlug: "coursework-homework-help",
    },
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-05",
  },
  {
    id: "serv-research-paper",
    icon: "Microscope",
    name: "Research Paper Writing",
    slug: "research-paper-writing",
    shortIntro:
      "Empirical research papers, journal articles, conceptual frameworks, and systematic literature reviews.",
    heroTagline: "Peer-Reviewed & Journal Standards",
    heroH1:
      "Scholarly Research Paper Drafting & Journal Submission Preparation",
    heroSummary:
      "Manuscript drafting, statistical reporting, and author guideline compliance designed for peer-reviewed academic publication.",
    faqs: [
      {
        id: "faq-1",
        question: "Do you format manuscripts according to specific journal author guidelines?",
        answer:
          "Yes. We format manuscripts strictly according to target journal submission guidelines, including typography, section headers, and reference styles.",
      },
    ],
    seo: {
      metaTitle: "Scholarly Research Paper Writing & Journal Prep | ReadEssay",
      metaDescription:
        "Academic research paper drafting, peer-reviewed literature reviews, and journal submission preparation support.",
      canonicalSlug: "research-paper-writing",
    },
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-07",
  },
  {
    id: "serv-editing-proofreading",
    icon: "CheckCircle2",
    name: "Editing & Proofreading",
    slug: "editing-proofreading",
    shortIntro:
      "Rigorous academic proofreading, syntax refinement, structural critiquing, and citation audits.",
    heroTagline: "Linguistic Rigor & Academic Tone",
    heroH1:
      "Professional Academic Proofreading, Style Enhancement & Referencing Audits",
    heroSummary:
      "Elevate the clarity, academic tone, and referencing compliance of your dissertations, manuscripts, and coursework papers.",
    faqs: [
      {
        id: "faq-1",
        question: "Do you provide tracked changes with Microsoft Word?",
        answer:
          "Yes. All editing is delivered with tracked changes and marginal comments, accompanied by a clean finalized manuscript.",
      },
    ],
    seo: {
      metaTitle: "Academic Proofreading & Editing Services | ReadEssay",
      metaDescription:
        "Professional academic editing and proofreading for dissertations, theses, and journal articles. Syntax, clarity, and citation checks.",
      canonicalSlug: "editing-proofreading",
    },
    status: "active",
    displayOrder: 6,
    updatedAt: "2026-11-11",
  },
];

/**
 * 17 Realistic Sub-Services Mapped Across Parent Services
 */
export const INITIAL_SUB_SERVICES: SubService[] = [
  // 1. Accounting Assignment Help (serv-assignment-help)
  {
    id: "sub-accounting-assignment",
    parentId: "serv-assignment-help",
    name: "Accounting Assignment Help",
    slug: "accounting-assignment-help",
    shortIntro:
      "Professional university accounting assignment assistance across managerial accounting, financial reporting, corporate taxation, and statutory audit problem sets.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
    heroTagline: "Professional Academic Financial Guidance",
    heroH1:
      "Professional Accounting & Financial Reporting Assignment Help for University Students",
    heroSummary:
      "Master complex balance sheets, ledger reconciliations, cash-flow statements, and IFRS/GAAP standards with step-by-step analytical breakdowns.",
    specializedAssistance: {
      tagline: "Methodological Rigor & Technical Precision",
      heading:
        "Specialized Accounting Assistance Built Upon Exact Institutional Rubrics",
      bodyParagraphs:
        "Navigating advanced university accounting coursework requires balancing conceptual standards with granular numerical accuracy. Our specialized accounting educators assist undergraduate and postgraduate scholars through complex financial statements, corporate taxation calculations, managerial cost allocations, and statutory auditing case studies.\n\nEvery assignment solution includes complete double-entry ledger trails, formula-annotated calculation tables, and contextual business analysis memos that explain the strategic implications behind every number.",
      ctaLabel: "Explore Accounting Solutions",
      ctaUrl: "/services/sub-services/accounting-assignment-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Core Disciplinary Breakdown",
      heading: "Targeted Accounting Problem-Solving Across 5 Core Fields",
      intro:
        "From entry-level journal vouchers to advanced corporate valuations, our specialists handle every accounting sub-discipline with verified calculation accuracy.",
      cards: [
        {
          id: "sol-1",
          icon: "Calculator",
          accent: "orange",
          title: "Cost & Management Systems",
          description:
            "Activity-Based Costing (ABC), standard cost variance analysis, CVP break-even computations, and budgeting models.",
        },
        {
          id: "sol-2",
          icon: "FileText",
          accent: "green",
          title: "Corporate & International Taxation",
          description:
            "Statutory tax return simulations, capital allowances, deferred tax liabilities, and multinational transfer pricing computations.",
        },
        {
          id: "sol-3",
          icon: "TrendingUp",
          accent: "navy",
          title: "Financial Accounting & Reporting",
          description:
            "IFRS & GAAP compliance, consolidated group accounts, cash-flow statements, and comprehensive ratio analyses.",
        },
        {
          id: "sol-4",
          icon: "Search",
          accent: "orange",
          title: "Forensic Accounting & Fraud Auditing",
          description:
            "Investigative audit trails, Benford's Law tests, whistleblower case evaluations, and financial misconduct assessments.",
        },
        {
          id: "sol-5",
          icon: "CheckCircle2",
          accent: "green",
          title: "Statutory Auditing & Assurance",
          description:
            "ISA-compliant audit risk matrices, substantive testing programs, internal control reviews, and audit opinion write-ups.",
        },
      ],
    },
    academicFields: {
      tagline: "Universal Curriculum Coverage",
      heading: "Structured Accounting Guidance by Academic Level",
      intro:
        "Our assistance adapts strictly to the expectations, marking criteria, and academic rigor demanded by each qualification tier.",
      levels: [
        {
          id: "lvl-1",
          badge: "School",
          title: "High & Public Held Schools",
          description:
            "Foundational bookkeeping, introductory debit/credit ledgers, basic profit-and-loss sheets, and introductory business studies coursework.",
          highlighted: false,
        },
        {
          id: "lvl-2",
          badge: "Colleges",
          title: "Graded Colleges & Universities",
          description:
            "Intermediate financial accounting, cost allocations, corporate tax filings, working capital management, and semester-long accounting group projects.",
          highlighted: true,
        },
        {
          id: "lvl-3",
          badge: "Post-Grad & PhD",
          title: "Post-Graduates & Ph.D. Programs",
          description:
            "Advanced econometric accounting models, capital markets research, empirical IFRS impact assessments, and doctoral thesis methodologies.",
          highlighted: false,
        },
      ],
    },
    accountabilitySection: {
      tagline: "Verifiable Quality Standards",
      heading: "Accountability, Quality Safeguards & Featured Accounting Specialists",
      intro:
        "Every deliverable is scrutinized against rigorous accuracy protocols and authored by credentialed accounting practitioners.",
      pillars: [
        {
          id: "pil-1",
          icon: "ShieldCheck",
          accent: "orange",
          title: "100% Numerical Accuracy Guarantee",
          description:
            "All balance sheets, ledger entries, and tax computations undergo double verification with formula-checked workpapers.",
        },
        {
          id: "pil-2",
          icon: "BookOpen",
          accent: "green",
          title: "Full Institutional Standard Alignment",
          description:
            "Strict adherence to IFRS, US GAAP, AASB, and UK FRS 102 accounting frameworks as specified by your course brief.",
        },
        {
          id: "pil-3",
          icon: "Award",
          accent: "navy",
          title: "Original Scholarship & Academic Integrity",
          description:
            "Every narrative memorandum and critical evaluation is custom-authored from scratch with full bibliographic transparency.",
        },
      ],
      featuredExperts: [
        {
          id: "exp-1",
          name: "Dr. Alan Crawford, Ph.D., CPA",
          credentials: "Ph.D. in Accounting (LSE), Certified Public Accountant",
          experienceLine:
            "14+ years academic mentoring • Specialization in IFRS Consolidation & Financial Instruments",
          rating: "4.98",
          papersDelivered: "840+ Accounting Papers Delivered",
          verified: true,
        },
        {
          id: "exp-2",
          name: "Prof. Maya Chen, M.Acc, ACCA Fellow",
          credentials: "Master of Accountancy (Melbourne), FCCA",
          experienceLine:
            "11+ years university lecturing • Specialization in Corporate Tax Strategy & Forensic Auditing",
          rating: "4.96",
          papersDelivered: "620+ Accounting Papers Delivered",
          verified: true,
        },
        {
          id: "exp-3",
          name: "David R. Sterling, MBA, CIMA",
          credentials: "MBA Finance (Warwick), Chartered Management Accountant",
          experienceLine:
            "9+ years corporate financial advisory • Specialization in Activity-Based Costing & CVP Models",
          rating: "4.94",
          papersDelivered: "510+ Accounting Papers Delivered",
          verified: true,
        },
      ],
    },
    faqSection: {
      tagline: "Client Inquiries",
      heading: "Frequently Asked Questions About Accounting Support",
      intro:
        "Clear answers on spreadsheet deliveries, formula annotations, deadline management, and accounting standards.",
      items: [
        {
          id: "faq-acc-1",
          question:
            "Do your accounting deliverables include working Excel spreadsheets with live formulas?",
          answer:
            "Yes. Every quantitative accounting assignment includes an unencrypted, fully formula-annotated Microsoft Excel spreadsheet alongside the formal academic paper or executive report.",
        },
        {
          id: "faq-acc-2",
          question:
            "Can your accounting team work with regional frameworks like US GAAP or UK FRS 102?",
          answer:
            "Yes. Our team includes CPAs and ACCA-qualified academics experienced in US GAAP, IFRS, UK FRS 102, and Australian Accounting Standards (AASB).",
        },
        {
          id: "faq-acc-3",
          question:
            "How do specialists handle proprietary company annual reports or case study packets?",
          answer:
            "You can upload corporate 10-K filings, annual report PDFs, or Harvard Business School case packets. Specialists extract the exact data needed for ratio analysis and valuation.",
        },
        {
          id: "faq-acc-4",
          question:
            "What checks ensure the numerical balance sheet actually balances?",
          answer:
            "Every solution undergoes an automated and peer balance-check protocol before delivery to ensure that the balance sheet equation (Assets = Liabilities + Equity) balances without reconciliation plugs.",
        },
      ],
    },
    seo: {
      metaTitle: "Accounting Assignment Help & Financial Reporting | ReadEssay",
      metaDescription:
        "University accounting assignment assistance. IFRS, managerial accounting, financial ratios, and balance sheet calculations from credentialed CPAs.",
      canonicalSlug: "accounting-assignment-help",
    },
  },

  // 2. Corporate Finance Assignment Help
  {
    id: "sub-corporate-finance",
    parentId: "serv-assignment-help",
    name: "Corporate Finance Assignment Help",
    slug: "corporate-finance-assignment-help",
    shortIntro:
      "Capital budgeting, discounted cash flow valuation, financial statement ratios, and portfolio risk management.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-11",
    heroTagline: "Advanced Financial Valuation & Corporate Strategy",
    heroH1: "Corporate Finance & Capital Structure Assignment Guidance",
    heroSummary:
      "Master DCF valuations, WACC calculations, M&A simulations, and portfolio risk models with verified mathematical derivations.",
    specializedAssistance: {
      tagline: "Empirical Valuation",
      heading: "Rigorous Valuation Modeling & Capital Budgeting Solutions",
      bodyParagraphs:
        "Corporate finance demands seamless integration of capital asset pricing theories with pragmatic financial calculations. Our finance consultants support students through weighted average cost of capital derivations, capital structure trade-off models, and corporate restructuring case papers.\n\nEvery submission is delivered with fully annotated DCF sensitivity tables, Monte Carlo risk models, and board-level executive briefing summaries.",
      ctaLabel: "View Corporate Finance Solutions",
      ctaUrl: "/services/sub-services/corporate-finance-assignment-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Core Financial Modules",
      heading: "Corporate Finance Solutions Across Key Modules",
      intro: "Step-by-step problem sets and financial modeling across university finance curricula.",
      cards: [
        { id: "cf-1", icon: "TrendingUp", accent: "orange", title: "DCF & Valuation Modeling", description: "Multi-stage discounted cash flow, terminal value calculations, and Gordon Growth models." },
        { id: "cf-2", icon: "Calculator", accent: "green", title: "Cost of Capital & WACC", description: "Cost of equity (CAPM), after-tax cost of debt, and capital structure optimization." },
        { id: "cf-3", icon: "Briefcase", accent: "navy", title: "M&A & Leveraged Buyouts", description: "Accretion/dilution analysis, LBO debt schedules, and corporate synergy evaluations." },
        { id: "cf-4", icon: "ShieldCheck", accent: "orange", title: "Portfolio Risk & CAPM", description: "Beta estimation, Sharpe ratios, Value at Risk (VaR), and Markowitz efficient frontier." },
      ],
    },
    academicFields: {
      tagline: "Qualification Tiers",
      heading: "Corporate Finance Support Across University Levels",
      intro: "Tailored to finance syllabi from introductory undergraduate principles to Master's in Finance programs.",
      levels: [
        { id: "cfl-1", badge: "Undergrad", title: "Introductory Corporate Finance", description: "Time value of money, bond and equity valuations, and basic capital budgeting rules (NPV/IRR).", highlighted: false },
        { id: "cfl-2", badge: "Colleges", title: "Advanced Corporate Financial Policy", description: "Dividend policy, capital structure irrelevance (Modigliani-Miller), and financial distress costs.", highlighted: true },
        { id: "cfl-3", badge: "Master's & PhD", title: "Postgraduate & Applied Finance", description: "Empirical asset pricing, derivative hedging strategies, and econometric finance coursework.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Academic Quality",
      heading: "Finance Quality Assurance & Subject Consultants",
      intro: "All models are vetted by charterholders and finance doctoral researchers.",
      pillars: [
        { id: "cfp-1", icon: "ShieldCheck", accent: "orange", title: "Formula Transparency", description: "Live formulas retained across all Excel financial worksheets." },
        { id: "cfp-2", icon: "BookOpen", accent: "green", title: "Theory Alignment", description: "Precise connection between numerical findings and financial theories." },
        { id: "cfp-3", icon: "Award", accent: "navy", title: "Academic Originality", description: "Custom analysis without recycled case study templates." },
      ],
      featuredExperts: [
        { id: "cfe-1", name: "Dr. Marcus Vance, CFA, Ph.D.", credentials: "Ph.D. in Financial Economics (Columbia)", experienceLine: "12+ years investment banking & academic tutoring", rating: "4.99", papersDelivered: "740+ Finance Papers", verified: true },
        { id: "cfe-2", name: "Elena Rostova, M.Sc., CFA", credentials: "Master of Science in Mathematical Finance (Imperial)", experienceLine: "8+ years financial modeling specialist", rating: "4.95", papersDelivered: "490+ Finance Papers", verified: true },
      ],
    },
    faqSection: {
      tagline: "Finance Questions",
      heading: "Frequently Asked Questions About Corporate Finance Help",
      intro: "Key questions regarding financial modeling, datasets, and terminal metrics.",
      items: [
        { id: "cff-1", question: "Can you analyze Bloomberg terminal exports?", answer: "Yes, our team works with Bloomberg, FactSet, and Refinitiv datasets." },
        { id: "cff-2", question: "Do you provide sensitivity tables for DCF models?", answer: "Yes, every DCF model includes two-way sensitivity data tables for discount rates and terminal growth rates." },
      ],
    },
    seo: {
      metaTitle: "Corporate Finance Assignment Help & DCF Modeling | ReadEssay",
      metaDescription: "Postgraduate and undergraduate corporate finance assignment assistance. Capital budgeting, DCF valuation, and portfolio risk analysis.",
      canonicalSlug: "corporate-finance-assignment-help",
    },
  },

  // 3. Nursing & Healthcare Assignment Help
  {
    id: "sub-nursing-healthcare",
    parentId: "serv-assignment-help",
    name: "Nursing & Healthcare Assignment Help",
    slug: "nursing-healthcare-assignment-help",
    shortIntro: "Evidence-based nursing practice papers, clinical case studies, patient care plans, and health informatics.",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-10",
    heroTagline: "Clinical Evidence & Patient-Centered Care",
    heroH1: "Evidence-Based Nursing & Clinical Healthcare Assignment Support",
    heroSummary: "Bridging healthcare theory with clinical practice guidelines, PICOT questions, care plans, and ethical governance audits.",
    specializedAssistance: {
      tagline: "Clinical Governance",
      heading: "Evidence-Based Nursing Solutions Built Upon Regulatory Guidelines",
      bodyParagraphs: "Nursing assignments require balancing academic scholarship with patient safety protocols and clinical care taxonomies. Our healthcare consultants hold active clinical or postgraduate nursing qualifications.\n\nWe assist students with holistic nursing care plans, epidemiological assessments, healthcare policy evaluations, and reflection on professional practice.",
      ctaLabel: "View Nursing Services",
      ctaUrl: "/services/sub-services/nursing-healthcare-assignment-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Nursing Modules",
      heading: "Clinical & Healthcare Support Modules",
      intro: "Guidance across patient care plans, clinical governance, and evidence-based reviews.",
      cards: [
        { id: "nur-1", icon: "HeartPulse", accent: "orange", title: "Evidence-Based Practice (EBP)", description: "PICOT question formulation, systematic search protocols, and clinical appraisal." },
        { id: "nur-2", icon: "FileText", accent: "green", title: "Nursing Care Plans", description: "NANDA-I nursing diagnoses, NOC outcomes, and NIC interventions." },
        { id: "nur-3", icon: "ShieldCheck", accent: "navy", title: "Clinical Ethics & Governance", description: "Patient autonomy, informed consent, clinical error reporting, and legal accountability." },
        { id: "nur-4", icon: "Search", accent: "orange", title: "Public Health & Epidemiology", description: "Health determinants, disease prevention models, and healthcare policy critiques." },
      ],
    },
    academicFields: {
      tagline: "Education Levels",
      heading: "Nursing Education Level Specialization",
      intro: "Aligned to national nursing frameworks (NMC, AACN, NMBA).",
      levels: [
        { id: "nl-1", badge: "Diploma / BSN", title: "Undergraduate Nursing", description: "Foundational pharmacology, anatomy, patient communication, and basic clinical reflections.", highlighted: false },
        { id: "nl-2", badge: "Colleges", title: "Pre-Registration & BSN Honours", description: "Complex pathophysiological case studies, evidence-based care bundles, and leadership papers.", highlighted: true },
        { id: "nl-3", badge: "MSN / DNP", title: "Advanced Practice & Doctorate", description: "Advanced clinical practice guidelines, healthcare informatics, and nursing doctoral dissertations.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Clinical Integrity",
      heading: "Healthcare Quality Assurance & Certified Mentors",
      intro: "Authored by credentialed nursing practitioners and medical academics.",
      pillars: [
        { id: "np-1", icon: "ShieldCheck", accent: "orange", title: "Regulatory Alignment", description: "Strict compliance with NMC (UK), AACN (US), and NMBA guidelines." },
        { id: "np-2", icon: "BookOpen", accent: "green", title: "Peer-Reviewed Evidence", description: "Referenced against CINAHL, PubMed, and Cochrane library databases." },
        { id: "np-3", icon: "Award", accent: "navy", title: "Patient Anonymity", description: "Strict GDPR and HIPAA compliance for all simulated patient scenarios." },
      ],
      featuredExperts: [
        { id: "ne-1", name: "Dr. Sarah Jenkins, DNP, RN", credentials: "Doctor of Nursing Practice (King's College London)", experienceLine: "15+ years clinical education & healthcare governance", rating: "4.97", papersDelivered: "890+ Nursing Papers", verified: true },
        { id: "ne-2", name: "Rebecca Thorne, MSN, APRN", credentials: "Master of Science in Nursing (Johns Hopkins)", experienceLine: "10+ years critical care mentoring", rating: "4.95", papersDelivered: "610+ Nursing Papers", verified: true },
      ],
    },
    faqSection: {
      tagline: "Nursing Inquiries",
      heading: "Frequently Asked Questions About Nursing Coursework",
      intro: "Common questions on nursing frameworks, patient cases, and reflection models.",
      items: [
        { id: "nf-1", question: "Do you use recognized nursing diagnosis taxonomies?", answer: "Yes, we implement NANDA-I, NIC, and NOC standardized clinical terminology." },
        { id: "nf-2", question: "Are recent peer-reviewed nursing articles cited?", answer: "All literature is sourced from high-impact nursing journals published within the last 5 years." },
      ],
    },
    seo: {
      metaTitle: "Nursing & Healthcare Assignment Help | ReadEssay",
      metaDescription: "Evidence-based nursing assignment guidance. Clinical case studies, PICOT questions, and patient care plans aligned with healthcare standards.",
      canonicalSlug: "nursing-healthcare-assignment-help",
    },
  },

  // 4. Business Management Assignment Help
  {
    id: "sub-business-management",
    parentId: "serv-assignment-help",
    name: "Business Management Assignment Help",
    slug: "business-management-assignment-help",
    shortIntro: "Strategic SWOT/PESTLE evaluations, organizational behavior case papers, and operational management models.",
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-09",
    heroTagline: "Strategic Leadership & Operations Analysis",
    heroH1: "Business Management Coursework & Corporate Strategy Solutions",
    heroSummary: "Synthesizing strategic management frameworks, organizational behavior, supply chain models, and MBA case studies.",
    specializedAssistance: {
      tagline: "Strategic Advisory",
      heading: "Actionable Business Strategy & Management Coursework",
      bodyParagraphs: "Modern business education synthesizes competitive positioning frameworks with human capital leadership principles. Our business educators support undergraduate and MBA candidates in analyzing corporate case studies.\n\nWe apply Porter's Five Forces, VRIO matrices, Kotter's change models, and Lean supply chain theories to deliver rigorous executive papers.",
      ctaLabel: "View Business Solutions",
      ctaUrl: "/services/sub-services/business-management-assignment-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Discipline Breakdown",
      heading: "Business Management Modules Supported",
      intro: "Comprehensive coverage of strategic and operational management curricula.",
      cards: [
        { id: "bm-1", icon: "TrendingUp", accent: "orange", title: "Strategic Management", description: "Porter's Five Forces, PESTLE, Blue Ocean strategy, and VRIO internal resource auditing." },
        { id: "bm-2", icon: "Briefcase", accent: "green", title: "Organizational Behavior", description: "Transformational leadership, team dynamics, and Lewin/Kotter change management models." },
        { id: "bm-3", icon: "Layers", accent: "navy", title: "Supply Chain & Operations", description: "Just-In-Time (JIT), Six Sigma quality control, and global value chain optimization." },
        { id: "bm-4", icon: "Award", accent: "orange", title: "Corporate Governance & CSR", description: "Stakeholder theory, ESG corporate reporting, and ethical decision-making frameworks." },
      ],
    },
    academicFields: {
      tagline: "Academic Tiers",
      heading: "Business Coursework by Program Level",
      intro: "From undergraduate business diplomas to executive MBA coursework.",
      levels: [
        { id: "bml-1", badge: "Undergrad", title: "Undergraduate Business Studies", description: "Foundational marketing, organizational principles, and introductory operations.", highlighted: false },
        { id: "bml-2", badge: "Colleges", title: "Graded Business Colleges", description: "Strategic marketing plans, organizational change simulations, and financial management reports.", highlighted: true },
        { id: "bml-3", badge: "MBA & DBA", title: "Postgraduate MBA Programs", description: "Boardroom executive summaries, international expansion memos, and corporate strategy theses.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Business Standards",
      heading: "Quality Controls & Experienced Management Mentors",
      intro: "Authored by MBA graduates and corporate strategy consultants.",
      pillars: [
        { id: "bmp-1", icon: "ShieldCheck", accent: "orange", title: "Real-World Context", description: "Case analysis grounded in contemporary corporate market realities." },
        { id: "bmp-2", icon: "BookOpen", accent: "green", title: "Academic Rigor", description: "Frameworks mapped against authoritative peer-reviewed management literature." },
        { id: "bmp-3", icon: "Award", accent: "navy", title: "Executive Polish", description: "Polished corporate memoranda formatting with executive summaries." },
      ],
      featuredExperts: [
        { id: "bme-1", name: "Julian Montgomery, MBA", credentials: "MBA (INSEAD), B.Sc. Management (Warwick)", experienceLine: "13+ years management consulting & university tutoring", rating: "4.96", papersDelivered: "780+ Business Papers", verified: true },
        { id: "bme-2", name: "Dr. Fatima Al-Mansoor, Ph.D.", credentials: "Ph.D. in Strategic Management (Manchester)", experienceLine: "9+ years business school lecturer", rating: "4.94", papersDelivered: "540+ Business Papers", verified: true },
      ],
    },
    faqSection: {
      tagline: "FAQ",
      heading: "Frequently Asked Questions About Business Management Help",
      intro: "Inquiries on HBR case studies, frameworks, and group projects.",
      items: [
        { id: "bmf-1", question: "Can you analyze Harvard Business Review (HBR) case studies?", answer: "Yes. Our team regularly analyzes HBR, MIT Sloan, and Stanford business case studies." },
        { id: "bmf-2", question: "Do you include visual framework diagrams?", answer: "Yes, strategic models (SWOT, Porter's Five Forces, Ansoff Matrix) are delivered as clean vector diagrams." },
      ],
    },
    seo: {
      metaTitle: "Business Management Assignment Help & Case Studies | ReadEssay",
      metaDescription: "University business management assignment help. Strategic analysis, organizational behavior, Porter's Five Forces, and MBA case studies.",
      canonicalSlug: "business-management-assignment-help",
    },
  },

  // 5. Computer Science Assignment Help
  {
    id: "sub-computer-science",
    parentId: "serv-assignment-help",
    name: "Computer Science Assignment Help",
    slug: "computer-science-assignment-help",
    shortIntro: "Algorithm design, relational database schemas, software architecture documentation, and data structure reports.",
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-08",
    heroTagline: "Algorithmic Precision & Systems Architecture",
    heroH1: "Computer Science & Software Engineering Academic Guidance",
    heroSummary: "Theoretical computation analysis, Big-O complexity proofs, relational schema normalization, and technical system reports.",
    specializedAssistance: {
      tagline: "Software & Systems",
      heading: "Rigorous Technical Architecture & Computational Documentation",
      bodyParagraphs: "Computer science assignments require bridging algorithmic logic with clear, professional system documentation. Our computer science academics assist with software specification documents, relational database design (3NF), and computational complexity proofs.\n\nEvery submission includes annotated UML diagrams, data structure comparison matrices, and step-by-step mathematical proofs.",
      ctaLabel: "View CS Solutions",
      ctaUrl: "/services/sub-services/computer-science-assignment-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Technical Modules",
      heading: "Computer Science Curriculum Areas",
      intro: "Comprehensive support for core computational and software engineering coursework.",
      cards: [
        { id: "cs-1", icon: "Code", accent: "orange", title: "Algorithm Complexity & Design", description: "Asymptotic notation proofs (Big-O, Big-Omega), divide-and-conquer, and dynamic programming." },
        { id: "cs-2", icon: "Binary", accent: "green", title: "Database Systems & Normalization", description: "Entity-Relationship (ER) diagrams, relational algebra, and BCNF/3NF normalization." },
        { id: "cs-3", icon: "Layers", accent: "navy", title: "Software Architecture & UML", description: "Object-oriented design patterns, sequence diagrams, and microservices documentation." },
        { id: "cs-4", icon: "ShieldCheck", accent: "orange", title: "Cybersecurity & Networks", description: "Cryptographic protocol audits, OSI network models, and vulnerability threat assessments." },
      ],
    },
    academicFields: {
      tagline: "Degree Tiers",
      heading: "Computer Science Support by Degree Level",
      intro: "Curricula aligned to IEEE and ACM computing curriculum standards.",
      levels: [
        { id: "csl-1", badge: "Undergrad", title: "Foundational Computer Science", description: "Introductory data structures (arrays, linked lists, binary trees) and procedural design.", highlighted: false },
        { id: "csl-2", badge: "Colleges", title: "B.Sc. Computer Science / Software Eng.", description: "Advanced operating systems, compiler principles, distributed systems, and database systems.", highlighted: true },
        { id: "csl-3", badge: "Master's & PhD", title: "Postgraduate Computing & AI", description: "Machine learning theory, neural network architecture, and parallel computing research.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Technical Quality",
      heading: "Quality Protocols & Senior Computer Scientists",
      intro: "Authored by doctoral researchers and senior software engineers.",
      pillars: [
        { id: "csp-1", icon: "ShieldCheck", accent: "orange", title: "Mathematical Accuracy", description: "Proofs checked for logical soundness and asymptotic correctness." },
        { id: "csp-2", icon: "BookOpen", accent: "green", title: "Standard Notation", description: "Strict IEEE and ACM academic formatting and pseudocode conventions." },
        { id: "csp-3", icon: "Award", accent: "navy", title: "Vector Visuals", description: "Clean UML diagrams and database schemas delivered in high resolution." },
      ],
      featuredExperts: [
        { id: "cse-1", name: "Dr. Vikram Patel, Ph.D.", credentials: "Ph.D. in Computer Science (Carnegie Mellon)", experienceLine: "11+ years algorithms researcher & systems architect", rating: "4.98", papersDelivered: "820+ CS Papers", verified: true },
        { id: "cse-2", name: "Artemis Ward, M.Sc.", credentials: "M.Sc. Software Engineering (Oxford)", experienceLine: "8+ years distributed systems specialist", rating: "4.95", papersDelivered: "580+ CS Papers", verified: true },
      ],
    },
    faqSection: {
      tagline: "CS Questions",
      heading: "Frequently Asked Questions About Computer Science Help",
      intro: "Inquiries on pseudocode, UML diagrams, and technical formatting.",
      items: [
        { id: "csf-1", question: "Do you provide UML diagrams with software architecture assignments?", answer: "Yes, our technical submissions include professional UML sequence, class, and component diagrams." },
        { id: "csf-2", question: "Can you provide Big-O proofs for custom algorithms?", answer: "Yes, we provide mathematical proofs for best, average, and worst-case time and space complexity." },
      ],
    },
    seo: {
      metaTitle: "Computer Science Assignment Help & Systems Reports | ReadEssay",
      metaDescription: "Academic computer science assignment help. Algorithm analysis, database normalization, software architecture, and technical reports.",
      canonicalSlug: "computer-science-assignment-help",
    },
  },

  // 6. Dissertation Proposal Help
  {
    id: "sub-dissertation-proposal",
    parentId: "serv-dissertation-thesis",
    name: "Dissertation Proposal Help",
    slug: "dissertation-proposal-help",
    shortIntro: "Research question definition, literature rationale, methodology justification, and ethics board application drafting.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-09",
    heroTagline: "Research Design & Hypotheses Formulation",
    heroH1: "Doctoral & Master's Dissertation Proposal Advisory",
    heroSummary: "Refine research hypotheses, justify theoretical frameworks, formulate sampling methodologies, and pass ethics reviews.",
    specializedAssistance: {
      tagline: "Proposal Advisory",
      heading: "Defensible Research Design & Defensible Hypotheses",
      bodyParagraphs: "A successful dissertation proposal establishes the academic significance, theoretical viability, and empirical roadmap of postgraduate research. Our PhD consultants assist candidates in refining research questions and structuring defensible proposals.\n\nEvery proposal includes a clear conceptual framework, sampling strategy justification, and institutional ethics review compliance checklist.",
      ctaLabel: "View Proposal Support",
      ctaUrl: "/services/sub-services/dissertation-proposal-help",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Proposal Sections",
      heading: "Core Proposal Components Covered",
      intro: "Structured assistance covering every required section of institutional proposals.",
      cards: [
        { id: "dp-1", icon: "Search", accent: "orange", title: "Problem Statement & Rationale", description: "Formulating compelling research gaps backed by peer-reviewed literature." },
        { id: "dp-2", icon: "BookOpen", accent: "green", title: "Literature Rationale", description: "Conceptual matrix mapping theoretical traditions and empirical tensions." },
        { id: "dp-3", icon: "Compass", accent: "navy", title: "Methodological Blueprint", description: "Qualitative, quantitative, or mixed-methods research design and sampling." },
        { id: "dp-4", icon: "ShieldCheck", accent: "orange", title: "Research Ethics & Timeline", description: "Informed consent protocols, participant confidentiality, and Gantt charts." },
      ],
    },
    academicFields: {
      tagline: "Academic Levels",
      heading: "Proposal Guidance by Postgraduate Level",
      intro: "Customized to institutional proposal guidelines and doctoral milestones.",
      levels: [
        { id: "dpl-1", badge: "Master's", title: "Master's Thesis Proposal", description: "Curriculum-aligned Master of Science / Master of Arts thesis proposals.", highlighted: false },
        { id: "dpl-2", badge: "Colleges", title: "PhD Candidacy & Upgrade Papers", description: "Comprehensive upgrade papers defending research feasibility to supervisory committees.", highlighted: true },
        { id: "dpl-3", badge: "Doctoral", title: "DBA & Doctoral Research Blueprints", description: "Applied doctoral research proposals integrating industrial and theoretical significance.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Postgraduate Rigor",
      heading: "Proposal Safeguards & PhD Advisory Team",
      intro: "Guided by researchers with successful doctoral supervision records.",
      pillars: [
        { id: "dpp-1", icon: "ShieldCheck", accent: "orange", title: "Ethics Guaranteed", description: "All methodologies conform to university ethics board guidelines." },
        { id: "dpp-2", icon: "BookOpen", accent: "green", title: "Conceptual Novelty", description: "Clear differentiation from existing published literature." },
        { id: "dpp-3", icon: "Award", accent: "navy", title: "Feasibility Audit", description: "Realistic sampling strategies that pass committee scrutiny." },
      ],
      featuredExperts: [
        { id: "dpe-1", name: "Dr. Evelyn Sinclair, Ph.D.", credentials: "Ph.D. in Education & Methodology (Cambridge)", experienceLine: "16+ years postgraduate research supervision", rating: "4.99", papersDelivered: "910+ Proposals Guided", verified: true },
        { id: "dpe-2", name: "Prof. Kenneth Bailey, Ph.D.", credentials: "Ph.D. in Social Sciences (LSE)", experienceLine: "12+ years doctoral review panel member", rating: "4.97", papersDelivered: "670+ Proposals Guided", verified: true },
      ],
    },
    faqSection: {
      tagline: "Proposal FAQs",
      heading: "Frequently Asked Questions About Proposal Support",
      intro: "Inquiries regarding word counts, ethics approvals, and committee revisions.",
      items: [
        { id: "dpf-1", question: "What is typically included in a dissertation proposal?", answer: "Proposals generally include a project title, introduction, research questions, literature review, methodology, ethical considerations, and research timeline." },
        { id: "dpf-2", question: "Can you assist with committee feedback revisions?", answer: "Yes, our advisors help revise proposals addressing specific supervisor comments and suggestions." },
      ],
    },
    seo: {
      metaTitle: "Dissertation Proposal Help & Research Planning | ReadEssay",
      metaDescription: "Postgraduate dissertation proposal assistance. Research questions, conceptual frameworks, methodology design, and ethics statements.",
      canonicalSlug: "dissertation-proposal-help",
    },
  },

  // 7. PhD Thesis Writing Guidance
  {
    id: "sub-phd-thesis-writing",
    parentId: "serv-dissertation-thesis",
    name: "PhD Thesis Writing Guidance",
    slug: "phd-thesis-writing",
    shortIntro: "Doctoral dissertation structuring, multi-chapter drafting, empirical analysis discussion, and theoretical defense prep.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-07",
    heroTagline: "Doctoral Scholarship & Viva Voce Preparation",
    heroH1: "Doctoral PhD Thesis Advisory, Chapter Structuring & Defense Prep",
    heroSummary: "Chapter-by-chapter doctoral critique, empirical synthesis, theoretical discussion, and viva voce defense simulation.",
    specializedAssistance: {
      tagline: "Doctoral Advisory",
      heading: "Sustained Doctoral Mentorship Across Dissertation Chapters",
      bodyParagraphs: "Navigating doctoral research requires continuous synthesis of high-level academic theory with novel empirical discoveries. Our PhD consultants provide structured critique and theoretical defense preparation.\n\nWe help candidates maintain narrative continuity across 80,000+ word dissertations, integrate sophisticated econometric or qualitative findings, and rehearse defense arguments.",
      ctaLabel: "View PhD Guidance",
      ctaUrl: "/services/sub-services/phd-thesis-writing",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Chapters Supported",
      heading: "Chapter-by-Chapter Thesis Guidance",
      intro: "Comprehensive doctoral support across all dissertation milestones.",
      cards: [
        { id: "pt-1", icon: "BookOpen", accent: "orange", title: "Introduction & Theoretical Framework", description: "Framing research contributions, paradigms, and conceptual foundations." },
        { id: "pt-2", icon: "Compass", accent: "green", title: "Methodology & Epistemology", description: "Ontological grounding, data collection protocols, and validity safeguards." },
        { id: "pt-3", icon: "TrendingUp", accent: "navy", title: "Findings & Empirical Discussion", description: "Thematic synthesis, empirical findings chapters, and dialogue with literature." },
        { id: "pt-4", icon: "Award", accent: "orange", title: "Conclusion & Viva Voce Coaching", description: "Theoretical contributions, policy implications, and mock defense preparation." },
      ],
    },
    academicFields: {
      tagline: "Program Types",
      heading: "Doctoral Programs Supported",
      intro: "Tailored to European, North American, and Australasian doctoral frameworks.",
      levels: [
        { id: "ptl-1", badge: "Doctoral", title: "Traditional Monograph Dissertations", description: "Multi-chapter continuous monographs formatted to exact institutional thesis standards.", highlighted: false },
        { id: "ptl-2", badge: "Colleges", title: "Publication-Based PhD (by Publication)", description: "Synthesis introduction and framing for PhDs comprising peer-reviewed journal papers.", highlighted: true },
        { id: "ptl-3", badge: "Executive", title: "Professional Doctorate (DBA, EdD, DNP)", description: "Applied doctoral research bridging executive organizational practice with theory.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Doctoral Standards",
      heading: "Confidentiality & Senior Academic Supervisors",
      intro: "Protected by comprehensive non-disclosure agreements.",
      pillars: [
        { id: "ptp-1", icon: "ShieldCheck", accent: "orange", title: "Strict NDA Protection", description: "Complete intellectual property and research data confidentiality." },
        { id: "ptp-2", icon: "BookOpen", accent: "green", title: "Senior PhD Mentors", description: "Advisors holding doctorate degrees from globally recognized universities." },
        { id: "ptp-3", icon: "Award", accent: "navy", title: "Defense Confidence", description: "Mock viva voce questions with constructive feedback." },
      ],
      featuredExperts: [
        { id: "pte-1", name: "Prof. Arthur Pendelton, Ph.D.", credentials: "Ph.D. in Epistemology & Economics (Oxford)", experienceLine: "20+ years doctoral research advisor & journal editor", rating: "4.99", papersDelivered: "1,120+ Theses Guided", verified: true },
        { id: "pte-2", name: "Dr. Christine Laurent, Ph.D.", credentials: "Ph.D. in Comparative Politics (Sciences Po)", experienceLine: "14+ years viva voce examiner", rating: "4.98", papersDelivered: "830+ Theses Guided", verified: true },
      ],
    },
    faqSection: {
      tagline: "PhD FAQs",
      heading: "Frequently Asked Questions About Doctoral Support",
      intro: "Common questions regarding confidentiality, chapters, and defense prep.",
      items: [
        { id: "ptf-1", question: "Can I receive guidance for an individual chapter?", answer: "Yes, candidates can request assistance for individual chapters such as Methodology or Discussion." },
        { id: "ptf-2", question: "How is candidate confidentiality maintained?", answer: "All interactions are governed by non-disclosure agreements, protecting proprietary research findings." },
      ],
    },
    seo: {
      metaTitle: "PhD Thesis Writing Guidance & Viva Preparation | ReadEssay",
      metaDescription: "Doctoral dissertation advisory and chapter structuring from experienced PhD academics. Theoretical defense preparation and methodology audits.",
      canonicalSlug: "phd-thesis-writing",
    },
  },

  // 8. Literature Review Synthesis
  {
    id: "sub-literature-review-synthesis",
    parentId: "serv-dissertation-thesis",
    name: "Literature Review Synthesis",
    slug: "literature-review-synthesis",
    shortIntro: "Thematic synthesis of peer-reviewed sources, conceptual framework mapping, and research gap identification.",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-04",
    heroTagline: "Systematic Review & Critical Gap Analysis",
    heroH1: "Systematic Literature Review & Thematic Theoretical Synthesis",
    heroSummary: "PRISMA systematic reviews, thematic matrix mapping, conceptual gap discovery, and synthesis of high-impact journal literature.",
    specializedAssistance: {
      tagline: "Critical Synthesis",
      heading: "Thematic Literature Synthesis Moving Beyond Mere Summary",
      bodyParagraphs: "A robust literature review does not merely summarize past work; it critically evaluates theoretical tensions and establishes the rationale for new empirical research. We guide students in executing systematic and narrative reviews.\n\nEvery review features conceptual clustering, PRISMA flowcharts where applicable, and explicit identification of unaddressed theoretical tensions.",
      ctaLabel: "View Review Synthesis",
      ctaUrl: "/services/sub-services/literature-review-synthesis",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Synthesis Methods",
      heading: "Literature Synthesis Methodologies",
      intro: "Rigorous protocols for systematic and narrative literature reviews.",
      cards: [
        { id: "lr-1", icon: "Search", accent: "orange", title: "Systematic Search Protocols", description: "PRISMA-compliant search strings, database querying (Scopus, Web of Science), and screening." },
        { id: "lr-2", icon: "Layers", accent: "green", title: "Thematic Matrix Clustering", description: "Conceptual matrices mapping findings across chronological and thematic streams." },
        { id: "lr-3", icon: "ShieldCheck", accent: "navy", title: "Critical Appraisal", description: "Evaluating empirical methodologies, sample sizes, and potential study biases." },
        { id: "lr-4", icon: "Compass", accent: "orange", title: "Research Gap Articulation", description: "Demonstrating how your proposed inquiry directly answers unresolved academic questions." },
      ],
    },
    academicFields: {
      tagline: "Academic Tiers",
      heading: "Literature Reviews by Research Level",
      intro: "Scattered sources synthesized into coherent academic narratives.",
      levels: [
        { id: "lrl-1", badge: "Undergrad", title: "Undergraduate Literature Reviews", description: "Synthesizing 20-30 core peer-reviewed sources into a structured thematic essay.", highlighted: false },
        { id: "lrl-2", badge: "Colleges", title: "Master's Dissertation Literature Reviews", description: "Comprehensive thematic chapters synthesizing 60-100 high-impact empirical papers.", highlighted: true },
        { id: "lrl-3", badge: "PhD", title: "Doctoral Systematic Literature Reviews", description: "PRISMA-structured systematic reviews ready for peer-reviewed journal publication.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Academic Quality",
      heading: "Literature Quality Standards & Specialist Reviewers",
      intro: "Authored by specialists experienced in academic database systematic indexing.",
      pillars: [
        { id: "lrp-1", icon: "ShieldCheck", accent: "orange", title: "High-Impact Sources", description: "Only peer-reviewed journal articles from recognized publishers are synthesized." },
        { id: "lrp-2", icon: "BookOpen", accent: "green", title: "PRISMA Compliance", description: "Standardized inclusion/exclusion flowcharts for systematic reviews." },
        { id: "lrp-3", icon: "Award", accent: "navy", title: "No Superficial Listing", description: "Deep thematic evaluation rather than isolated study-by-study summaries." },
      ],
      featuredExperts: [
        { id: "lre-1", name: "Dr. Clara Schumann, Ph.D.", credentials: "Ph.D. in Information Science (UCL)", experienceLine: "13+ years systematic literature review specialist", rating: "4.98", papersDelivered: "790+ Literature Reviews", verified: true },
        { id: "lre-2", name: "Marcus Thorne, M.Phil.", credentials: "M.Phil. in Social Research (Edinburgh)", experienceLine: "9+ years meta-analysis & thematic synthesis tutor", rating: "4.96", papersDelivered: "520+ Literature Reviews", verified: true },
      ],
    },
    faqSection: {
      tagline: "Review FAQs",
      heading: "Frequently Asked Questions About Literature Reviews",
      intro: "Inquiries on search databases, PRISMA flowcharts, and source selection.",
      items: [
        { id: "lrf-1", question: "Can you provide a PRISMA flowchart for systematic reviews?", answer: "Yes, we construct PRISMA-compliant diagrams detailing records identified, screened, and included." },
        { id: "lrf-2", question: "How many sources are typically synthesized?", answer: "Source counts depend on your rubric, typically ranging from 25 sources for essays to 100+ for dissertations." },
      ],
    },
    seo: {
      metaTitle: "Literature Review Synthesis & Conceptual Mapping | ReadEssay",
      metaDescription: "Systematic and narrative literature reviews for Master's and PhD research. PRISMA protocols, thematic matrix analysis, and research gap discovery.",
      canonicalSlug: "literature-review-synthesis",
    },
  },

  // 9. Argumentative Essay Writing
  {
    id: "sub-argumentative-essay",
    parentId: "serv-essay-writing",
    name: "Argumentative Essay Writing",
    slug: "argumentative-essay-writing",
    shortIntro: "Persuasive thesis statement formulation, empirical evidence integration, and structured counter-argument rebuttals.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
    heroTagline: "Persuasive Rhetoric & Counter-Argument Rebuttal",
    heroH1: "Scholarly Argumentative Essay Writing & Thesis Defense",
    heroSummary: "Construct logically sound academic arguments, integrate empirical evidence, and dismantle opposing viewpoints.",
    specializedAssistance: {
      tagline: "Logical Persuasion",
      heading: "Compelling Thesis Statements Supported by Authoritative Sources",
      bodyParagraphs: "Argumentative essays require defending an academic stance against opposing viewpoints using rigorous scholarly citations. Our essay specialists construct clear, logically sound arguments with robust evidentiary backing.\n\nFrom concise introductory thesis statements to structured counter-argument rebuttals, our essays follow seamless logical progression.",
      ctaLabel: "View Argumentative Essays",
      ctaUrl: "/services/sub-services/argumentative-essay-writing",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Essay Architecture",
      heading: "Components of Defensible Argumentation",
      intro: "Every essay is engineered around rigorous rhetorical and academic structures.",
      cards: [
        { id: "ae-1", icon: "FileText", accent: "orange", title: "Nuanced Thesis Formulation", description: "Clear, defensible thesis statements articulating specific academic positions." },
        { id: "ae-2", icon: "Search", accent: "green", title: "Empirical Evidentiary Backing", description: "Supporting each topic sentence with authoritative peer-reviewed citations." },
        { id: "ae-3", icon: "ShieldCheck", accent: "navy", title: "Counter-Argument Refutation", description: "Fair presentation of rival scholarly viewpoints followed by methodical rebuttals." },
        { id: "ae-4", icon: "Compass", accent: "orange", title: "Logical Cohesion & Flow", description: "Tight paragraph transitions maintaining unrelenting argument momentum." },
      ],
    },
    academicFields: {
      tagline: "Course Tiers",
      heading: "Argumentative Writing Across Academic Levels",
      intro: "Calibrated to your exact university grading rubric and discipline guidelines.",
      levels: [
        { id: "ael-1", badge: "Undergrad", title: "First & Second Year University Essays", description: "5-paragraph to 2,000-word argumentative essays with structured evidence.", highlighted: false },
        { id: "ael-2", badge: "Colleges", title: "Advanced Undergraduate Seminars", description: "3,000-5,000 word analytical essays exploring complex theoretical disputes.", highlighted: true },
        { id: "ael-3", badge: "Postgraduate", title: "Master's Term Papers & Critical Commentaries", description: "High-level theoretical papers critiquing established scholarly paradigms.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Integrity Standards",
      heading: "Argument Rigor & Essay Specialists",
      intro: "Authored by specialists with graduate degrees in the humanities and social sciences.",
      pillars: [
        { id: "aep-1", icon: "ShieldCheck", accent: "orange", title: "Zero Plagiarism", description: "100% bespoke writing verified by originality audits." },
        { id: "aep-2", icon: "BookOpen", accent: "green", title: "Citation Precision", description: "Flawless formatting in APA, Harvard, Chicago, or MLA." },
        { id: "aep-3", icon: "Award", accent: "navy", title: "Rhetorical Balance", description: "Rigorous scholarly tone free from colloquialisms or bias." },
      ],
      featuredExperts: [
        { id: "aee-1", name: "Dr. Liam Gallagher, Ph.D.", credentials: "Ph.D. in English Literature & Rhetoric (Oxford)", experienceLine: "12+ years academic essay coach", rating: "4.97", papersDelivered: "860+ Argumentative Essays", verified: true },
        { id: "aee-2", name: "Sarah K. O'Connor, M.A.", credentials: "M.A. in Philosophy (Trinity College Dublin)", experienceLine: "8+ years logic & argumentation mentor", rating: "4.95", papersDelivered: "590+ Argumentative Essays", verified: true },
      ],
    },
    faqSection: {
      tagline: "Essay FAQs",
      heading: "Frequently Asked Questions About Argumentative Essays",
      intro: "Key questions on thesis statements, counter-arguments, and citation styles.",
      items: [
        { id: "aef-1", question: "Do you include counter-arguments in every argumentative essay?", answer: "Yes. Academic rigor requires addressing counter-arguments before demonstrating their evidentiary weaknesses." },
        { id: "aef-2", question: "Can I provide specific lecture notes or readings to incorporate?", answer: "Yes, our writers incorporate course slide decks, core textbook chapters, and syllabus readings." },
      ],
    },
    seo: {
      metaTitle: "Argumentative Essay Writing Services | ReadEssay",
      metaDescription: "Expert assistance with argumentative academic essays. Thesis statement formulation, empirical citations, and counter-argument rebuttals.",
      canonicalSlug: "argumentative-essay-writing",
    },
  },

  // 10. College Admission & Personal Statement
  {
    id: "sub-college-admission-essay",
    parentId: "serv-essay-writing",
    name: "College Admission & Personal Statement",
    slug: "college-admission-essay",
    shortIntro: "Distinctive personal narrative crafting, academic statement of purpose, and university admissions essays.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-06",
    heroTagline: "Authentic Narrative & Admissions Advisory",
    heroH1: "Personal Statements & University Admissions Essay Support",
    heroSummary: "Communicate your intellectual trajectory, unique lived experiences, and future academic contributions with compelling clarity.",
    specializedAssistance: {
      tagline: "Admissions Polish",
      heading: "Distinctive Admissions Narratives That Capture Committee Attention",
      bodyParagraphs: "Admissions essays allow candidates to communicate their unique academic trajectory, leadership milestones, and intellectual motivations to university selection committees.\n\nWe help students eliminate clichés, refine their authentic voice, and connect past experiences with future departmental research strengths.",
      ctaLabel: "View Admissions Help",
      ctaUrl: "/services/sub-services/college-admission-essay",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Application Types",
      heading: "Admissions Essay Formats Supported",
      intro: "Tailored to competitive undergraduate and graduate admissions committees.",
      cards: [
        { id: "adm-1", icon: "FileText", accent: "orange", title: "Common App & UCAS Statements", description: "Undergraduate personal statements answering prompts with compelling personal narratives." },
        { id: "adm-2", icon: "GraduationCap", accent: "green", title: "Master's Statement of Purpose", description: "Demonstrating academic preparedness, research focus, and institutional alignment." },
        { id: "adm-3", icon: "Award", accent: "navy", title: "MBA Admissions Essays", description: "Highlighting career trajectory, leadership impact, and post-MBA contributions." },
        { id: "adm-4", icon: "Compass", accent: "orange", title: "Scholarship & Fellowship Essays", description: "Demonstrating leadership merit, community service, and academic excellence." },
      ],
    },
    academicFields: {
      tagline: "Application Levels",
      heading: "Admissions Guidance Across Degree Stages",
      intro: "Calibrated to international admissions standards (US, UK, Canada, Australia).",
      levels: [
        { id: "adml-1", badge: "Undergrad", title: "Undergraduate University Admissions", description: "Common App personal essays, UCAS 4,000-character statements, and supplemental essays.", highlighted: false },
        { id: "adml-2", badge: "Colleges", title: "Selective Colleges & Ivy Plus / Russell Group", description: "Competitive supplemental essays and departmental scholarship applications.", highlighted: true },
        { id: "adml-3", badge: "Postgraduate", title: "Law School, Med School & Graduate Programs", description: "SOPs, diversity statements, and addenda for competitive postgraduate programs.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Admissions Quality",
      heading: "Authenticity Safeguards & Admissions Mentors",
      intro: "Reviewed by former admissions committee readers and professional editors.",
      pillars: [
        { id: "admp-1", icon: "ShieldCheck", accent: "orange", title: "Authentic Voice", description: "Your authentic personal narrative preserved and elevated with precision." },
        { id: "admp-2", icon: "BookOpen", accent: "green", title: "Tight Word Counts", description: "Exact compliance with character or word limitations." },
        { id: "admp-3", icon: "Award", accent: "navy", title: "Impactful Hooks", description: "Compelling introductory hooks that engage admissions readers immediately." },
      ],
      featuredExperts: [
        { id: "adme-1", name: "Claire Beauchamp, M.Ed.", credentials: "M.Ed. in Higher Education Administration (Harvard)", experienceLine: "14+ years college admissions consulting", rating: "4.99", papersDelivered: "950+ Personal Statements", verified: true },
        { id: "adme-2", name: "David Sterling, M.A.", credentials: "M.A. in English (Oxford)", experienceLine: "10+ years UCAS personal statement specialist", rating: "4.97", papersDelivered: "710+ Personal Statements", verified: true },
      ],
    },
    faqSection: {
      tagline: "Admissions FAQs",
      heading: "Frequently Asked Questions About Personal Statements",
      intro: "Common questions regarding word limits, prompts, and tone.",
      items: [
        { id: "admf-1", question: "Do you write essays from scratch or edit existing drafts?", answer: "We support both: developing complete personalized drafts from your questionnaire or comprehensively polishing existing drafts." },
        { id: "admf-2", question: "Can you help tailor one statement for multiple universities?", answer: "Yes, we create a strong core personal narrative and customize institutional specific paragraphs." },
      ],
    },
    seo: {
      metaTitle: "College Admission Essays & Personal Statements | ReadEssay",
      metaDescription: "Compelling university admissions essays and personal statements. Vetted academic editors helping you communicate your intellectual passion.",
      canonicalSlug: "college-admission-essay",
    },
  },

  // 11. Reflective & Critical Essay Help
  {
    id: "sub-reflective-critical-essay",
    parentId: "serv-essay-writing",
    name: "Reflective & Critical Essay Help",
    slug: "reflective-critical-essay",
    shortIntro: "Experiential reflection frameworks (Gibbs/Kolb), pedagogical evaluations, and critical academic critiques.",
    status: "draft",
    displayOrder: 3,
    updatedAt: "2026-11-02",
    heroTagline: "Experiential Learning & Pedagogical Models",
    heroH1: "Reflective Learning Journals & Critical Academic Essay Assistance",
    heroSummary: "Apply Gibbs, Kolb, and Schön reflection cycles to clinical, pedagogical, and business practice with academic literature grounding.",
    specializedAssistance: {
      tagline: "Pedagogical Reflection",
      heading: "Rigorous Application of Established Reflective Learning Cycles",
      bodyParagraphs: "Reflective essays require students to analyze professional practice and personal learning experiences through established pedagogical frameworks. We assist students in nursing, education, and business with structured reflective writing.\n\nEvery paper balances first-person experiential analysis with objective empirical literature and forward-looking SMART action plans.",
      ctaLabel: "View Reflective Support",
      ctaUrl: "/services/sub-services/reflective-critical-essay",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Reflective Cycles",
      heading: "Frameworks & Models Applied",
      intro: "Structured experiential analysis matching course rubrics.",
      cards: [
        { id: "rc-1", icon: "Compass", accent: "orange", title: "Gibbs' Reflective Cycle (1988)", description: "Description, Feelings, Evaluation, Analysis, Conclusion, and Action Plan." },
        { id: "rc-2", icon: "TrendingUp", accent: "green", title: "Kolb's Experiential Learning", description: "Concrete Experience, Reflective Observation, Abstract Conceptualization, and Active Experimentation." },
        { id: "rc-3", icon: "Search", accent: "navy", title: "Schön's Reflection-in-Action", description: "Differentiating reflection-in-action from reflection-on-action in professional clinical/teaching practice." },
        { id: "rc-4", icon: "Award", accent: "orange", title: "SMART Action Planning", description: "Formulating specific, measurable, achievable action plans for future professional competence." },
      ],
    },
    academicFields: {
      tagline: "Disciplines",
      heading: "Reflective Writing Across Disciplines",
      intro: "Tailored to practice-based degree requirements.",
      levels: [
        { id: "rcl-1", badge: "Undergrad", title: "Nursing & Midwifery Practice", description: "Clinical placement reflection journals and critical incident analyses.", highlighted: false },
        { id: "rcl-2", badge: "Colleges", title: "Teacher Training & Education (PGCE)", description: "Classroom teaching observations, pedagogical adaptations, and pupil engagement reflections.", highlighted: true },
        { id: "rcl-3", badge: "Postgraduate", title: "Executive Leadership & Social Work", description: "Supervisory critical reflection, organizational culture audits, and ethical dilemmas.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Reflective Rigor",
      heading: "Pedagogical Standards & Reflective Mentors",
      intro: "Authored by specialists in professional practice pedagogy.",
      pillars: [
        { id: "rcp-1", icon: "ShieldCheck", accent: "orange", title: "Framework Rigor", description: "Complete adherence to the stages of your assigned reflective model." },
        { id: "rcp-2", icon: "BookOpen", accent: "green", title: "Literature Synthesis", description: "Connecting personal practice with empirical healthcare or teaching evidence." },
        { id: "rcp-3", icon: "Award", accent: "navy", title: "Professional Tone", description: "Balanced reflective voice combining personal insights with academic decorum." },
      ],
      featuredExperts: [
        { id: "rce-1", name: "Dr. Fiona MacIntyre, Ed.D.", credentials: "Doctor of Education (Edinburgh)", experienceLine: "15+ years reflective practice lecturer", rating: "4.96", papersDelivered: "720+ Reflective Papers", verified: true },
        { id: "rce-2", name: "Simon Vance, M.Sc.", credentials: "M.Sc. in Nursing Education (Manchester)", experienceLine: "9+ years clinical education mentor", rating: "4.94", papersDelivered: "480+ Reflective Papers", verified: true },
      ],
    },
    faqSection: {
      tagline: "FAQ",
      heading: "Frequently Asked Questions About Reflective Writing",
      intro: "Common questions on first-person writing, frameworks, and confidentiality.",
      items: [
        { id: "rcf-1", question: "Is first-person writing ('I' / 'we') allowed in reflective essays?", answer: "Yes. In reflective writing, first-person narrative is standard for the experiential description, balanced with objective third-person analysis." },
        { id: "rcf-2", question: "Which reflective models are supported?", answer: "We support Gibbs (1988), Kolb (1984), Schön (1983), Johns (2000), and Rolfe et al. (2001)." },
      ],
    },
    seo: {
      metaTitle: "Reflective & Critical Essay Writing Help | ReadEssay",
      metaDescription: "Academic assistance with reflective learning journals and essays. Gibbs, Kolb, and Schön framework applications with scholarly citations.",
      canonicalSlug: "reflective-critical-essay",
    },
  },

  // 12. Law & Legal Studies Coursework
  {
    id: "sub-law-legal-coursework",
    parentId: "serv-coursework-homework",
    name: "Law & Legal Studies Coursework",
    slug: "law-legal-coursework",
    shortIntro: "IRAC legal problem questions, judicial case brief summaries, statutory interpretation, and commercial law essays.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-08",
    heroTagline: "Doctrinal Analysis & Judicial Precedents",
    heroH1: "University Law Coursework, IRAC Case Analysis & Statutory Interpretation",
    heroSummary: "IRAC legal problem questions, case briefs, judicial precedent citations (OSCOLA/Bluebook), and doctrinal law essays.",
    specializedAssistance: {
      tagline: "Legal Precision",
      heading: "Methodical IRAC Problem Solving & Statutory Interpretation",
      bodyParagraphs: "Legal coursework requires rigorous application of common law judicial precedents, statutory interpretation, and doctrinal analysis. Our law academics hold LL.B, LL.M, and Barrister/Solicitor credentials.\n\nEvery problem question is structured systematically using IRAC (Issue, Rule, Application, Conclusion) with precise citations conforming to OSCOLA, Bluebook, or AGLC4 standards.",
      ctaLabel: "View Law Support",
      ctaUrl: "/services/sub-services/law-legal-coursework",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Legal Fields",
      heading: "Core Legal Coursework Fields Supported",
      intro: "Comprehensive assistance across common law and civil law university modules.",
      cards: [
        { id: "law-1", icon: "Scale", accent: "orange", title: "Contract & Commercial Law", description: "Offer and acceptance, consideration, breach, remedies, and Sale of Goods provisions." },
        { id: "law-2", icon: "ShieldCheck", accent: "green", title: "Tort Law & Negligence", description: "Duty of care (Caparo / Robinson test), causation, pure economic loss, and vicarious liability." },
        { id: "law-3", icon: "BookOpen", accent: "navy", title: "Public & Constitutional Law", description: "Judicial review grounds, separation of powers, executive prerogative, and human rights claims." },
        { id: "law-4", icon: "FileText", accent: "orange", title: "Criminal Law & Procedure", description: "Actus reus, mens rea, strict liability, defenses (duress, self-defense), and homicide." },
      ],
    },
    academicFields: {
      tagline: "Law Degrees",
      heading: "Law Coursework Support Across Program Tiers",
      intro: "Strictly aligned to institutional law school marking rubrics.",
      levels: [
        { id: "lawl-1", badge: "Undergrad", title: "LL.B Core Qualifying Modules", description: "Contract, Tort, Criminal, Public, Land, and Equity & Trusts coursework problem questions.", highlighted: false },
        { id: "lawl-2", badge: "Colleges", title: "Graded Law Colleges & LPC/SQE", description: "Commercial drafting, civil litigation dispute memos, and business law problem sets.", highlighted: true },
        { id: "lawl-3", badge: "LL.M & PhD", title: "Master of Laws (LL.M) & Doctoral Research", description: "International human rights, intellectual property, maritime law, and comparative legal dissertations.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Jurisprudential Rigor",
      heading: "Legal Quality Standards & Qualified Law Tutors",
      intro: "Authored by credentialed legal academics and qualified solicitors.",
      pillars: [
        { id: "lawp-1", icon: "ShieldCheck", accent: "orange", title: "OSCOLA Citation", description: "Exact compliance with the Oxford Standard for Citation of Legal Authorities." },
        { id: "lawp-2", icon: "Scale", accent: "green", title: "IRAC Methodology", description: "Uncompromising logical structure separating legal issues from statutory applications." },
        { id: "lawp-3", icon: "Award", accent: "navy", title: "Current Precedents", description: "Up-to-date judicial precedents including recent appellate court rulings." },
      ],
      featuredExperts: [
        { id: "lawe-1", name: "Barrister Edward Hastings, LL.M", credentials: "LL.M in Commercial Law (Cambridge), Called to the Bar (Lincoln's Inn)", experienceLine: "14+ years legal education & mooting mentor", rating: "4.99", papersDelivered: "880+ Law Courseworks", verified: true },
        { id: "lawe-2", name: "Dr. Genevieve Roy, Ph.D.", credentials: "Ph.D. in International Law (Edinburgh)", experienceLine: "10+ years university law lecturer", rating: "4.97", papersDelivered: "630+ Law Courseworks", verified: true },
      ],
    },
    faqSection: {
      tagline: "Legal FAQs",
      heading: "Frequently Asked Questions About Law Coursework",
      intro: "Inquiries on OSCOLA citation, legal problem questions, and statutes.",
      items: [
        { id: "lawf-1", question: "Do you format legal essays in OSCOLA?", answer: "Yes, all common-law submissions strictly follow OSCOLA guidelines with footnoted citations and bibliography tables." },
        { id: "lawf-2", question: "How do you approach IRAC problem questions?", answer: "We identify the legal issue, cite the relevant case authority/statute, apply the rule to the facts, and reach a reasoned conclusion." },
      ],
    },
    seo: {
      metaTitle: "Law Coursework Help & IRAC Problem Questions | ReadEssay",
      metaDescription: "University law coursework assistance. IRAC problem answers, judicial precedent citations, and OSCOLA-formatted legal essays.",
      canonicalSlug: "law-legal-coursework",
    },
  },

  // 13. Engineering & Technical Coursework
  {
    id: "sub-engineering-coursework",
    parentId: "serv-coursework-homework",
    name: "Engineering & Technical Coursework",
    slug: "engineering-coursework",
    shortIntro: "Technical laboratory write-ups, engineering calculation solutions, and systems performance reports.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-05",
    heroTagline: "Mathematical Derivations & Lab Reports",
    heroH1: "Technical Engineering Coursework, Laboratory Write-ups & Problem Sets",
    heroSummary: "Mechanical, civil, electrical, and biomedical engineering calculations, laboratory experiment reports, and simulation write-ups.",
    specializedAssistance: {
      tagline: "Technical Calculations",
      heading: "Step-by-Step Engineering Problem Solving & Lab Documentation",
      bodyParagraphs: "Engineering coursework requires balancing mathematical calculation accuracy with structured technical documentation. We support mechanical, civil, electrical, and biomedical engineering students.\n\nEvery submission includes annotated engineering schematics, step-by-step mathematical derivations with SI unit consistency checks, and MATLAB/Simulink simulation interpretations.",
      ctaLabel: "View Engineering Support",
      ctaUrl: "/services/sub-services/engineering-coursework",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Disciplines",
      heading: "Engineering Fields Supported",
      intro: "Technical derivations and lab write-ups across core engineering branches.",
      cards: [
        { id: "eng-1", icon: "Calculator", accent: "orange", title: "Mechanical Engineering", description: "Thermodynamics, fluid mechanics, finite element analysis (FEA), and stress analysis." },
        { id: "eng-2", icon: "Layers", accent: "green", title: "Civil & Structural Engineering", description: "Structural load calculations, soil mechanics, concrete design, and hydraulics." },
        { id: "eng-3", icon: "Binary", accent: "navy", title: "Electrical & Electronic Engineering", description: "Circuit analysis, signal processing, control systems, and electromagnetics." },
        { id: "eng-4", icon: "FileText", accent: "orange", title: "Technical Lab Reports", description: "Experimental methodology, apparatus diagrams, error calculations, and discussion." },
      ],
    },
    academicFields: {
      tagline: "Program Tiers",
      heading: "Engineering Support Across University Stages",
      intro: "Conforming to IEEE and institutional engineering accreditation criteria (ABET).",
      levels: [
        { id: "engl-1", badge: "Undergrad", title: "First & Second Year Engineering", description: "Engineering mathematics, statics, dynamics, and foundational circuit theory.", highlighted: false },
        { id: "engl-2", badge: "Colleges", title: "B.Eng / B.Sc. Engineering Honours", description: "Advanced heat transfer, structural mechanics, digital systems, and capstone group projects.", highlighted: true },
        { id: "engl-3", badge: "M.Eng / PhD", title: "Master's & Doctoral Engineering", description: "Computational fluid dynamics (CFD), robotics, nanotechnology, and doctoral engineering theses.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Precision Protocols",
      heading: "Calculation Safeguards & Professional Engineers",
      intro: "Authored by chartered engineers and engineering doctorate researchers.",
      pillars: [
        { id: "engp-1", icon: "ShieldCheck", accent: "orange", title: "SI Unit Consistency", description: "Rigorous dimensional analysis and unit conversions verified throughout." },
        { id: "engp-2", icon: "Calculator", accent: "green", title: "Step-by-Step Derivations", description: "Every equation clearly derived without skipping logical mathematical steps." },
        { id: "engp-3", icon: "Award", accent: "navy", title: "Vector Schematics", description: "High-resolution technical diagrams, circuit schematics, and annotated graphs." },
      ],
      featuredExperts: [
        { id: "enge-1", name: "Dr. Tariq Al-Hassan, CEng, Ph.D.", credentials: "Ph.D. in Mechanical Engineering (Imperial College)", experienceLine: "15+ years engineering consultancy & lecturer", rating: "4.99", papersDelivered: "860+ Engineering Projects", verified: true },
        { id: "enge-2", name: "Elena Vasquez, M.Sc.", credentials: "M.Sc. in Structural Engineering (ETH Zurich)", experienceLine: "9+ years civil engineering academic advisor", rating: "4.96", papersDelivered: "580+ Engineering Projects", verified: true },
      ],
    },
    faqSection: {
      tagline: "Engineering FAQs",
      heading: "Frequently Asked Questions About Engineering Help",
      intro: "Inquiries on software tools, calculations, and laboratory reports.",
      items: [
        { id: "engf-1", question: "Can you assist with MATLAB, Simulink, or ANSYS reports?", answer: "Yes, our engineers provide report write-ups interpreting software simulation outputs and plots." },
        { id: "engf-2", question: "Are calculation workings shown step-by-step?", answer: "Yes, every calculation displays the governing equation, variable substitution, and final result with units." },
      ],
    },
    seo: {
      metaTitle: "Engineering Coursework Help & Technical Reports | ReadEssay",
      metaDescription: "Technical engineering coursework solutions and laboratory write-ups across mechanical, electrical, and civil engineering disciplines.",
      canonicalSlug: "engineering-coursework",
    },
  },

  // 14. Quantitative & Qualitative Data Analysis
  {
    id: "sub-data-analysis-research",
    parentId: "serv-research-paper",
    name: "Quantitative & Qualitative Data Analysis",
    slug: "data-analysis-research",
    shortIntro: "SPSS, R, and NVivo statistical analysis reporting, survey data interpretation, and thematic qualitative coding.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-11",
    heroTagline: "Statistical Modeling & Thematic Qualitative Coding",
    heroH1: "Empirical Data Analysis, Statistical Reporting & Thematic Coding",
    heroSummary: "SPSS, R, Stata, Python statistical tests, APA-formatted data tables, and Braun & Clarke thematic qualitative analysis.",
    specializedAssistance: {
      tagline: "Empirical Analytics",
      heading: "Rigorous Statistical Testing & Qualitative Thematic Analysis",
      bodyParagraphs: "Extracting valid empirical insights requires rigorous statistical modeling or systematic qualitative coding. We guide researchers in executing descriptive statistics, multivariate regression, ANOVA, SEM, and thematic Braun & Clarke analysis.\n\nEvery deliverable includes APA 7th formatted statistical tables, visual data figures, and detailed interpretation of p-values, effect sizes, and confidence intervals.",
      ctaLabel: "View Data Analysis Support",
      ctaUrl: "/services/sub-services/data-analysis-research",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Methodologies",
      heading: "Data Analysis Capabilities",
      intro: "Quantitative and qualitative empirical data analysis for research papers and dissertations.",
      cards: [
        { id: "da-1", icon: "TrendingUp", accent: "orange", title: "SPSS & Stata Quantitative Testing", description: "T-tests, ANOVA, MANOVA, multiple regression, factor analysis, and non-parametric tests." },
        { id: "da-2", icon: "Code", accent: "green", title: "R & Python Econometric Modeling", description: "Time-series forecasting, panel data regressions, machine learning, and ggplot2 visual outputs." },
        { id: "da-3", icon: "Search", accent: "navy", title: "Thematic Qualitative Coding (NVivo)", description: "Braun & Clarke six-phase thematic analysis, codebook creation, and qualitative matrix tables." },
        { id: "da-4", icon: "Calculator", accent: "orange", title: "Structural Equation Modeling (SEM)", description: "Path analysis, confirmatory factor analysis (CFA), and mediation/moderation testing (Amos/SmartPLS)." },
      ],
    },
    academicFields: {
      tagline: "Academic Levels",
      heading: "Data Analysis by Research Stage",
      intro: "From undergraduate survey statistics to doctoral econometric chapters.",
      levels: [
        { id: "dal-1", badge: "Undergrad", title: "Undergraduate Research Projects", description: "Survey data cleaning, descriptive tables, correlation matrices, and basic linear regression.", highlighted: false },
        { id: "dal-2", badge: "Colleges", title: "Master's Empirical Dissertations", description: "Multi-variable regression models, moderation/mediation models, and thematic coding frameworks.", highlighted: true },
        { id: "dal-3", badge: "Doctoral", title: "PhD & Peer-Reviewed Journal Research", description: "Complex structural equation models, longitudinal time-series, and publication-ready tables.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Statistical Rigor",
      heading: "Statistical Integrity & Vetted Data Scientists",
      intro: "Authored by certified statisticians and doctoral methodologists.",
      pillars: [
        { id: "dap-1", icon: "ShieldCheck", accent: "orange", title: "Reproducible Workflows", description: "Full syntax files (SPSS .sps, R scripts) delivered for complete reproducibility." },
        { id: "dap-2", icon: "Calculator", accent: "green", title: "APA 7th Formatting", description: "Every table and chart formatted strictly according to APA 7th guidelines." },
        { id: "dap-3", icon: "Award", accent: "navy", title: "Clear Interpretation", description: "Plain-language academic write-ups explaining statistical significance." },
      ],
      featuredExperts: [
        { id: "dae-1", name: "Dr. Henrik Lindqvist, Ph.D.", credentials: "Ph.D. in Applied Statistics (Stockholm)", experienceLine: "13+ years biostatistics & econometric research consultant", rating: "4.99", papersDelivered: "920+ Data Projects", verified: true },
        { id: "dae-2", name: "Dr. Rachel Green, Ph.D.", credentials: "Ph.D. in Social Research Methodology (LSE)", experienceLine: "10+ years qualitative NVivo thematic coding tutor", rating: "4.97", papersDelivered: "680+ Data Projects", verified: true },
      ],
    },
    faqSection: {
      tagline: "Data FAQs",
      heading: "Frequently Asked Questions About Data Analysis",
      intro: "Common questions on raw data formats, software syntax, and statistical interpretations.",
      items: [
        { id: "daf-1", question: "Do you provide the software code or syntax file?", answer: "Yes, we deliver the annotated syntax file (R script, SPSS .sps, Stata .do) alongside the results chapter." },
        { id: "daf-2", question: "Can you help clean and format raw Excel survey data?", answer: "Yes, our statisticians clean raw data, screen for missing values, test normality assumptions, and compute composite scores." },
      ],
    },
    seo: {
      metaTitle: "Academic Data Analysis & Statistical Reporting | ReadEssay",
      metaDescription: "Quantitative and qualitative data analysis support for research papers. SPSS, R, NVivo, survey data interpretation, and APA tables.",
      canonicalSlug: "data-analysis-research",
    },
  },

  // 15. Scholarly Journal Article Formatting
  {
    id: "sub-journal-article-formatting",
    parentId: "serv-research-paper",
    name: "Scholarly Journal Article Formatting",
    slug: "journal-article-formatting",
    shortIntro: "Target journal submission guideline compliance, manuscript abstract structuring, and peer-review revision memos.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-03",
    heroTagline: "Target Publisher Guidelines & Indexing Compliance",
    heroH1: "Peer-Reviewed Journal Manuscript Formatting & Author Guidelines Compliance",
    heroSummary: "Conform manuscripts strictly to target publisher criteria (Elsevier, Springer, Wiley, IEEE), optimize abstracts, and draft reviewer response tables.",
    specializedAssistance: {
      tagline: "Journal Readiness",
      heading: "Exacting Compliance with Top Peer-Reviewed Publisher Guidelines",
      bodyParagraphs: "Leading peer-reviewed journals enforce strict submission guidelines before sending manuscripts for peer review. We format and review manuscripts to conform to publisher author instructions (Elsevier, Springer Nature, Wiley, Taylor & Francis, IEEE).\n\nEvery submission includes typography standardization, graphical abstract guidance, vector equation formatting, and structured author rebuttal response tables.",
      ctaLabel: "View Journal Formatting",
      ctaUrl: "/services/sub-services/journal-article-formatting",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Publishing Scope",
      heading: "Journal Manuscript Services",
      intro: "End-to-end manuscript preparation for high-impact journal submission.",
      cards: [
        { id: "jaf-1", icon: "FileText", accent: "orange", title: "Publisher Guideline Conformance", description: "Exact compliance with Elsevier, Springer, Wiley, and SAGE author guidelines." },
        { id: "jaf-2", icon: "Search", accent: "green", title: "Structured Abstract Optimization", description: "Background, Methods, Results, and Conclusion word-count optimized for indexing." },
        { id: "jaf-3", icon: "Layers", accent: "navy", title: "Figure & Table Standardization", description: "High-resolution data plates, vector charts, and numbered captions." },
        { id: "jaf-4", icon: "ShieldCheck", accent: "orange", title: "Reviewer Rebuttal Memos", description: "Structured point-by-point author response tables for peer-review resubmissions." },
      ],
    },
    academicFields: {
      tagline: "Journal Tiers",
      heading: "Formatting by Journal Indexing Tier",
      intro: "Prepared for Scopus, Web of Science (Q1/Q2), and PubMed indexed publications.",
      levels: [
        { id: "jafl-1", badge: "Emerging", title: "Conference Proceedings & Symposia", description: "Camera-ready IEEE / ACM two-column conference papers.", highlighted: false },
        { id: "jafl-2", badge: "Colleges", title: "Indexed Journal Submissions (Scopus / WoS)", description: "Standardized manuscripts meeting rigorous peer-review author specifications.", highlighted: true },
        { id: "jafl-3", badge: "Top-Tier", title: "High-Impact Q1 Journals & Letters", description: "Specialized letter formatting with tight word limits and strict graphic requirements.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Publication Standards",
      heading: "Journal Formatting Assurance & Publication Consultants",
      intro: "Managed by published journal peer-reviewers and academic copyeditors.",
      pillars: [
        { id: "jafp-1", icon: "ShieldCheck", accent: "orange", title: "Desk-Reject Prevention", description: "Eliminates administrative desk-rejection due to formatting oversights." },
        { id: "jafp-2", icon: "BookOpen", accent: "green", title: "Reference Style Audit", description: "Every reference checked against target journal citation conventions." },
        { id: "jafp-3", icon: "Award", accent: "navy", title: "Declaration Checklists", description: "COI declarations, data availability statements, and author contribution statements." },
      ],
      featuredExperts: [
        { id: "jafe-1", name: "Prof. Alistair Ross, Ph.D.", credentials: "Ph.D. in Science Communication (Edinburgh)", experienceLine: "18+ years journal editor & publishing advisor", rating: "4.99", papersDelivered: "890+ Manuscripts Formatted", verified: true },
        { id: "jafe-2", name: "Dr. Nadia Karim, Ph.D.", credentials: "Ph.D. in Applied Sciences (McGill)", experienceLine: "11+ years peer-reviewer for Elsevier journals", rating: "4.97", papersDelivered: "640+ Manuscripts Formatted", verified: true },
      ],
    },
    faqSection: {
      tagline: "Journal FAQs",
      heading: "Frequently Asked Questions About Journal Formatting",
      intro: "Common questions on publisher templates, LaTeX, and reviewer responses.",
      items: [
        { id: "jaff-1", question: "Which academic publishers do you support?", answer: "We support Elsevier, Springer Nature, Wiley, IEEE, Taylor & Francis, SAGE, and Oxford University Press." },
        { id: "jaff-2", question: "Can you help draft a point-by-point reviewer response letter?", answer: "Yes, we construct structured response tables addressing each reviewer critique systematically." },
      ],
    },
    seo: {
      metaTitle: "Journal Article Formatting & Publisher Guidelines | ReadEssay",
      metaDescription: "Prepare your scholarly manuscript for peer-reviewed journal submission. Author guidelines compliance, abstract optimization, and citation checks.",
      canonicalSlug: "journal-article-formatting",
    },
  },

  // 16. Academic Plagiarism & Originality Review
  {
    id: "sub-plagiarism-originality-review",
    parentId: "serv-editing-proofreading",
    name: "Academic Plagiarism & Originality Review",
    slug: "plagiarism-originality-review",
    shortIntro: "Detailed similarity index evaluation, paraphrase clarification, and academic integrity alignment checks.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
    heroTagline: "Similarity Index Screening & Integrity Alignment",
    heroH1: "Academic Plagiarism Screening, Paraphrase Refinement & Citation Audits",
    heroSummary: "Similarity report diagnosis, academic paraphrase enhancement, complete attribution cross-checks, and institutional integrity compliance.",
    specializedAssistance: {
      tagline: "Originality Assurance",
      heading: "Protecting Academic Integrity Through Line-by-Line Refinement",
      bodyParagraphs: "Unintentional similarity or incomplete attribution can compromise scholarly work. Our originality review examines text similarity reports and offers academic paraphrasing and citation corrections.\n\nWe help students understand matching text, reformulate phrases into distinctive scholarly prose, and verify all quotation marks and page numbers.",
      ctaLabel: "View Plagiarism Review",
      ctaUrl: "/services/sub-services/plagiarism-originality-review",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Review Modules",
      heading: "Originality Review Capabilities",
      intro: "Comprehensive similarity screening and academic integrity safeguards.",
      cards: [
        { id: "por-1", icon: "Search", accent: "orange", title: "Similarity Diagnosis", description: "Detailed breakdown of matching sources and percentage index analysis." },
        { id: "por-2", icon: "FileText", accent: "green", title: "Scholarly Paraphrasing", description: "Line-by-line reformulation preserving precise technical and theoretical meaning." },
        { id: "por-3", icon: "ShieldCheck", accent: "navy", title: "Quotation & Attribution Audit", description: "Verifying exact quotation marks, blockquote formatting, and author-date citations." },
        { id: "por-4", icon: "Award", accent: "orange", title: "Confidential Screening", description: "Screening performed without storing your document in any institutional repository." },
      ],
    },
    academicFields: {
      tagline: "Paper Types",
      heading: "Originality Review Across Document Types",
      intro: "Safeguarding academic integrity across university coursework and publications.",
      levels: [
        { id: "porl-1", badge: "Undergrad", title: "Undergraduate Essay & Report Screening", description: "Screening term papers and group assignments for unintentional similarity.", highlighted: false },
        { id: "porl-2", badge: "Colleges", title: "Master's Theses & Capstone Projects", description: "Comprehensive similarity audits across 15,000-25,000 word dissertations.", highlighted: true },
        { id: "porl-3", badge: "Doctoral", title: "Doctoral Dissertations & Manuscripts", description: "Full multi-chapter dissertation originality audits before final defense submission.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Confidentiality Standards",
      heading: "Privacy Protocols & Integrity Specialists",
      intro: "Documents are processed under strict zero-repository retention guarantees.",
      pillars: [
        { id: "porp-1", icon: "ShieldCheck", accent: "orange", title: "Zero Repository Storage", description: "Your file is never saved or indexed into any public or university repository." },
        { id: "porp-2", icon: "BookOpen", accent: "green", title: "Expert Paraphrasing", description: "Manual human paraphrasing by subject specialists, never automated spin bots." },
        { id: "porp-3", icon: "Award", accent: "navy", title: "Audit Verification", description: "Clear tracked changes showing exactly how each sentence was improved." },
      ],
      featuredExperts: [
        { id: "pore-1", name: "Dr. Miranda Cole, Ph.D.", credentials: "Ph.D. in Linguistics (Edinburgh)", experienceLine: "12+ years academic integrity consultant & editor", rating: "4.99", papersDelivered: "890+ Integrity Audits", verified: true },
        { id: "pore-2", name: "Jeremy Vance, M.A.", credentials: "M.A. in English (King's College London)", experienceLine: "8+ years academic plagiarism auditor", rating: "4.96", papersDelivered: "610+ Integrity Audits", verified: true },
      ],
    },
    faqSection: {
      tagline: "Integrity FAQs",
      heading: "Frequently Asked Questions About Plagiarism Reviews",
      intro: "Common questions regarding repositories, similarity percentages, and paraphrasing.",
      items: [
        { id: "porf-1", question: "Will scanning my document store it in an institutional repository?", answer: "No. Our screening tools do not index or store your document in any repository, keeping your work 100% private." },
        { id: "porf-2", question: "What is an acceptable similarity percentage?", answer: "Most universities expect similarity under 10-15%, excluding references and direct quotations." },
      ],
    },
    seo: {
      metaTitle: "Academic Plagiarism Review & Originality Auditing | ReadEssay",
      metaDescription: "Confidential academic similarity screening and paraphrase refinement. Ensure verified originality and complete citation integrity.",
      canonicalSlug: "plagiarism-originality-review",
    },
  },

  // 17. APA / Harvard / Chicago Citation Formatting
  {
    id: "sub-citation-style-formatting",
    parentId: "serv-editing-proofreading",
    name: "APA / Harvard / Chicago Citation Formatting",
    slug: "citation-style-formatting",
    shortIntro: "Exacting bibliography curation, in-text citation standardization, footnote formatting, and DOI link checks.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-01",
    heroTagline: "Manual Style Manuals & Reference Verification",
    heroH1: "Citation Style Formatting, In-Text Audits & Bibliography Standardization",
    heroSummary: "Standardize APA 7th, Harvard, Chicago 17th, MLA 9th, and OSCOLA citations, cross-check reference lists, and verify DOI links.",
    specializedAssistance: {
      tagline: "Bibliographic Rigor",
      heading: "Exacting In-Text Citations & Standardized Bibliographies",
      bodyParagraphs: "Meticulous referencing is essential to rigorous scholarship. We standardize in-text citations, footnotes, endnotes, and comprehensive bibliographies according to the latest official style manuals.\n\nEvery source is cross-checked to ensure that every in-text citation appears in the bibliography and all DOI hyperlinks resolve correctly.",
      ctaLabel: "View Citation Formatting",
      ctaUrl: "/services/sub-services/citation-style-formatting",
      youtubeUrl: "https://www.youtube.com/embed/OaqUwnjm9Xo",
    },
    detailedSolutions: {
      tagline: "Style Manuals",
      heading: "Supported Academic Citation Manuals",
      intro: "Exacting formatting strictly aligned to the latest editions of major style guides.",
      cards: [
        { id: "csf-c1", icon: "BookOpen", accent: "orange", title: "APA 7th Edition", description: "Author-date format, journal volume/issue, DOI links, and heading hierarchies." },
        { id: "csf-c2", icon: "FileText", accent: "green", title: "Harvard Referencing", description: "Author (Year) in-text citation rules, page spans, and alphabetical bibliography list." },
        { id: "csf-c3", icon: "Scale", accent: "navy", title: "Chicago 17th & Turabian", description: "Notes-and-bibliography footnotes system or author-date formatting." },
        { id: "csf-c4", icon: "CheckCircle2", accent: "orange", title: "OSCOLA Legal Citation", description: "Footnoted case law, statutes, secondary sources, and legal tables." },
      ],
    },
    academicFields: {
      tagline: "Academic Levels",
      heading: "Citation Standardization Across Academic Papers",
      intro: "Eliminating referencing errors from university coursework to doctoral theses.",
      levels: [
        { id: "csfl-1", badge: "Undergrad", title: "Coursework Reference Lists", description: "Standardizing 10-30 citations into flawless APA or Harvard bibliographies.", highlighted: false },
        { id: "csfl-2", badge: "Colleges", title: "Master's Theses & Extended Essays", description: "Complete audits of 50-100 references ensuring full in-text matching.", highlighted: true },
        { id: "csfl-3", badge: "Doctoral", title: "PhD Dissertations & Book Manuscripts", description: "Exhaustive audits of 200+ references with DOI verification across all entries.", highlighted: false },
      ],
    },
    accountabilitySection: {
      tagline: "Citation Quality",
      heading: "Reference Integrity & Master Bibliographers",
      intro: "Executed by experienced academic bibliographers and librarians.",
      pillars: [
        { id: "csfp-1", icon: "ShieldCheck", accent: "orange", title: "100% Cross-Match", description: "Guaranteed match between every in-text citation and bibliography entry." },
        { id: "csfp-2", icon: "BookOpen", accent: "green", title: "DOI Resolution", description: "Every digital object identifier (DOI) link verified and formatted." },
        { id: "csfp-3", icon: "Award", accent: "navy", title: "Style Manual Conformance", description: "Strict adherence to punctuation, italicization, and capitalization rules." },
      ],
      featuredExperts: [
        { id: "csfe-1", name: "Margaret Holloway, M.L.I.S.", credentials: "Master of Library and Information Science (Sheffield)", experienceLine: "16+ years academic reference librarian", rating: "4.99", papersDelivered: "1,240+ Reference Audits", verified: true },
        { id: "csfe-2", name: "Paul Westerberg, M.A.", credentials: "M.A. in History (Durham)", experienceLine: "10+ years Chicago & Turabian specialist", rating: "4.97", papersDelivered: "780+ Reference Audits", verified: true },
      ],
    },
    faqSection: {
      tagline: "Citation FAQs",
      heading: "Frequently Asked Questions About Citation Formatting",
      intro: "Common questions on citation conversions, DOIs, and missing details.",
      items: [
        { id: "csff-1", question: "Can you convert an entire bibliography from Harvard to APA 7th?", answer: "Yes, we specialize in converting complete reference lists across different academic style manuals." },
        { id: "csff-2", question: "What happens if a source is missing volume numbers or DOIs?", answer: "Our bibliographers search CrossRef and academic publisher databases to locate missing publication details." },
      ],
    },
    seo: {
      metaTitle: "Citation Style Formatting & Bibliography Checks | ReadEssay",
      metaDescription: "Professional academic citation formatting for APA, Harvard, Chicago, MLA, and OSCOLA. Complete bibliography audits and DOI verification.",
      canonicalSlug: "citation-style-formatting",
    },
  },
];

/**
 * Helpers to query mock services
 */
export function getParentService(
  mainServices: MainService[],
  identifier: string // Can be id or slug
): MainService | undefined {
  return mainServices.find(
    (s) => s.id === identifier || s.slug === identifier
  );
}

export function getSubServicesForParent(
  subServices: SubService[],
  parentId: string
): SubService[] {
  return subServices.filter((sub) => sub.parentId === parentId);
}

export function getServiceBySlug(slug: string): MainService | undefined {
  return INITIAL_MAIN_SERVICES.find((s) => s.slug === slug);
}

export function getSubServiceBySlug(slug: string): SubService | undefined {
  return INITIAL_SUB_SERVICES.find((sub) => sub.slug === slug);
}
