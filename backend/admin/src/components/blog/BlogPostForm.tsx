"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
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
  Upload,
  Loader2,
} from "lucide-react";
import {
  type BlogPost,
  type BlogCategory,
  type BlogStatus,
  type BlogFaqItem,
  getBlogPostByIdOrSlug,
  getBlogCategories,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  uploadBlogImage,
} from "@/lib/blog-api";
import { RichArticleEditor } from "./RichArticleEditor";

interface BlogPostFormProps {
  post?: BlogPost;
  postSlug?: string;
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

export function BlogPostForm({
  post: initialPost,
  postSlug,
}: BlogPostFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [postData, setPostData] = useState<BlogPost | null>(
    initialPost ?? null
  );
  const [isLoadingPost, setIsLoadingPost] = useState(
    Boolean(postSlug && !initialPost)
  );
  const [postLoadError, setPostLoadError] = useState<string | null>(null);

  const isEditing = Boolean(postData || postSlug);

  // Categories & Available Posts lists
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [availablePosts, setAvailablePosts] = useState<BlogPost[]>([]);
  const [isLoadingLists, setIsLoadingLists] = useState(true);

  // Pre-selected category from query params on create mode
  const queryCategorySlug = searchParams.get("category");

  // Card 1: Article Header & Featured Media
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(Boolean(initialPost));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [readTime, setReadTime] = useState(initialPost?.readTime ?? "8 min read");

  const [imageUrl, setImageUrl] = useState(initialPost?.featuredImage?.url ?? "");
  const [imageAltText, setImageAltText] = useState(
    initialPost?.featuredImage?.altText ?? ""
  );
  const [imageCaption, setImageCaption] = useState(
    initialPost?.featuredImage?.caption ?? ""
  );
  const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] = useState(false);
  const [featuredImageError, setFeaturedImageError] = useState<string | null>(null);

  // Card 2: Article Editorial Content (Rich Text)
  const [contentHtml, setContentHtml] = useState(
    initialPost?.contentHtml ??
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
    initialPost?.author?.name ?? "Dr. David Moraine"
  );
  const [authorCredentials, setAuthorCredentials] = useState(
    initialPost?.author?.credentials ?? "PhD, Oxford Alum"
  );
  const [authorRoleSubtitle, setAuthorRoleSubtitle] = useState(
    initialPost?.author?.roleSubtitle ??
    "Senior Academic Research Faculty • Verified ReadEssay Advisor"
  );
  const [authorExperienceLine, setAuthorExperienceLine] = useState(
    initialPost?.author?.experienceLine ??
    "Senior Research Fellow • 14+ Years Postgraduate Advising"
  );
  const [authorBio, setAuthorBio] = useState(
    initialPost?.author?.bio ??
    "Doctorate in Educational Research with over a decade of graduate defense committee advisory."
  );

  // Card 4: Article FAQs
  const [faqTagline, setFaqTagline] = useState(
    initialPost?.faqSection?.tagline ?? "Academic Inquiries"
  );
  const [faqHeading, setFaqHeading] = useState(
    initialPost?.faqSection?.heading ?? "Frequently Asked Questions"
  );
  const [faqs, setFaqs] = useState<BlogFaqItem[]>(
    initialPost?.faqSection?.items ?? [
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
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId ?? "");
  const [status, setStatus] = useState<BlogStatus>(
    initialPost?.status ?? "published"
  );
  const [publishedAt, setPublishedAt] = useState(
    initialPost?.publishedAt ?? new Date().toISOString().split("T")[0]
  );
  const [relatedPostIds, setRelatedPostIds] = useState<string[]>(
    initialPost?.relatedPostIds ?? []
  );

  // Right Column: SEO & Search Metadata
  const [metaTitle, setMetaTitle] = useState(initialPost?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initialPost?.seo?.metaDescription ?? ""
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load categories and other posts
  const loadInitialLists = useCallback(async () => {
    try {
      setIsLoadingLists(true);
      const [catsRes, postsRes] = await Promise.all([
        getBlogCategories(),
        getBlogPosts({ limit: 100 }),
      ]);
      setCategories(catsRes.categories || []);
      setAvailablePosts(postsRes.posts || []);

      // If categoryId not yet selected, set from queryCategorySlug or first category
      if (!initialPost?.categoryId && !postData?.categoryId) {
        if (queryCategorySlug) {
          const matched = catsRes.categories.find(
            (c) => c.slug === queryCategorySlug
          );
          if (matched) {
            setCategoryId(matched.id);
          } else if (catsRes.categories.length > 0) {
            setCategoryId(catsRes.categories[0].id);
          }
        } else if (catsRes.categories.length > 0) {
          setCategoryId(catsRes.categories[0].id);
        }
      }
    } catch {
      // Ignored non-critical list fetch error
    } finally {
      setIsLoadingLists(false);
    }
  }, [initialPost, postData, queryCategorySlug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInitialLists();
    }, 50);
    return () => clearTimeout(timer);
  }, [loadInitialLists]);

  // If postSlug is provided, fetch dynamically
  useEffect(() => {
    if (!postSlug || initialPost) return;

    let isMounted = true;
    getBlogPostByIdOrSlug(postSlug)
      .then((p) => {
        if (!isMounted) return;
        setPostData(p);
        setTitle(p.title);
        setSlug(p.slug);
        setIsSlugCustomized(true);
        setExcerpt(p.excerpt);
        setReadTime(p.readTime);
        setPublishedAt(p.publishedAt);
        setImageUrl(p.featuredImage?.url ?? "");
        setImageAltText(p.featuredImage?.altText ?? "");
        setImageCaption(p.featuredImage?.caption ?? "");
        setContentHtml(p.contentHtml);
        setAuthorName(p.author?.name ?? "");
        setAuthorCredentials(p.author?.credentials ?? "");
        setAuthorRoleSubtitle(p.author?.roleSubtitle ?? "");
        setAuthorExperienceLine(p.author?.experienceLine ?? "");
        setAuthorBio(p.author?.bio ?? "");
        setFaqTagline(p.faqSection?.tagline ?? "Academic Inquiries");
        setFaqHeading(p.faqSection?.heading ?? "Frequently Asked Questions");
        setFaqs(p.faqSection?.items ?? []);
        setCategoryId(p.categoryId);
        setStatus(p.status);
        setRelatedPostIds(p.relatedPostIds ?? []);
        setMetaTitle(p.seo?.metaTitle ?? "");
        setMetaDescription(p.seo?.metaDescription ?? "");
      })
      .catch((err) => {
        if (!isMounted) return;
        const msg =
          err instanceof Error ? err.message : "Failed to load blog post.";
        setPostLoadError(msg);
      })
      .finally(() => {
        if (isMounted) setIsLoadingPost(false);
      });

    return () => {
      isMounted = false;
    };
  }, [postSlug, initialPost]);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
    if (!metaTitle || metaTitle.endsWith(" | ReadEssay")) {
      setMetaTitle(`${val} | ReadEssay`);
    }
  }

  // Handle Featured Hero Image File Upload
  async function handleFeaturedImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingFeaturedImage(true);
      setFeaturedImageError(null);
      const res = await uploadBlogImage(file);
      setImageUrl(res.url);
      if (!imageAltText) {
        setImageAltText(title ? `${title} illustration` : file.name);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to upload featured image.";
      setFeaturedImageError(msg);
    } finally {
      setIsUploadingFeaturedImage(false);
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
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  }

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmation(null);

    if (!title.trim()) {
      setError("Please provide an article title.");
      return;
    }
    if (!slug.trim()) {
      setError("Please specify a URL slug for this article.");
      return;
    }
    if (!categoryId) {
      setError("Please select a topic category for this article.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        categoryId,
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        readTime: readTime.trim() || "8 min read",
        publishedAt: publishedAt || new Date().toISOString().split("T")[0],
        featuredImageUrl: imageUrl.trim(),
        featuredImageAlt: imageAltText.trim(),
        featuredImageCaption: imageCaption.trim(),
        featuredImage: {
          url: imageUrl.trim(),
          altText: imageAltText.trim(),
          caption: imageCaption.trim(),
        },
        contentHtml,
        authorName: authorName.trim(),
        authorCredentials: authorCredentials.trim(),
        authorRoleSubtitle: authorRoleSubtitle.trim(),
        authorExperienceLine: authorExperienceLine.trim(),
        authorBio: authorBio.trim(),
        author: {
          name: authorName.trim(),
          credentials: authorCredentials.trim(),
          roleSubtitle: authorRoleSubtitle.trim(),
          experienceLine: authorExperienceLine.trim(),
          bio: authorBio.trim(),
        },
        faqTagline: faqTagline.trim(),
        faqHeading: faqHeading.trim(),
        faqItems: faqs.filter((f) => f.question.trim()),
        faqSection: {
          tagline: faqTagline.trim(),
          heading: faqHeading.trim(),
          items: faqs.filter((f) => f.question.trim()),
        },
        relatedPostIds,
        status,
        metaTitle: metaTitle.trim() || null,
        metaDescription: metaDescription.trim() || null,
        canonicalSlug: slug.trim(),
        seo: {
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          canonicalSlug: slug.trim(),
        },
      };

      if (postData?.id) {
        const updated = await updateBlogPost(postData.id, payload);
        setPostData(updated);
        setConfirmation(`Article "${updated.title}" updated successfully.`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const created = await createBlogPost(payload);
        setConfirmation(`Article "${created.title}" created successfully.`);
        router.push("/blog");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An error occurred while saving the blog post.";
      setError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingPost) {
    return (
      <div className="p-12 text-center text-text-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-orange mx-auto mb-2" />
        <p className="text-sm font-medium text-text-primary">Loading article editor...</p>
      </div>
    );
  }

  if (postLoadError) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h1 className="text-xl font-bold text-text-primary">Article Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">{postLoadError}</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Posts</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Global Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Posts</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing ? `Edit Post: ${postData?.title || title}` : "Add Blog Post"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Author and publish educational articles, research methods, and SEO
            publications.
          </p>
        </div>

        {/* Global Save / Discard Bar */}
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
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
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

      {/* Confirmation & Error Banners */}
      {confirmation && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{confirmation}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-900 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Main 2-Column Responsive Form Layout */}
      <form
        id="blog-post-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column (2 Cols): Content & Metadata Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Article Header & Featured Media */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <FileText className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Article Header &amp; Featured Media
              </h2>
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
                    placeholder="8 min read"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Excerpt / Lead Summary <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A definitive 2-3 sentence overview of the article methodology and key takeaway..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                  required
                />
              </div>

              {/* Featured Media Box */}
              <div className="pt-3 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-orange" />
                    Featured Hero Image
                  </span>
                  <span className="text-[11px] text-text-secondary">
                    Recommended 1200×630px
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                    Image URL or Upload from Computer
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://... or upload image"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-mono placeholder:text-text-muted"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-canvas hover:bg-surface text-text-secondary hover:text-text-primary text-xs font-semibold cursor-pointer shrink-0 transition-colors">
                      {isUploadingFeaturedImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-orange" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-orange" />
                      )}
                      <span>
                        {isUploadingFeaturedImage ? "Uploading..." : "Upload File"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageUpload}
                        className="hidden"
                        disabled={isUploadingFeaturedImage}
                      />
                    </label>
                  </div>
                  {featuredImageError && (
                    <p className="text-[11px] text-rose-600 mt-1">
                      {featuredImageError}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                      Image Accessibility Alt Text
                    </label>
                    <input
                      type="text"
                      value={imageAltText}
                      onChange={(e) => setImageAltText(e.target.value)}
                      placeholder="Student reviewing dissertation chapter at desk"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                      Figure Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={imageCaption}
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="Figure 1.0: Canonical 5-Chapter Postgraduate Blueprint"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    />
                  </div>
                </div>

                {imageUrl && (
                  <div className="mt-2 p-2 bg-canvas rounded-lg border border-border flex items-center gap-3">
                    <div className="w-20 h-14 rounded overflow-hidden bg-slate-200 border border-border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={imageAltText || "Featured preview"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] text-text-secondary truncate">
                      <span className="font-semibold text-text-primary block truncate">
                        {imageUrl}
                      </span>
                      <span>Hero media attached</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Editorial Article Body & Live TOC */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange" />
                <h2 className="text-base font-bold text-text-primary">
                  Article Editorial Body &amp; Rich Formatting
                </h2>
              </div>
              <span className="text-[11px] text-text-secondary">
                WYSIWYG &amp; HTML Mode
              </span>
            </div>

            <p className="text-xs text-text-secondary">
              Use the toolbar below to apply headings, bolding, blockquotes,
              tables, and inline figures. Headings formatted with{" "}
              <code className="text-navy font-mono bg-canvas px-1 py-0.5 rounded">
                H2
              </code>{" "}
              will automatically generate the Table of Contents outline.
            </p>

            {/* Custom Rich WYSIWYG Editor */}
            <RichArticleEditor
              value={contentHtml}
              onChange={setContentHtml}
              placeholder="Start drafting your academic article..."
            />

            {/* Live Table of Contents Summary */}
            <div className="mt-4 p-4 rounded-xl bg-canvas border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-orange" />
                  Auto-Extracted Table of Contents ({extractedHeadings.length}{" "}
                  H2 Sections)
                </span>
                <span className="text-[10px] text-text-muted font-mono">
                  Live Preview
                </span>
              </div>
              {extractedHeadings.length === 0 ? (
                <p className="text-[11px] text-text-secondary italic">
                  No &lt;h2&gt; headings detected yet. Format sections using H2
                  to construct the sticky navigation outline.
                </p>
              ) : (
                <ol className="list-decimal list-inside space-y-1 text-xs text-text-primary pl-1 font-medium">
                  {extractedHeadings.map((heading, idx) => (
                    <li key={idx} className="truncate">
                      <span className="hover:text-orange transition-colors">
                        {heading}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          {/* Card 3: Lead Faculty Author Attribution */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <UserCheck className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Lead Faculty Author Attribution
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Author Full Name <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Dr. David Moraine"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Credentials / Alma Mater
                </label>
                <input
                  type="text"
                  value={authorCredentials}
                  onChange={(e) => setAuthorCredentials(e.target.value)}
                  placeholder="e.g. PhD, Oxford Alum"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Role Subtitle
                </label>
                <input
                  type="text"
                  value={authorRoleSubtitle}
                  onChange={(e) => setAuthorRoleSubtitle(e.target.value)}
                  placeholder="Senior Academic Research Faculty • Verified ReadEssay Advisor"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Experience &amp; Milestone Line
                </label>
                <input
                  type="text"
                  value={authorExperienceLine}
                  onChange={(e) => setAuthorExperienceLine(e.target.value)}
                  placeholder="Senior Research Fellow • 14+ Years Postgraduate Advising • 45+ Peer-Reviewed Publications"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Faculty Bio
                </label>
                <textarea
                  rows={2}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="Dr. Moraine holds a Doctorate in Educational Research from the University of Oxford..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Article FAQs Section */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange" />
                <h2 className="text-base font-bold text-text-primary">
                  Article FAQ Accordion Section
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange/10 hover:bg-orange/20 text-orange border border-orange/20 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
              <div>
                <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                  Section Tagline
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
                <label className="block text-[11px] font-semibold text-text-secondary mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={faqHeading}
                  onChange={(e) => setFaqHeading(e.target.value)}
                  placeholder="Frequently Asked Questions"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className="p-4 rounded-xl border border-border bg-canvas/40 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-navy uppercase tracking-wider">
                      Question #{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(index, "up")}
                        disabled={index === 0}
                        aria-label="Move FAQ up"
                        className="p-1 text-text-secondary hover:text-navy disabled:opacity-30"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(index, "down")}
                        disabled={index === faqs.length - 1}
                        aria-label="Move FAQ down"
                        className="p-1 text-text-secondary hover:text-navy disabled:opacity-30"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(index)}
                        aria-label="Delete FAQ"
                        className="p-1 text-text-secondary hover:text-rose-600 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleUpdateFaq(index, "question", e.target.value)
                      }
                      placeholder="e.g. Can I combine the Results and Discussion chapters?"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none text-text-primary font-medium"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleUpdateFaq(index, "answer", e.target.value)
                      }
                      placeholder="Provide a clear, authoritative editorial answer..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none text-text-primary resize-y"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Publishing, Related Posts & SEO */}
        <div className="space-y-6">
          {/* Card 1: Publishing Settings */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border">
              Publishing Settings
            </h2>

            <div className="space-y-4">
              {/* Category Picker */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Editorial Category <span className="text-orange">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  required
                >
                  <option value="" disabled>
                    {isLoadingLists ? "Loading categories..." : "Select category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Picker */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Publishing Status
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
                          className={`py-2 px-3 rounded-lg border text-xs font-semibold capitalize transition-all ${isSelected
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
                  Selected: {relatedPostIds.length}/3
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {availablePosts
                    .filter((p) => p.id !== postData?.id)
                    .map((item) => {
                      const isChecked = relatedPostIds.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${isChecked
                              ? "bg-orange/5 border-orange/40 text-navy font-medium"
                              : "bg-canvas border-border text-text-secondary hover:bg-surface"
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRelatedPost(item.id)}
                            className="mt-0.5 rounded border-border text-orange focus:ring-orange"
                          />
                          <span className="line-clamp-2 leading-tight">
                            {item.title}
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>

              {postData && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Article ID:</span>
                    <span className="font-mono text-text-primary">
                      {postData.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">
                      {postData.updatedAt}
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
                    className={`text-[11px] font-mono ${metaTitle.length > 60
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
                    className={`text-[11px] font-mono ${metaDescription.length > 160
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
