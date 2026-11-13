export type SampleStatus = "active" | "draft" | "archived";

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
  updatedAt: string;
  seo: SampleSectionSEO;
}

export interface AcademicSampleFile {
  fileName: string;
  fileType: "PDF" | "DOCX";
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
  documentFile: AcademicSampleFile;
  status: SampleStatus;
  displayOrder: number;
  updatedAt: string;
}

export const INITIAL_SAMPLE_SECTIONS: SampleSection[] = [
  {
    id: "sec-1",
    heading: "Accounting & Corporate Finance",
    shortSummary:
      "Our accounting and finance samples demonstrate rigorous quantitative ledger analysis, cash flow cycle modeling, IFRS/GAAP compliance, and working capital optimization.",
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
    seo: {
      metaTitle: "Accounting & Corporate Finance Samples | ReadEssay",
      metaDescription:
        "Exemplar academic accounting and corporate finance research papers, audits, and financial analysis models.",
    },
  },
  {
    id: "sec-2",
    heading: "Business & Management Assignments",
    shortSummary:
      "Comprehensive business assignment samples showcasing strategic framework application (SWOT, PESTLE, Porter’s Five Forces, VRIO), organizational change management, and executive decision-making.",
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-11",
    seo: {
      metaTitle: "Business & Management Academic Samples | ReadEssay",
      metaDescription:
        "Downloadable business management case studies, executive reports, and strategic plans.",
    },
  },
  {
    id: "sec-3",
    heading: "Economics & Econometrics",
    shortSummary:
      "Empirical economic samples focusing on micro/macroeconomic models, econometric regression analysis in R and Stata, and international trade policy evaluations.",
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-10",
    seo: {
      metaTitle: "Economics & Econometrics Academic Samples | ReadEssay",
      metaDescription:
        "Peer-reviewed economic models, policy briefs, and econometric regression write-ups.",
    },
  },
  {
    id: "sec-4",
    heading: "English & Literature",
    shortSummary:
      "Exemplary literary criticism, comparative rhetorical essays, and textual deconstruction formatted to modern MLA and Chicago guidelines.",
    status: "active",
    displayOrder: 4,
    updatedAt: "2026-11-08",
    seo: {
      metaTitle: "English Literature Essays & Samples | ReadEssay",
      metaDescription:
        "Critical essays, post-colonial literary analysis, and textual deconstruction exemplars.",
    },
  },
  {
    id: "sec-5",
    heading: "Law & Jurisprudence",
    shortSummary:
      "Strict IRAC/CRAC legal reasoning, statutory interpretation, tort liability assessments, and precedent case briefs conforming to OSCOLA and Bluebook standards.",
    status: "active",
    displayOrder: 5,
    updatedAt: "2026-11-06",
    seo: {
      metaTitle: "Law & Jurisprudence Academic Samples | ReadEssay",
      metaDescription:
        "Legal case briefs, tort liability analyses, and international regulatory law reviews.",
    },
  },
  {
    id: "sec-6",
    heading: "Mathematics & Statistics",
    shortSummary:
      "Step-by-step mathematical proofs, statistical hypothesis testing (ANOVA, Chi-square, regression), and computational algorithms with formatted LaTeX equations.",
    status: "active",
    displayOrder: 6,
    updatedAt: "2026-11-05",
    seo: {
      metaTitle: "Mathematics & Statistics Academic Samples | ReadEssay",
      metaDescription:
        "LaTeX problem sets, Bayesian multilevel models, and mathematical proofs.",
    },
  },
  {
    id: "sec-7",
    heading: "Psychology & Behavioral Sciences",
    shortSummary:
      "Rigorous empirical write-ups, DSM-5 case conceptualizations, cognitive bias investigations, and clinical trial reviews adhering to APA 7th standards.",
    status: "active",
    displayOrder: 7,
    updatedAt: "2026-11-03",
    seo: {
      metaTitle: "Psychology & Behavioral Sciences Samples | ReadEssay",
      metaDescription:
        "Empirical reviews, DSM-5 clinical case studies, and cognitive psychology research papers.",
    },
  },
];

export const INITIAL_ACADEMIC_SAMPLES: AcademicSample[] = [
  // Section 1: Accounting & Corporate Finance
  {
    id: "smp-1",
    sectionId: "sec-1",
    title:
      "The Characteristics of a Firm with a Long Operating Cycle & Cash Flow",
    pageCount: 2,
    academicLevel: "Masters Degree",
    documentType: "Financial Analysis Q&A",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Software Used",
    customMetaValue: "Excel • Solver",
    documentFile: {
      fileName: "Operating_Cycle_Cash_Flow_Analysis.pdf",
      fileType: "PDF",
      fileSize: "1.4 MB",
      fileUrl: "/samples/accounting/Operating_Cycle_Cash_Flow_Analysis.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-12",
  },
  {
    id: "smp-2",
    sectionId: "sec-1",
    title: "Cadbury Beverages & CRUSH Brands Working Capital Audit",
    pageCount: 6,
    academicLevel: "Undergraduate",
    documentType: "Case Study",
    citationStyle: "Harvard Format",
    customMetaLabel: "Audit Scope",
    customMetaValue: "GAAP Ratio Benchmarks",
    documentFile: {
      fileName: "Cadbury_Working_Capital_Audit.docx",
      fileType: "DOCX",
      fileSize: "840 KB",
      fileUrl: "/samples/accounting/Cadbury_Working_Capital_Audit.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-11",
  },
  {
    id: "smp-3",
    sectionId: "sec-1",
    title: "Arthur Andersen & Enron Ethics & Financial Reporting Failure",
    pageCount: 4,
    academicLevel: "Masters",
    documentType: "Research Report",
    citationStyle: "Chicago 17th",
    customMetaLabel: "Ethics Standard",
    customMetaValue: "SOX Act Compliance",
    documentFile: {
      fileName: "Andersen_Enron_Reporting_Ethics.pdf",
      fileType: "PDF",
      fileSize: "2.1 MB",
      fileUrl: "/samples/accounting/Andersen_Enron_Reporting_Ethics.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-09",
  },

  // Section 2: Business & Management Assignments
  {
    id: "smp-4",
    sectionId: "sec-2",
    title: "Strategic Management & Global Expansion Analysis of Tesla Inc.",
    pageCount: 10,
    academicLevel: "MBA / Masters",
    documentType: "Case Study",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Framework",
    customMetaValue: "Porter's 5 • VRIO",
    documentFile: {
      fileName: "Tesla_Strategic_Management_Expansion.pdf",
      fileType: "PDF",
      fileSize: "3.2 MB",
      fileUrl: "/samples/business/Tesla_Strategic_Management_Expansion.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-10",
  },
  {
    id: "smp-5",
    sectionId: "sec-2",
    title: "Becton Dickinson Strategic Corporate Entrepreneurship",
    pageCount: 7,
    academicLevel: "Undergraduate",
    documentType: "Strategic Plan",
    citationStyle: "Harvard Format",
    customMetaLabel: "Key Scope",
    customMetaValue: "Corporate Venturing",
    documentFile: {
      fileName: "Becton_Dickinson_Corporate_Venturing.docx",
      fileType: "DOCX",
      fileSize: "1.1 MB",
      fileUrl: "/samples/business/Becton_Dickinson_Corporate_Venturing.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-08",
  },
  {
    id: "smp-6",
    sectionId: "sec-2",
    title: "Organizational Behavior & Cross-Cultural Team Dynamics",
    pageCount: 5,
    academicLevel: "Masters",
    documentType: "Executive Report",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Methodology",
    customMetaValue: "Hofstede Dimensions",
    documentFile: {
      fileName: "Organizational_Behavior_Hofstede.pdf",
      fileType: "PDF",
      fileSize: "1.7 MB",
      fileUrl: "/samples/business/Organizational_Behavior_Hofstede.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-07",
  },

  // Section 3: Economics & Econometrics
  {
    id: "smp-7",
    sectionId: "sec-3",
    title: "Macroeconomic Impacts of Inflation Targeting in Emerging Markets",
    pageCount: 12,
    academicLevel: "Masters / PhD",
    documentType: "Empirical Paper",
    citationStyle: "Chicago 17th",
    customMetaLabel: "Statistical Pack",
    customMetaValue: "Stata 18 Panel VAR",
    documentFile: {
      fileName: "Macroeconomic_Inflation_Targeting_VAR.pdf",
      fileType: "PDF",
      fileSize: "4.1 MB",
      fileUrl: "/samples/economics/Macroeconomic_Inflation_Targeting_VAR.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-09",
  },
  {
    id: "smp-8",
    sectionId: "sec-3",
    title:
      "Protectionism Costing Global Growth & International Trade Barriers",
    pageCount: 6,
    academicLevel: "Undergraduate",
    documentType: "Research Paper",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Focus Area",
    customMetaValue: "Tariff deadweight loss",
    documentFile: {
      fileName: "Protectionism_Global_Trade_Growth.docx",
      fileType: "DOCX",
      fileSize: "920 KB",
      fileUrl: "/samples/economics/Protectionism_Global_Trade_Growth.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-06",
  },
  {
    id: "smp-9",
    sectionId: "sec-3",
    title: "Renewable Energy Subsidies & Deadweight Loss Econometric Modeling",
    pageCount: 8,
    academicLevel: "Masters",
    documentType: "Policy Brief",
    citationStyle: "Harvard Format",
    customMetaLabel: "Core Model",
    customMetaValue: "General Equilibrium",
    documentFile: {
      fileName: "Renewable_Energy_Subsidies_Modeling.pdf",
      fileType: "PDF",
      fileSize: "2.5 MB",
      fileUrl: "/samples/economics/Renewable_Energy_Subsidies_Modeling.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-05",
  },

  // Section 4: English & Literature
  {
    id: "smp-10",
    sectionId: "sec-4",
    title: "Post-Colonial Identity & Narrative Voice in Achebe and Chimamanda",
    pageCount: 5,
    academicLevel: "Undergraduate",
    documentType: "Critical Essay",
    citationStyle: "MLA 9th Edition",
    customMetaLabel: "Critical Lens",
    customMetaValue: "Subaltern Theory",
    documentFile: {
      fileName: "Post_Colonial_Identity_Achebe_Adichie.pdf",
      fileType: "PDF",
      fileSize: "1.2 MB",
      fileUrl: "/samples/english/Post_Colonial_Identity_Achebe_Adichie.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-08",
  },
  {
    id: "smp-11",
    sectionId: "sec-4",
    title: "Rhetoric of Classical Tragedy vs Modern Absurdism in Drama",
    pageCount: 8,
    academicLevel: "Masters",
    documentType: "Comparative Analysis",
    citationStyle: "MLA 9th Edition",
    customMetaLabel: "Literary Target",
    customMetaValue: "Sophocles & Beckett",
    documentFile: {
      fileName: "Tragedy_vs_Absurdism_Comparative.docx",
      fileType: "DOCX",
      fileSize: "780 KB",
      fileUrl: "/samples/english/Tragedy_vs_Absurdism_Comparative.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-07",
  },
  {
    id: "smp-12",
    sectionId: "sec-4",
    title: "Linguistic Drift and Semantic Evolution in Digital Communication",
    pageCount: 6,
    academicLevel: "Masters",
    documentType: "Research Paper",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Field Focus",
    customMetaValue: "Sociolinguistics",
    documentFile: {
      fileName: "Linguistic_Drift_Digital_Communication.pdf",
      fileType: "PDF",
      fileSize: "1.6 MB",
      fileUrl: "/samples/english/Linguistic_Drift_Digital_Communication.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-04",
  },

  // Section 5: Law & Jurisprudence
  {
    id: "smp-13",
    sectionId: "sec-5",
    title:
      "Comparative Tort Liability for Autonomous Vehicle Machine-Learning Systems",
    pageCount: 14,
    academicLevel: "LLM / Masters",
    documentType: "Legal Analysis",
    citationStyle: "OSCOLA (Oxford)",
    customMetaLabel: "Jurisdiction",
    customMetaValue: "UK & EU Common Market",
    documentFile: {
      fileName: "Comparative_Tort_Autonomous_Vehicles.pdf",
      fileType: "PDF",
      fileSize: "3.8 MB",
      fileUrl: "/samples/law/Comparative_Tort_Autonomous_Vehicles.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-06",
  },
  {
    id: "smp-14",
    sectionId: "sec-5",
    title: "Juvenile Justice Reform & Due Process in US Federal Jurisprudence",
    pageCount: 9,
    academicLevel: "Undergraduate",
    documentType: "Case Brief",
    citationStyle: "Bluebook 21st",
    customMetaLabel: "Core Doctrine",
    customMetaValue: "14th Amendment",
    documentFile: {
      fileName: "Juvenile_Justice_Due_Process_US.docx",
      fileType: "DOCX",
      fileSize: "1.3 MB",
      fileUrl: "/samples/law/Juvenile_Justice_Due_Process_US.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-05",
  },
  {
    id: "smp-15",
    sectionId: "sec-5",
    title: "Cross-Border Data Sovereignty & GDPR Enforcement Discrepancies",
    pageCount: 11,
    academicLevel: "Masters",
    documentType: "Regulatory Law Review",
    citationStyle: "OSCOLA Format",
    customMetaLabel: "Topic",
    customMetaValue: "Article 44 Transfers",
    documentFile: {
      fileName: "Cross_Border_GDPR_Data_Sovereignty.pdf",
      fileType: "PDF",
      fileSize: "2.9 MB",
      fileUrl: "/samples/law/Cross_Border_GDPR_Data_Sovereignty.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-03",
  },

  // Section 6: Mathematics & Statistics
  {
    id: "smp-16",
    sectionId: "sec-6",
    title:
      "Zero-Knowledge Proofs in Decentralized Healthcare Database Auditing",
    pageCount: 9,
    academicLevel: "Masters",
    documentType: "Technical Paper",
    citationStyle: "IEEE Standard",
    customMetaLabel: "Notation",
    customMetaValue: "LaTeX • ZK-SNARKs",
    documentFile: {
      fileName: "Zero_Knowledge_Healthcare_Auditing.pdf",
      fileType: "PDF",
      fileSize: "3.4 MB",
      fileUrl: "/samples/math/Zero_Knowledge_Healthcare_Auditing.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-05",
  },
  {
    id: "smp-17",
    sectionId: "sec-6",
    title: "Bayesian Multilevel Modeling for Longitudinal Clinical Datasets",
    pageCount: 7,
    academicLevel: "Masters / PhD",
    documentType: "Statistical Lab",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Packages",
    customMetaValue: "R (brms • Stan)",
    documentFile: {
      fileName: "Bayesian_Multilevel_Longitudinal_Data.pdf",
      fileType: "PDF",
      fileSize: "2.2 MB",
      fileUrl: "/samples/math/Bayesian_Multilevel_Longitudinal_Data.pdf",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-04",
  },
  {
    id: "smp-18",
    sectionId: "sec-6",
    title: "Stochastic Calculus & Black-Scholes Derivative Hedging Proofs",
    pageCount: 6,
    academicLevel: "Undergraduate",
    documentType: "Problem Set",
    citationStyle: "LaTeX / None",
    customMetaLabel: "Core Equation",
    customMetaValue: "Itô's Lemma Proof",
    documentFile: {
      fileName: "Stochastic_Calculus_Black_Scholes.pdf",
      fileType: "PDF",
      fileSize: "1.8 MB",
      fileUrl: "/samples/math/Stochastic_Calculus_Black_Scholes.pdf",
    },
    status: "active",
    displayOrder: 3,
    updatedAt: "2026-11-02",
  },

  // Section 7: Psychology & Behavioral Sciences
  {
    id: "smp-19",
    sectionId: "sec-7",
    title:
      "Cognitive Biases in Digital Decision-Making & Algorithmic UX Interface Design",
    pageCount: 8,
    academicLevel: "Masters",
    documentType: "Research Paper",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Core Theory",
    customMetaValue: "Kahneman System 1 & 2",
    documentFile: {
      fileName: "Cognitive_Biases_Digital_UX_Design.pdf",
      fileType: "PDF",
      fileSize: "2.7 MB",
      fileUrl: "/samples/psychology/Cognitive_Biases_Digital_UX_Design.pdf",
    },
    status: "active",
    displayOrder: 1,
    updatedAt: "2026-11-03",
  },
  {
    id: "smp-20",
    sectionId: "sec-7",
    title:
      "PTSD Neurological Pathways and Trauma-Informed Clinical Intervention",
    pageCount: 6,
    academicLevel: "Masters Degree",
    documentType: "Clinical Case Study",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Clinical Base",
    customMetaValue: "DSM-5 • fMRI Correlates",
    documentFile: {
      fileName: "PTSD_Neurological_Trauma_Clinical.docx",
      fileType: "DOCX",
      fileSize: "950 KB",
      fileUrl: "/samples/psychology/PTSD_Neurological_Trauma_Clinical.docx",
    },
    status: "active",
    displayOrder: 2,
    updatedAt: "2026-11-02",
  },
  {
    id: "smp-21",
    sectionId: "sec-7",
    title:
      "Bio-Cultural Framework in Adolescent Social Development & Mental Health",
    pageCount: 7,
    academicLevel: "Undergraduate",
    documentType: "Empirical Review",
    citationStyle: "APA 7th Edition",
    customMetaLabel: "Study Design",
    customMetaValue: "Cohort Meta-Analysis",
    documentFile: {
      fileName: "Bio_Cultural_Adolescent_Mental_Health.pdf",
      fileType: "PDF",
      fileSize: "1.9 MB",
      fileUrl: "/samples/psychology/Bio_Cultural_Adolescent_Mental_Health.pdf",
    },
    status: "draft",
    displayOrder: 3,
    updatedAt: "2026-10-30",
  },
];

/**
 * Helpers to query mock samples
 */
export function getSampleSectionById(
  id: string
): SampleSection | undefined {
  return INITIAL_SAMPLE_SECTIONS.find((sec) => sec.id === id);
}

export function getSampleById(id: string): AcademicSample | undefined {
  return INITIAL_ACADEMIC_SAMPLES.find((s) => s.id === id);
}

export function getSamplesForSection(sectionId: string): AcademicSample[] {
  return INITIAL_ACADEMIC_SAMPLES.filter((s) => s.sectionId === sectionId);
}

export function getAllSampleSections(): SampleSection[] {
  return INITIAL_SAMPLE_SECTIONS;
}

export function getAllAcademicSamples(): AcademicSample[] {
  return INITIAL_ACADEMIC_SAMPLES;
}

