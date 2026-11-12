export type ServiceStatus = "active" | "draft" | "archived";

export interface MainService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  status: ServiceStatus;
  displayOrder: number;
  updatedAt: string;
}

export interface SubService {
  id: string;
  parentId: string; // References MainService.id
  name: string;
  slug: string;
  shortDescription: string;
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
    name: "Assignment Help",
    slug: "assignment-help",
    shortDescription:
      "Comprehensive subject-specific academic assignment assistance, problem-solving, and structured coursework guidance.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "serv-dissertation-thesis",
    name: "Dissertation & Thesis Help",
    slug: "dissertation-thesis-help",
    shortDescription:
      "Postgraduate thesis drafting, chapter-by-chapter guidance, methodology formulation, and literature review support.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-08",
  },
  {
    id: "serv-essay-writing",
    name: "Essay Writing Service",
    slug: "essay-writing-service",
    shortDescription:
      "Custom scholarly essays, argumentative papers, critical reflections, and admissions essays tailored to academic standards.",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-09",
  },
  {
    id: "serv-coursework-homework",
    name: "Coursework & Homework Help",
    slug: "coursework-homework-help",
    shortDescription:
      "Modular coursework completion, problem sets, case briefs, and continuous assessment exercises across disciplines.",
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-05",
  },
  {
    id: "serv-research-paper",
    name: "Research Paper Writing",
    slug: "research-paper-writing",
    shortDescription:
      "Empirical research papers, journal articles, conceptual frameworks, and systematic literature reviews for publication.",
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-07",
  },
  {
    id: "serv-editing-proofreading",
    name: "Editing & Proofreading",
    slug: "editing-proofreading",
    shortDescription:
      "Rigorous academic proofreading, syntax refinement, structural critiquing, and referencing style compliance.",
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
    shortDescription:
      "Financial reporting, balance sheet evaluations, managerial accounting models, and auditing problem sets.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
  },
  {
    id: "sub-corporate-finance",
    parentId: "serv-assignment-help",
    name: "Corporate Finance Assignment Help",
    slug: "corporate-finance-assignment-help",
    shortDescription:
      "Capital budgeting, discounted cash flow valuation, financial statement ratios, and portfolio risk management.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-11",
  },
  {
    id: "sub-nursing-healthcare",
    parentId: "serv-assignment-help",
    name: "Nursing & Healthcare Assignment Help",
    slug: "nursing-healthcare-assignment-help",
    shortDescription:
      "Evidence-based nursing practice papers, clinical case studies, patient care plans, and health informatics.",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-business-management",
    parentId: "serv-assignment-help",
    name: "Business Management Assignment Help",
    slug: "business-management-assignment-help",
    shortDescription:
      "Strategic SWOT/PESTLE evaluations, organizational behavior case papers, and operational management models.",
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-09",
  },
  {
    id: "sub-computer-science",
    parentId: "serv-assignment-help",
    name: "Computer Science Assignment Help",
    slug: "computer-science-assignment-help",
    shortDescription:
      "Algorithm design, relational database schemas, software architecture documentation, and data structure reports.",
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
    shortDescription:
      "Research question definition, literature rationale, methodology justification, and ethics board application drafting.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-09",
  },
  {
    id: "sub-phd-thesis-writing",
    parentId: "serv-dissertation-thesis",
    name: "PhD Thesis Writing Guidance",
    slug: "phd-thesis-writing",
    shortDescription:
      "Doctoral dissertation structuring, multi-chapter drafting, empirical analysis discussion, and theoretical defense prep.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-07",
  },
  {
    id: "sub-literature-review-synthesis",
    parentId: "serv-dissertation-thesis",
    name: "Literature Review Synthesis",
    slug: "literature-review-synthesis",
    shortDescription:
      "Thematic synthesis of peer-reviewed sources, conceptual framework mapping, and research gap identification.",
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
    shortDescription:
      "Persuasive thesis statement formulation, empirical evidence integration, and structured counter-argument rebuttals.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-college-admission-essay",
    parentId: "serv-essay-writing",
    name: "College Admission & Personal Statement",
    slug: "college-admission-essay",
    shortDescription:
      "Distinctive personal narrative crafting, academic statement of purpose, and university admissions essays.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-06",
  },
  {
    id: "sub-reflective-critical-essay",
    parentId: "serv-essay-writing",
    name: "Reflective & Critical Essay Help",
    slug: "reflective-critical-essay",
    shortDescription:
      "Experiential reflection frameworks (Gibbs/Kolb), pedagogical evaluations, and critical academic critiques.",
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
    shortDescription:
      "IRAC legal problem questions, judicial case brief summaries, statutory interpretation, and commercial law essays.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-08",
  },
  {
    id: "sub-engineering-coursework",
    parentId: "serv-coursework-homework",
    name: "Engineering & Technical Coursework",
    slug: "engineering-coursework",
    shortDescription:
      "Technical laboratory write-ups, engineering calculation solutions, and systems performance reports.",
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
    shortDescription:
      "SPSS, R, and NVivo statistical analysis reporting, survey data interpretation, and thematic qualitative coding.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-11",
  },
  {
    id: "sub-journal-article-formatting",
    parentId: "serv-research-paper",
    name: "Scholarly Journal Article Formatting",
    slug: "journal-article-formatting",
    shortDescription:
      "Target journal submission guideline compliance, manuscript abstract structuring, and peer-review revision memos.",
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
    shortDescription:
      "Detailed similarity index evaluation, paraphrase clarification, and academic integrity alignment checks.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "sub-citation-style-formatting",
    parentId: "serv-editing-proofreading",
    name: "APA / Harvard / Chicago Citation Formatting",
    slug: "citation-style-formatting",
    shortDescription:
      "Exacting bibliography curation, in-text citation standardization, footnote formatting, and DOI link checks.",
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

