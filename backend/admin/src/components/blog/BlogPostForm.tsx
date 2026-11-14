"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
  UserCheck,
  HelpCircle,
  ListOrdered,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  type BlogPost,
  type BlogStatus,
  type BlogFaqItem,
  INITIAL_BLOG_CATEGORIES,
  INITIAL_BLOG_POSTS,
  getBlogCategoryBySlug,
} from "@/data/mockBlog";
import { RichArticleEditor } from "./RichArticleEditor";

interface BlogPostFormProps {
  post?: BlogPost;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractH2Headings(html: string): string[] {
  if (!html) return [];
  if (typeof window === "undefined") {
    const matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi);
    if (!matches) return [];
    return matches
      .map((m) => m.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean);
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const h2Nodes = doc.querySelectorAll("h2");
    return Array.from(h2Nodes)
      .map((node) => node.textContent?.trim() || "")
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const searchParams = useSearchParams();
  const isEditing = Boolean(post);

  // Pre-selected category from query params on create mode
  const queryCategorySlug = searchParams.get("category");
  const defaultCategoryId = (() => {
    if (post?.categoryId) return post.categoryId;
    if (queryCategorySlug) {
      const match = getBlogCategoryBySlug(queryCategorySlug);
      if (match) return match.id;
    }
    return INITIAL_BLOG_CATEGORIES[0]?.id ?? "cat-1";
  })();

  // Card 1: Article Header & Featured Media
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [readTime, setReadTime] = useState(post?.readTime ?? "8 min read");

  const [imageUrl, setImageUrl] = useState(
    post?.featuredImage?.url ??
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ69LFSgBNZ2h1755hnc9BJm9FHy6LNw_PaKHfP_wc5tkz1yP34K1Lk1YBwJOfrvZ-2ECQV5PJi0tY4HxbXcVU20z2GhN6pCg-_LaEn8IZNxfUz-2IpGyTOH5P8TlEOlfqA6skHbT-kRl-dfou5sg8jMKI2dh0wCUA11CH2_kLtrq900VNrtteElaSf0dLpZyd7r7hoeqe8W_wjR1isaJ_1ZgQSyBiE3lhUC_pnE7n"
  );
  const [imageAltText, setImageAltText] = useState(
    post?.featuredImage?.altText ?? ""
  );
  const [imageCaption, setImageCaption] = useState(
    post?.featuredImage?.caption ?? ""
  );

  // Card 2: Article Editorial Content (Rich Text)
  const [contentHtml, setContentHtml] = useState(
    post?.contentHtml ??
      `<h2>1. Understanding Core Academic Frameworks</h2>
<p>Provide a foundational overview of this topic, establishing scholarly relevance and theoretical grounding. Articulate the empirical void and state the central thesis clearly.</p>

<h2>2. Methodological Coherence &amp; Evaluation</h2>
<p>Detail the analytical instruments, methodological choices, and literature synthesis methods. Ensure symmetric alignment between your inquiry and practical findings.</p>

<blockquote class="border-l-4 border-orange bg-orange/5 p-4 rounded-r-xl my-4 text-sm text-text-primary not-italic">
  <strong class="block text-navy font-semibold mb-1">Faculty Insider Note</strong>
  Committees specifically check for methodological alignment between research questions and analytical instrumentation.
</blockquote>`
  );

  // Live auto-extraction of H2 headings for sticky Table of Contents
  const extractedHeadings = useMemo(
    () => extractH2Headings(contentHtml),
    [contentHtml]
  );

  // Card 3: Lead Faculty Author Attribution
  const [authorName, setAuthorName] = useState(
    post?.author?.name ?? "Dr. David Moraine"
  );
  const [authorCredentials, setAuthorCredentials] = useState(
    post?.author?.credentials ?? "PhD, Oxford Alum"
  );
  const [authorRoleSubtitle, setAuthorRoleSubtitle] = useState(
    post?.author?.roleSubtitle ??
      "Senior Academic Research Faculty • Verified ReadEssay Advisor"
  );
  const [authorExperienceLine, setAuthorExperienceLine] = useState(
    post?.author?.experienceLine ??
      "Senior Research Fellow • 14+ Years Postgraduate Advising"
  );
  const [authorBio, setAuthorBio] = useState(
    post?.author?.bio ??
      "Doctorate in Educational Research with over a decade of graduate defense committee advisory."
  );

  // Card 4: Article FAQs
  const [faqTagline, setFaqTagline] = useState(
    post?.faqSection?.tagline ?? "Academic Inquiries"
  );
  const [faqHeading, setFaqHeading] = useState(
    post?.faqSection?.heading ?? "Frequently Asked Questions"
  );
  const [faqs, setFaqs] = useState<BlogFaqItem[]>(
    post?.faqSection?.items ?? [
      {
        id: "faq-init-1",
        question:
          "How does ReadEssay ensure 100% academic integrity and original research guidance?",
        answer:
          "All ReadEssay specialists are certified postgraduates with verified terminal degrees. We perform comprehensive Turnitin similarity indexing, ensure zero AI contamination, and assist candidates through personalized editorial feedback without ghostwriting.",
      },
    ]
  );

  // Right Column: Publishing & Categorization
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [status, setStatus] = useState<BlogStatus>(
    post?.status ?? "published"
  );
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ?? new Date().toISOString().split("T")[0]
  );
  const [relatedPostIds, setRelatedPostIds] = useState<string[]>(
    post?.relatedPostIds ?? []
  );

  // Right Column: SEO & Search Metadata
  const [metaTitle, setMetaTitle] = useState(post?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.seo?.metaDescription ?? ""
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
    if (!metaTitle || metaTitle.endsWith(" | ReadEssay")) {
      setMetaTitle(`${val} | ReadEssay`);
    }
  }

  // FAQ Handlers
  function handleAddFaq() {
    setFaqs((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
      },
    ]);
  }

  function handleUpdateFaq(
    index: number,
    field: keyof BlogFaqItem,
    value: string
  ) {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleMoveFaq(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === faqs.length - 1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;

    setFaqs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  }

  function handleDeleteFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  // Related Post Toggles
  function toggleRelatedPost(id: string) {
    setRelatedPostIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // keep max 3
      }
      return [...prev, id];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please provide an article title.");
      return;
    }
    if (!slug.trim()) {
      setError("Please specify a URL slug.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Please write an article short excerpt.");
      return;
    }
    if (!categoryId) {
      setError("Please select a blog category.");
      return;
    }
    if (!contentHtml.trim()) {
      setError("Please provide article editorial content.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Article "${title}" updated successfully. Changes staged in local UI session.`
          : `Article "${title}" created successfully. Changes staged in local UI session.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Blog Posts</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing ? `Edit Post: ${post?.title}` : "Add Blog Post"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update article copy, table of contents structure, faculty author profile, and search metadata."
              : "Author and publish a new academic guide or editorial publication."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="blog-post-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Publish Post"}
            </span>
          </button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {confirmation && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{confirmation}</span>
          </div>
          <button
            type="button"
            onClick={() => setConfirmation(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <form
        id="blog-post-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column (8 cols): 4 Structured Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Article Header & Featured Media */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Article Header &amp; Featured Media
                </h2>
                <p className="text-xs text-text-secondary">
                  Primary H1 headline, URL slug, short excerpt, and hero imagery.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  H1 Article Title <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. How to Structure a Master's Dissertation: The Complete Chapter-by-Chapter Blueprint"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    URL Slug <span className="text-orange">*</span>
                  </label>
                  <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:border-navy transition-colors">
                    <span className="pl-3 pr-1 text-[11px] text-text-secondary select-none font-mono">
                      readessay.com/blog/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setIsSlugCustomized(true);
                      }}
                      placeholder="how-to-structure-a-masters-dissertation"
                      className="w-full px-2 py-2 text-xs bg-transparent focus:outline-none text-text-primary font-mono placeholder:text-text-muted"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 8 min read"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Card Short Excerpt <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 2-3 sentence overview that appears on the public blog listing cards..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted resize-y"
                  required
                />
              </div>

              {/* Featured Image Sub-group */}
              <div className="pt-3 border-t border-border space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-orange" />
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Featured Hero Image
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or Google CDN URL"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-mono"
                  />
                </div>

                {/* Live Image Preview */}
                {imageUrl && (
                  <div className="p-3 bg-canvas rounded-lg border border-border flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-32 h-20 rounded-md overflow-hidden bg-slate-200 border border-border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={imageAltText || "Featured preview"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="text-xs font-semibold text-text-primary">
                        Live Thumbnail Preview
                      </div>
                      <p className="text-[11px] text-text-secondary truncate">
                        {imageUrl}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      SEO Image Alt Text
                    </label>
                    <input
                      type="text"
                      value={imageAltText}
                      onChange={(e) => setImageAltText(e.target.value)}
                      placeholder="e.g. Master's dissertation writing setup in an academic library"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Figure Caption
                    </label>
                    <input
                      type="text"
                      value={imageCaption}
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="e.g. Figure 1.0: Empirical research formulation at Oxford."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Editorial Content & Live Table of Contents */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                  <ListOrdered className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">
                    Editorial Content &amp; Table of Contents
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Write or paste your article in full. All &lt;h2&gt; headings are automatically extracted into the live Table of Contents.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Table of Contents Preview */}
            <div className="p-4 bg-canvas rounded-xl border border-border space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">
                    Live Sticky Table of Contents ({extractedHeadings.length}{" "}
                    {extractedHeadings.length === 1 ? "Section" : "Sections"} Detected)
                  </span>
                </div>
                <span className="text-[11px] text-text-secondary font-mono">
                  Auto-extracted from &lt;h2&gt;
                </span>
              </div>

              {extractedHeadings.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {extractedHeadings.map((heading, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface border border-border text-xs font-medium text-navy shadow-2xs"
                    >
                      <span className="text-orange font-bold font-mono">
                        {idx + 1}.
                      </span>
                      <span className="truncate max-w-[280px]">{heading}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted italic">
                  No &lt;h2&gt; headings detected yet. Highlight a section heading and click &ldquo;H2 (TOC)&rdquo; in the editor toolbar to automatically build your Table of Contents.
                </p>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-text-primary">
                Article Body Copy &amp; Rich Formatting <span className="text-orange">*</span>
              </label>
              <RichArticleEditor
                value={contentHtml}
                onChange={setContentHtml}
                placeholder="Compose your article here. Use H2 for main chapters, insert figures, tables, or faculty callout notes..."
              />
              <p className="text-[11px] text-text-secondary">
                💡 <strong className="text-text-primary font-medium">Author Tip:</strong> Use the <span className="text-orange font-semibold">H2 (TOC)</span> button in the toolbar to structure your article. The public article page automatically links each H2 into the sticky left-hand navigation sidebar.
              </p>
            </div>
          </div>

          {/* CARD 3: Lead Faculty Author Attribution */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Lead Faculty Author Attribution
                </h2>
                <p className="text-xs text-text-secondary">
                  Verified doctoral advisor credentials, role subtitle, and
                  biography displayed in the article byline and footer bio.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Author Full Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dr. David Moraine"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Credential Badge <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    value={authorCredentials}
                    onChange={(e) => setAuthorCredentials(e.target.value)}
                    placeholder="e.g. PhD, Oxford Alum"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Role Subtitle <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    value={authorRoleSubtitle}
                    onChange={(e) => setAuthorRoleSubtitle(e.target.value)}
                    placeholder="e.g. Senior Academic Research Faculty • Verified ReadEssay Advisor"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Experience Highlight Line
                  </label>
                  <input
                    type="text"
                    value={authorExperienceLine}
                    onChange={(e) => setAuthorExperienceLine(e.target.value)}
                    placeholder="e.g. Senior Research Fellow • 14+ Years Postgraduate Advising"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Author Biography <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="Doctorate in Educational Research from the University of Oxford. Mentored over 1,200 master's candidates..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                  required
                />
              </div>
            </div>
          </div>

          {/* CARD 4: Article FAQs */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">
                    Article FAQs (FAQPage Schema)
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Structured Q&amp;As rendered at the bottom of the article.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  FAQ Section Tagline
                </label>
                <input
                  type="text"
                  value={faqTagline}
                  onChange={(e) => setFaqTagline(e.target.value)}
                  placeholder="e.g. Dissertation Structuring Inquiries"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  FAQ Section Heading
                </label>
                <input
                  type="text"
                  value={faqHeading}
                  onChange={(e) => setFaqHeading(e.target.value)}
                  placeholder="e.g. Frequently Asked Questions"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>
            </div>

            {/* Repeatable FAQs */}
            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="p-3.5 rounded-xl border border-border bg-canvas/60 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-navy">
                      Question #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded text-text-secondary hover:text-navy disabled:opacity-30 transition-colors"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(idx, "down")}
                        disabled={idx === faqs.length - 1}
                        className="p-1 rounded text-text-secondary hover:text-navy disabled:opacity-30 transition-colors"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(idx)}
                        className="p-1 rounded text-text-secondary hover:text-red-600 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      handleUpdateFaq(idx, "question", e.target.value)
                    }
                    placeholder="Enter question text..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    required
                  />

                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) =>
                      handleUpdateFaq(idx, "answer", e.target.value)
                    }
                    placeholder="Enter detailed answer..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols — Sticky Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Publishing & Categorization */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Layers className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Publishing &amp; Category
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Category <span className="text-orange">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-medium"
                  required
                >
                  {INITIAL_BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["published", "draft", "archived"] as BlogStatus[]).map(
                    (s) => {
                      const isSelected = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={`py-2 px-3 rounded-lg border text-xs font-semibold capitalize transition-all ${
                            isSelected
                              ? s === "published"
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600"
                                : s === "draft"
                                ? "border-amber-600 bg-amber-50 text-amber-800 ring-1 ring-amber-600"
                                : "border-slate-500 bg-slate-100 text-slate-800 ring-1 ring-slate-500"
                              : "border-border text-text-secondary hover:bg-canvas"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-mono"
                  required
                />
              </div>

              {/* Related Articles Multi-select */}
              <div className="pt-2 border-t border-border">
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Related Articles (Pick up to 3)
                </label>
                <p className="text-[11px] text-text-secondary mb-2">
                  Shown in the &ldquo;Recommended Further Reading&rdquo; grid.
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 bg-canvas rounded-lg border border-border">
                  {INITIAL_BLOG_POSTS.filter((p) => p.id !== post?.id).map(
                    (otherPost) => {
                      const isChecked = relatedPostIds.includes(otherPost.id);
                      return (
                        <label
                          key={otherPost.id}
                          className="flex items-start gap-2 p-1.5 rounded hover:bg-surface cursor-pointer text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRelatedPost(otherPost.id)}
                            className="mt-0.5 rounded text-orange focus:ring-orange/30"
                          />
                          <span
                            className={`line-clamp-1 ${
                              isChecked
                                ? "font-semibold text-text-primary"
                                : "text-text-secondary"
                            }`}
                          >
                            {otherPost.title}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Article ID:</span>
                    <span className="font-mono text-text-primary">
                      {post?.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">
                      {post?.updatedAt ?? "2024-10-24"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: SEO & Search Metadata */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Search Engine Optimization
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    Meta Title
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      metaTitle.length > 60
                        ? "text-red-500 font-bold"
                        : "text-text-secondary"
                    }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. How to Structure a Master's Dissertation | ReadEssay"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    Meta Description
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      metaDescription.length > 160
                        ? "text-red-500 font-bold"
                        : "text-text-secondary"
                    }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Master the 5-chapter dissertation framework with recommended word count percentages..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                />
              </div>

              {/* SERP Preview Box */}
              <div className="pt-2">
                <span className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Google SERP Snippet
                </span>
                <div className="p-3.5 rounded-lg bg-canvas border border-border space-y-1">
                  <div className="text-[11px] text-[#202124] flex items-center gap-1 font-mono">
                    <span>readessay.com</span>
                    <span>›</span>
                    <span>blog</span>
                    <span>›</span>
                    <span className="text-text-secondary">
                      {slug || "article-slug"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                    {metaTitle ||
                      (title ? `${title} | ReadEssay` : "Blog Post | ReadEssay")}
                  </div>
                  <div className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      excerpt ||
                      "Browse verified university-level editorial publications, essay frameworks, and research methodologies."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
