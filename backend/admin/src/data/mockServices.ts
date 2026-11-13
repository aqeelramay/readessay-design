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

export interface SubService {
  id: string;
  parentId: string; // References MainService.id
  name: string;
  slug: string;
  heroTitle: string;
  shortDescription: string;
  overviewContent: string;
  highlights: string[];
  faqs: FAQItem[];
  seo: ServiceSEO;
  status: ServiceStatus;
  displayOrder: number;
  updatedAt: string;
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
  // Sub-services for "Assignment Help" (serv-assignment-help)
  {
    id: "sub-accounting-assignment",
    parentId: "serv-assignment-help",
    name: "Accounting Assignment Help",
    slug: "accounting-assignment-help",
    heroTitle: "Professional Accounting & Financial Reporting Assignment Help",
    shortDescription:
      "Financial reporting, balance sheet evaluations, managerial accounting models, and auditing problem sets.",
    overviewContent:
      "Our accounting assignment assistance covers financial accounting, managerial accounting, international financial reporting standards (IFRS), and GAAP compliance. Specialists provide step-by-step calculation workings and analytical business memos.",
    highlights: [
      "Balance sheet reconciliation and cash flow statement calculations",
      "Cost-volume-profit (CVP) analysis and variance reporting",
      "Corporate tax calculations and statutory auditing case studies",
      "Working papers and financial ratio interpretations",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do you include Excel spreadsheets with calculation formulas?",
        answer:
          "Yes. Numerical solutions include annotated Excel workbooks showing live formulas alongside the narrative academic report.",
      },
    ],
    seo: {
      metaTitle: "Accounting Assignment Help & Financial Reporting | ReadEssay",
      metaDescription:
        "University accounting assignment assistance. IFRS, managerial accounting, financial ratios, and balance sheet calculations.",
      canonicalSlug: "accounting-assignment-help",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
  },
  {
    id: "sub-corporate-finance",
    parentId: "serv-assignment-help",
    name: "Corporate Finance Assignment Help",
    slug: "corporate-finance-assignment-help",
    heroTitle: "Advanced Corporate Finance & Investment Valuation Assignment Support",
    shortDescription:
      "Capital budgeting, discounted cash flow valuation, financial statement ratios, and portfolio risk management.",
    overviewContent:
      "Corporate finance assignments demand deep mastery of capital structure theories, weighted average cost of capital (WACC), mergers and acquisitions modeling, and CAPM portfolio analysis. Our finance specialists provide rigorous mathematical derivations.",
    highlights: [
      "Discounted cash flow (DCF) and Net Present Value (NPV) modeling",
      "CAPM risk-return evaluations and efficient frontier analysis",
      "Bond and equity valuation with market multiple comparisons",
      "Mergers, acquisitions, and leveraged buyout (LBO) case analyses",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can your specialists solve Bloomberg or FactSet financial terminal assignments?",
        answer:
          "Yes, our corporate finance team works with financial market terminal data and empirical portfolio datasets.",
      },
    ],
    seo: {
      metaTitle: "Corporate Finance Assignment Help & DCF Modeling | ReadEssay",
      metaDescription:
        "Postgraduate and undergraduate corporate finance assignment assistance. Capital budgeting, DCF valuation, and portfolio risk analysis.",
      canonicalSlug: "corporate-finance-assignment-help",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-11",
  },
  {
    id: "sub-nursing-healthcare",
    parentId: "serv-assignment-help",
    name: "Nursing & Healthcare Assignment Help",
    slug: "nursing-healthcare-assignment-help",
    heroTitle: "Evidence-Based Nursing & Healthcare Practice Assignment Support",
    shortDescription:
      "Evidence-based nursing practice papers, clinical case studies, patient care plans, and health informatics.",
    overviewContent:
      "Nursing coursework requires bridging theoretical healthcare models with clinical practice guidelines. Our nursing specialists hold active clinical or postgraduate healthcare degrees and assist with clinical case audits, care plans, and public health policy critiques.",
    highlights: [
      "Evidence-based practice (EBP) research with PICOT question framing",
      "Holistic patient nursing care plans using recognized clinical taxonomies",
      "Healthcare ethics, patient autonomy, and clinical governance audits",
      "Epidemiological data evaluation and healthcare policy analysis",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do you follow NMC, AACN, or specific national nursing guidelines?",
        answer:
          "Yes. Our nursing papers are aligned with regional healthcare regulatory frameworks including NMC (UK), AACN (US), and NMBA (Australia).",
      },
    ],
    seo: {
      metaTitle: "Nursing & Healthcare Assignment Help | ReadEssay",
      metaDescription:
        "Evidence-based nursing assignment guidance. Clinical case studies, PICOT questions, and patient care plans aligned with healthcare standards.",
      canonicalSlug: "nursing-healthcare-assignment-help",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-business-management",
    parentId: "serv-assignment-help",
    name: "Business Management Assignment Help",
    slug: "business-management-assignment-help",
    heroTitle: "Strategic Business Management & Organizational Case Study Solutions",
    shortDescription:
      "Strategic SWOT/PESTLE evaluations, organizational behavior case papers, and operational management models.",
    overviewContent:
      "Business management coursework synthesizes strategic frameworks, operational supply chain theories, and organizational leadership principles. We assist MBA and undergraduate business students in developing rigorous strategic plans.",
    highlights: [
      "Strategic framework application: Porter's Five Forces, VRIO, and PESTLE",
      "Organizational behavior case studies and change management analysis",
      "Supply chain logistics and total quality management (TQM) evaluations",
      "Executive summaries and corporate board briefing memos",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can you analyze specific real-world corporate case studies?",
        answer:
          "Yes. We analyze Harvard Business Review (HBR) case studies, corporate annual reports, and contemporary business disruptions.",
      },
    ],
    seo: {
      metaTitle: "Business Management Assignment Help & Case Studies | ReadEssay",
      metaDescription:
        "University business management assignment help. Strategic analysis, organizational behavior, Porter's Five Forces, and MBA case studies.",
      canonicalSlug: "business-management-assignment-help",
    },
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-09",
  },
  {
    id: "sub-computer-science",
    parentId: "serv-assignment-help",
    name: "Computer Science Assignment Help",
    slug: "computer-science-assignment-help",
    heroTitle: "Computer Science, Software Engineering & Systems Architecture Help",
    shortDescription:
      "Algorithm design, relational database schemas, software architecture documentation, and data structure reports.",
    overviewContent:
      "Computer science coursework requires clear technical prose alongside theoretical computation analysis. We assist students with algorithm complexity breakdowns (Big-O), relational database ER diagrams, network protocol evaluations, and cybersecurity audits.",
    highlights: [
      "Asymptotic time and space complexity analysis (Big-O notation)",
      "Database entity-relationship (ER) diagrams and 3NF normalization reports",
      "Software architecture design documentation (UML sequence and class diagrams)",
      "Cybersecurity vulnerability assessments and threat modeling frameworks",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do you provide UML diagrams and architecture flowcharts?",
        answer:
          "Yes. Technical documentation includes professional vector UML diagrams, architectural schematics, and schema definitions.",
      },
    ],
    seo: {
      metaTitle: "Computer Science Assignment Help & Systems Reports | ReadEssay",
      metaDescription:
        "Academic computer science assignment help. Algorithm analysis, database normalization, software architecture, and technical reports.",
      canonicalSlug: "computer-science-assignment-help",
    },
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-08",
  },

  // Sub-services for "Dissertation & Thesis Help" (serv-dissertation-thesis)
  {
    id: "sub-dissertation-proposal",
    parentId: "serv-dissertation-thesis",
    name: "Dissertation Proposal Help",
    slug: "dissertation-proposal-help",
    heroTitle: "Comprehensive Dissertation Proposal & Research Rationale Drafting",
    shortDescription:
      "Research question definition, literature rationale, methodology justification, and ethics board application drafting.",
    overviewContent:
      "A successful dissertation proposal establishes the academic significance, theoretical viability, and methodological roadmap of postgraduate research. Our consultants help candidates refine research hypotheses and build defensible research proposals.",
    highlights: [
      "Rigorous problem statement formulation and research question framing",
      "Preliminary literature synthesis demonstrating conceptual novelty",
      "Detailed methodological blueprint and sampling strategy design",
      "Ethics assessment and risk mitigation strategy planning",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What is typically included in a dissertation proposal?",
        answer:
          "Proposals generally include a project title, introduction, research questions, literature review, methodology, ethical considerations, and research timeline.",
      },
    ],
    seo: {
      metaTitle: "Dissertation Proposal Help & Research Planning | ReadEssay",
      metaDescription:
        "Postgraduate dissertation proposal assistance. Research questions, conceptual frameworks, methodology design, and ethics statements.",
      canonicalSlug: "dissertation-proposal-help",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-09",
  },
  {
    id: "sub-phd-thesis-writing",
    parentId: "serv-dissertation-thesis",
    name: "PhD Thesis Writing Guidance",
    slug: "phd-thesis-writing",
    heroTitle: "Doctoral PhD Thesis Advisory, Chapter Structuring & Defense Prep",
    shortDescription:
      "Doctoral dissertation structuring, multi-chapter drafting, empirical analysis discussion, and theoretical defense prep.",
    overviewContent:
      "Navigating doctoral research requires continuous synthesis of high-level academic theory with novel empirical findings. Our PhD consultants provide chapter-by-chapter critique and theoretical defense preparation.",
    highlights: [
      "Advisory from PhD-holding academics with successful supervisory records",
      "Critical synthesis connecting empirical discoveries with foundational theories",
      "Chapter progression coherence audits from Introduction through Discussion",
      "Viva voce oral defense simulation and question-answer strategy coaching",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "How do you ensure candidate research remains confidential?",
        answer:
          "All doctoral consultations operate under non-disclosure agreements, protecting proprietary data, patentable findings, and unpublished manuscripts.",
      },
    ],
    seo: {
      metaTitle: "PhD Thesis Writing Guidance & Viva Preparation | ReadEssay",
      metaDescription:
        "Doctoral dissertation advisory and chapter structuring from experienced PhD academics. Theoretical defense preparation and methodology audits.",
      canonicalSlug: "phd-thesis-writing",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-07",
  },
  {
    id: "sub-literature-review-synthesis",
    parentId: "serv-dissertation-thesis",
    name: "Literature Review Synthesis",
    slug: "literature-review-synthesis",
    heroTitle: "Systematic Literature Review & Thematic Theoretical Synthesis",
    shortDescription:
      "Thematic synthesis of peer-reviewed sources, conceptual framework mapping, and research gap identification.",
    overviewContent:
      "A robust literature review does not merely summarize past work; it critically evaluates theoretical tensions and establishes the rationale for new empirical research. We guide students in executing systematic and narrative literature reviews.",
    highlights: [
      "Systematic search protocols aligned with PRISMA guidelines where applicable",
      "Thematic clustering and conceptual matrix mapping across sources",
      "Critical appraisal of empirical methodologies and sample limitations",
      "Explicit identification of unaddressed theoretical and empirical gaps",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can you provide a PRISMA flow diagram for systematic reviews?",
        answer:
          "Yes. For systematic literature reviews, we provide PRISMA-compliant flowcharts tracking inclusion and exclusion criteria.",
      },
    ],
    seo: {
      metaTitle: "Literature Review Synthesis & Conceptual Mapping | ReadEssay",
      metaDescription:
        "Systematic and narrative literature reviews for Master's and PhD research. PRISMA protocols, thematic matrix analysis, and research gap discovery.",
      canonicalSlug: "literature-review-synthesis",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-04",
  },

  // Sub-services for "Essay Writing Service" (serv-essay-writing)
  {
    id: "sub-argumentative-essay",
    parentId: "serv-essay-writing",
    name: "Argumentative Essay Writing",
    slug: "argumentative-essay-writing",
    heroTitle: "Persuasive Argumentative Academic Essays with Empirical Evidence",
    shortDescription:
      "Persuasive thesis statement formulation, empirical evidence integration, and structured counter-argument rebuttals.",
    overviewContent:
      "Argumentative essays require defending an academic stance against opposing viewpoints using rigorous scholarly citations. Our essay specialists construct clear, logically sound arguments with robust evidentiary backing.",
    highlights: [
      "Clear, defensible thesis statements formulated in introductory sections",
      "Balanced presentation of counter-arguments followed by logical refutations",
      "Exacting evidentiary citations from peer-reviewed university journals",
      "Logical paragraph transitions creating seamless academic reading flow",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do you include opposing viewpoints in argumentative essays?",
        answer:
          "Yes. Effective academic argumentation requires addressing strong counter-arguments and systematically explaining their evidentiary shortcomings.",
      },
    ],
    seo: {
      metaTitle: "Argumentative Essay Writing Services | ReadEssay",
      metaDescription:
        "Expert assistance with argumentative academic essays. Thesis statement formulation, empirical citations, and counter-argument rebuttals.",
      canonicalSlug: "argumentative-essay-writing",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-college-admission-essay",
    parentId: "serv-essay-writing",
    name: "College Admission & Personal Statement",
    slug: "college-admission-essay",
    heroTitle: "Personal Statements & University College Admissions Essays",
    shortDescription:
      "Distinctive personal narrative crafting, academic statement of purpose, and university admissions essays.",
    overviewContent:
      "Admissions essays and personal statements allow candidates to communicate their unique academic trajectory, leadership experiences, and intellectual motivations to university selection committees.",
    highlights: [
      "Distinctive narrative voice highlighting individual academic achievements",
      "Alignment with institutional values and departmental research profiles",
      "Tight word-count compliance and crisp rhetorical precision",
      "Elimination of generic clichés in favor of concrete illustrative examples",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do you assist with UCAS, Common App, and postgraduate statements?",
        answer:
          "Yes, we support undergraduate Common App, UCAS personal statements, and postgraduate Master's / PhD statements of purpose.",
      },
    ],
    seo: {
      metaTitle: "College Admission Essays & Personal Statements | ReadEssay",
      metaDescription:
        "Compelling university admissions essays and personal statements. Vetted academic editors helping you communicate your intellectual passion.",
      canonicalSlug: "college-admission-essay",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-06",
  },
  {
    id: "sub-reflective-critical-essay",
    parentId: "serv-essay-writing",
    name: "Reflective & Critical Essay Help",
    slug: "reflective-critical-essay",
    heroTitle: "Reflective Learning Journals & Critical Academic Essay Assistance",
    shortDescription:
      "Experiential reflection frameworks (Gibbs/Kolb), pedagogical evaluations, and critical academic critiques.",
    overviewContent:
      "Reflective essays require students to analyze professional practice and personal learning experiences through established pedagogical frameworks. We assist students in nursing, education, and business with structured reflective writing.",
    highlights: [
      "Rigorous application of Gibbs' Reflective Cycle, Kolb's Learning Cycle, and Schön",
      "Critical connection between practical clinical/teaching actions and literature",
      "First-person academic prose balanced with objective empirical references",
      "Constructive action plans for future professional competence enhancement",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Which reflective cycles do your specialists utilize?",
        answer:
          "We work with Gibbs' Reflective Cycle (1988), Kolb's Experiential Learning, Schön's Reflection-in-Action, and Johns' Model of Structured Reflection.",
      },
    ],
    seo: {
      metaTitle: "Reflective & Critical Essay Writing Help | ReadEssay",
      metaDescription:
        "Academic assistance with reflective learning journals and essays. Gibbs, Kolb, and Schön framework applications with scholarly citations.",
      canonicalSlug: "reflective-critical-essay",
    },
    status: "draft",
    displayOrder: 3,
    updatedAt: "2026-11-02",
  },

  // Sub-services for "Coursework & Homework Help" (serv-coursework-homework)
  {
    id: "sub-law-legal-coursework",
    parentId: "serv-coursework-homework",
    name: "Law & Legal Studies Coursework",
    slug: "law-legal-coursework",
    heroTitle: "University Law Coursework, IRAC Case Analysis & Statutory Interpretation",
    shortDescription:
      "IRAC legal problem questions, judicial case brief summaries, statutory interpretation, and commercial law essays.",
    overviewContent:
      "Legal studies require precise application of common law precedents, statutory provisions, and doctrinal principles. Our law specialists assist with contract, tort, criminal, constitutional, and international law coursework using the IRAC method.",
    highlights: [
      "Structured IRAC (Issue, Rule, Application, Conclusion) problem solving",
      "Exacting citation of judicial case law and statutory legislation (OSCOLA compliant)",
      "Critical commentary on doctrinal reform and judicial reasoning",
      "Commercial, maritime, human rights, and corporate legal analysis",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Do your legal specialists use OSCOLA referencing?",
        answer:
          "Yes. Our UK and common-law coursework solutions strictly adhere to the Oxford Standard for Citation of Legal Authorities (OSCOLA).",
      },
    ],
    seo: {
      metaTitle: "Law Coursework Help & IRAC Problem Questions | ReadEssay",
      metaDescription:
        "University law coursework assistance. IRAC problem answers, judicial precedent citations, and OSCOLA-formatted legal essays.",
      canonicalSlug: "law-legal-coursework",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-08",
  },
  {
    id: "sub-engineering-coursework",
    parentId: "serv-coursework-homework",
    name: "Engineering & Technical Coursework",
    slug: "engineering-coursework",
    heroTitle: "Technical Engineering Coursework, Laboratory Write-ups & Problem Sets",
    shortDescription:
      "Technical laboratory write-ups, engineering calculation solutions, and systems performance reports.",
    overviewContent:
      "Engineering coursework requires balancing mathematical calculation accuracy with structured technical documentation. We support mechanical, civil, electrical, and biomedical engineering students.",
    highlights: [
      "Step-by-step mathematical calculations with standard SI unit checks",
      "Circuit analysis, finite element method reviews, and structural load calculations",
      "Annotated technical schematics and engineering graphs",
      "Clear methodology documentation for laboratory experiment write-ups",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can you assist with MATLAB or CAD simulation reports?",
        answer:
          "Yes. Our engineering academics provide technical report write-ups interpreting MATLAB, Simulink, and ANSYS simulation outputs.",
      },
    ],
    seo: {
      metaTitle: "Engineering Coursework Help & Technical Reports | ReadEssay",
      metaDescription:
        "Technical engineering coursework solutions and laboratory write-ups across mechanical, electrical, and civil engineering disciplines.",
      canonicalSlug: "engineering-coursework",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-05",
  },

  // Sub-services for "Research Paper Writing" (serv-research-paper)
  {
    id: "sub-data-analysis-research",
    parentId: "serv-research-paper",
    name: "Quantitative & Qualitative Data Analysis",
    slug: "data-analysis-research",
    heroTitle: "Empirical Data Analysis, Statistical Reporting & Thematic Qualitative Coding",
    shortDescription:
      "SPSS, R, and NVivo statistical analysis reporting, survey data interpretation, and thematic qualitative coding.",
    overviewContent:
      "Extracting valid empirical insights requires rigorous statistical modeling or systematic qualitative coding. We guide researchers in executing descriptive statistics, multivariate regression, ANOVA, SEM, and thematic Braun & Clarke analysis.",
    highlights: [
      "Quantitative statistical testing using SPSS, R, Stata, and Python",
      "Qualitative thematic analysis using Braun & Clarke's six-phase methodology",
      "Clear APA-formatted statistical tables and visual data figures",
      "Detailed interpretation of p-values, effect sizes, and confidence intervals",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can you help interpret statistical software output files?",
        answer:
          "Yes. Provide your raw SPSS or R output files, and our statisticians will draft an academic findings chapter with clear APA tables.",
      },
    ],
    seo: {
      metaTitle: "Academic Data Analysis & Statistical Reporting | ReadEssay",
      metaDescription:
        "Quantitative and qualitative data analysis support for research papers. SPSS, R, NVivo, survey data interpretation, and APA tables.",
      canonicalSlug: "data-analysis-research",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-11",
  },
  {
    id: "sub-journal-article-formatting",
    parentId: "serv-research-paper",
    name: "Scholarly Journal Article Formatting",
    slug: "journal-article-formatting",
    heroTitle: "Peer-Reviewed Journal Manuscript Formatting & Author Guidelines Compliance",
    shortDescription:
      "Target journal submission guideline compliance, manuscript abstract structuring, and peer-review revision memos.",
    overviewContent:
      "Leading peer-reviewed journals enforce strict submission formatting. We review and format manuscripts to conform to publisher author guidelines (Elsevier, Springer, Wiley, Taylor & Francis, IEEE).",
    highlights: [
      "Exact compliance with target journal author submission criteria",
      "Optimization of structured abstracts, keywords, and graphical highlights",
      "Formatting of figure captions, vector equations, and high-res data plates",
      "Creation of structured author response tables for peer-review resubmissions",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Which academic publishers do you support?",
        answer:
          "We format manuscripts for all major publisher houses including Elsevier, Springer Nature, Wiley, SAGE, Oxford University Press, and IEEE.",
      },
    ],
    seo: {
      metaTitle: "Journal Article Formatting & Publisher Guidelines | ReadEssay",
      metaDescription:
        "Prepare your scholarly manuscript for peer-reviewed journal submission. Author guidelines compliance, abstract optimization, and citation checks.",
      canonicalSlug: "journal-article-formatting",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-03",
  },

  // Sub-services for "Editing & Proofreading" (serv-editing-proofreading)
  {
    id: "sub-plagiarism-originality-review",
    parentId: "serv-editing-proofreading",
    name: "Academic Plagiarism & Originality Review",
    slug: "plagiarism-originality-review",
    heroTitle: "Academic Plagiarism Screening, Paraphrase Refinement & Citation Audits",
    shortDescription:
      "Detailed similarity index evaluation, paraphrase clarification, and academic integrity alignment checks.",
    overviewContent:
      "Unintentional similarity or incomplete attribution can compromise scholarly work. Our originality review examines text similarity reports and offers academic paraphrasing and citation corrections.",
    highlights: [
      "Screening against vast academic databases and peer-reviewed publications",
      "Line-by-line paraphrase enhancement preserving technical meaning",
      "Correction of missing or incomplete bibliographic attributions",
      "Full compliance with university academic integrity frameworks",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Will scanning my document store it in an institutional repository?",
        answer:
          "No. Our screening tools do not index or store your document in any public or institutional repository, keeping your work 100% private.",
      },
    ],
    seo: {
      metaTitle: "Academic Plagiarism Review & Originality Auditing | ReadEssay",
      metaDescription:
        "Confidential academic similarity screening and paraphrase refinement. Ensure verified originality and complete citation integrity.",
      canonicalSlug: "plagiarism-originality-review",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-citation-style-formatting",
    parentId: "serv-editing-proofreading",
    name: "APA / Harvard / Chicago Citation Formatting",
    slug: "citation-style-formatting",
    heroTitle: "Citation Style Formatting, In-Text Audits & Bibliography Standardization",
    shortDescription:
      "Exacting bibliography curation, in-text citation standardization, footnote formatting, and DOI link checks.",
    overviewContent:
      "Meticulous referencing is essential to rigorous scholarship. We standardize in-text citations, footnotes, endnotes, and comprehensive bibliographies according to the latest official style manuals.",
    highlights: [
      "Full compliance with APA 7th, Harvard, Chicago 17th, MLA 9th, and OSCOLA",
      "Automated cross-check ensuring every in-text citation appears in the bibliography",
      "Verification of author surnames, publication years, page spans, and DOI links",
      "Standardization of journal title abbreviations and electronic resource URLs",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Can you convert an entire dissertation from Harvard to APA 7th?",
        answer:
          "Yes. We specialize in converting entire reference lists and in-text citation styles across different academic manuals.",
      },
    ],
    seo: {
      metaTitle: "Citation Style Formatting & Bibliography Checks | ReadEssay",
      metaDescription:
        "Professional academic citation formatting for APA, Harvard, Chicago, MLA, and OSCOLA. Complete bibliography audits and DOI verification.",
      canonicalSlug: "citation-style-formatting",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-01",
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
