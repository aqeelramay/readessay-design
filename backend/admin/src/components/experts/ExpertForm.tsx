"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  X,
  GraduationCap,
  Sparkles,
  Star,
  Award,
} from "lucide-react";
import {
  createExpert,
  updateExpert,
  getAdminExpertById,
  uploadExpertAvatar,
  type ExpertItem,
  type CreateExpertPayload,
} from "@/lib/experts-api";

interface ExpertFormProps {
  initialData?: ExpertItem;
  expertId?: string;
  isEdit?: boolean;
}

export function ExpertForm({ initialData, expertId, isEdit = false }: ExpertFormProps) {
  const router = useRouter();
  const [currentId, setCurrentId] = useState<string | undefined>(
    initialData?.id || expertId
  );
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(expertId && !initialData));

  // Basic info
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [roleTitle, setRoleTitle] = useState(initialData?.roleTitle || "");
  const [university, setUniversity] = useState(initialData?.university || "");
  const [degree, setDegree] = useState(initialData?.degree || "");
  const [experienceYears, setExperienceYears] = useState(
    initialData?.experienceYears ?? 7
  );

  // Avatar
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatarUrl || "");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Performance metrics
  const [rating, setRating] = useState(initialData?.rating ?? 4.9);
  const [completedOrders, setCompletedOrders] = useState(
    initialData?.completedOrders ?? 450
  );
  const [successRate, setSuccessRate] = useState(
    initialData?.successRate || "98.5%"
  );

  // Specialties (tags)
  const [specialties, setSpecialties] = useState<string[]>(
    Array.isArray(initialData?.specialties) ? initialData.specialties : []
  );
  const [newSpecialty, setNewSpecialty] = useState("");

  // Bio
  const [bio, setBio] = useState(initialData?.bio || "");

  // Student Feedback
  const [featuredReviewQuote, setFeaturedReviewQuote] = useState(
    initialData?.featuredReviewQuote || ""
  );
  const [featuredReviewAuthor, setFeaturedReviewAuthor] = useState(
    initialData?.featuredReviewAuthor || ""
  );

  // Settings
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? true);
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder ?? 1
  );
  const [status, setStatus] = useState<string>(initialData?.status || "published");

  // Form State
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load expert data if expertId is provided
  useEffect(() => {
    if (!expertId || initialData) return;
    let isMounted = true;

    getAdminExpertById(expertId)
      .then((data) => {
        if (!isMounted) return;
        setCurrentId(data.id);
        setName(data.name || "");
        setSlug(data.slug || "");
        setRoleTitle(data.roleTitle || "");
        setUniversity(data.university || "");
        setDegree(data.degree || "");
        setExperienceYears(data.experienceYears ?? 7);
        setAvatarUrl(data.avatarUrl || "");
        setRating(data.rating ?? 4.9);
        setCompletedOrders(data.completedOrders ?? 450);
        setSuccessRate(data.successRate || "98.5%");
        setSpecialties(Array.isArray(data.specialties) ? data.specialties : []);
        setBio(data.bio || "");
        setFeaturedReviewQuote(data.featuredReviewQuote || "");
        setFeaturedReviewAuthor(data.featuredReviewAuthor || "");
        setIsFeatured(data.isFeatured ?? true);
        setDisplayOrder(data.displayOrder ?? 1);
        setStatus(data.status || "published");
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setErrorMsg(
          err instanceof Error ? err.message : "Failed to load expert details."
        );
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [expertId, initialData]);

  if (isLoading) {
    return (
      <div className="p-16 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#FF641A]" />
        <p className="text-sm">Loading expert details...</p>
      </div>
    );
  }

  // Add Specialty Tag
  const handleAddSpecialty = () => {
    const trimmed = newSpecialty.trim();
    if (trimmed && !specialties.includes(trimmed)) {
      setSpecialties([...specialties, trimmed]);
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (spec: string) => {
    setSpecialties(specialties.filter((s) => s !== spec));
  };

  // Avatar upload handler
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    setErrorMsg(null);
    try {
      const res = await uploadExpertAvatar(file);
      setAvatarUrl(res.url);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to upload avatar image."
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!name.trim()) {
      setErrorMsg("Expert Name is required.");
      return;
    }
    if (!roleTitle.trim()) {
      setErrorMsg("Role Title is required.");
      return;
    }
    if (!university.trim()) {
      setErrorMsg("University is required.");
      return;
    }
    if (!degree.trim()) {
      setErrorMsg("Degree & Credentials is required.");
      return;
    }
    if (!bio.trim()) {
      setErrorMsg("Academic Bio is required.");
      return;
    }
    if (specialties.length === 0) {
      setErrorMsg("Please add at least one subject specialty.");
      return;
    }

    const payload: CreateExpertPayload = {
      name: name.trim(),
      slug: slug.trim() || undefined,
      roleTitle: roleTitle.trim(),
      university: university.trim(),
      degree: degree.trim(),
      avatarUrl: avatarUrl.trim() || null,
      rating: Number(rating),
      completedOrders: Number(completedOrders),
      successRate: successRate.trim() || "98.5%",
      experienceYears: Number(experienceYears),
      bio: bio.trim(),
      specialties,
      featuredReviewQuote: featuredReviewQuote.trim() || null,
      featuredReviewAuthor: featuredReviewAuthor.trim() || null,
      isFeatured,
      displayOrder: Number(displayOrder),
      status,
    };

    setIsSaving(true);
    try {
      if ((isEdit || expertId) && currentId) {
        await updateExpert(currentId, payload);
      } else {
        await createExpert(payload);
      }
      router.push("/experts");
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to save expert profile."
      );
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-12">
      {/* Top Bar with Back Link */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/experts"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Experts Roster</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link
            href="/experts"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#FF641A]/20 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            <span>{isSaving ? "Saving..." : isEdit ? "Update Expert" : "Create Expert"}</span>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Section 1: Basic Identity & Credentials */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#FF641A]" />
          <span>1. Academic Faculty Credentials</span>
        </h2>

        {/* Avatar Upload Block */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Expert Avatar / Portrait Photo
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Expert avatar preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg bg-slate-800">
                  {name ? name.slice(0, 2).toUpperCase() : "EXP"}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer transition-colors inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#FF641A]" />
                  <span>{isUploadingAvatar ? "Uploading..." : "Upload New Photo"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarFileChange}
                    disabled={isUploadingAvatar}
                    className="hidden"
                  />
                </label>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl("")}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Or paste relative image path or URL (e.g. /images/male-expert1.jpg)"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
              />
              <p className="text-[11px] text-slate-400">
                Recommended: Square image (at least 400×400px), JPG/PNG/WebP, max 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Alan Crawford"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!isEdit && !slug) {
                  // auto slug preview
                }
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              URL Slug (Optional / Auto-generated)
            </label>
            <input
              type="text"
              placeholder="e.g. dr-alan-crawford"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Role / Professional Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Forensic Accounting & Auditing Specialist"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Degree &amp; Credentials *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ph.D., CPA or M.Sc., CMA"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Alma Mater / University *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Oxford University or MIT / Stanford University"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Years of Academic Experience
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Performance Metrics */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span>2. Performance &amp; Trust Metrics</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Student Rating (Max 5.0)
            </label>
            <input
              type="number"
              step="0.01"
              min="1.0"
              max="5.0"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value) || 4.9)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Completed Papers / Orders
            </label>
            <input
              type="number"
              min={1}
              value={completedOrders}
              onChange={(e) => setCompletedOrders(parseInt(e.target.value) || 100)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              On-Time Success Rate
            </label>
            <input
              type="text"
              placeholder="e.g. 99.8%"
              value={successRate}
              onChange={(e) => setSuccessRate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Subject Specialties & Academic Bio */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400" />
          <span>3. Specialties &amp; Comprehensive Bio</span>
        </h2>

        {/* Tag Input for Specialties */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Subject Specialties * (Add at least one)
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Type discipline (e.g. Corporate Finance) and press Enter"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSpecialty();
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
            />
            <button
              type="button"
              onClick={handleAddSpecialty}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {specialties.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {specialties.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
                >
                  <span>{spec}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(spec)}
                    className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-500">No specialties added yet.</p>
          )}
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Academic Biography &amp; Field Overview *
          </label>
          <textarea
            required
            rows={5}
            placeholder="Detailed academic summary, university teaching history, and subject mentoring methodology..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A] leading-relaxed"
          />
          <div className="flex justify-end text-[11px] text-slate-500 mt-1">
            <span>{bio.length} characters</span>
          </div>
        </div>
      </div>

      {/* Section 4: Student Feedback Spotlight */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF641A]" />
          <span>4. Featured Student Endorsement (Optional)</span>
        </h2>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Featured Testimonial / Review Quote
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Dr. Crawford helped me master my advanced forensic accounting coursework with unmatched clarity and precision."
            value={featuredReviewQuote}
            onChange={(e) => setFeaturedReviewQuote(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Endorser / Student Credential
          </label>
          <input
            type="text"
            placeholder="e.g. David K., Oxford M.Sc. Student"
            value={featuredReviewAuthor}
            onChange={(e) => setFeaturedReviewAuthor(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
          />
        </div>
      </div>

      {/* Section 5: Visibility & Ordering Settings */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>5. Publishing &amp; Display Order</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            >
              <option value="published">Published (Visible Live)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Display Sequence Order
            </label>
            <input
              type="number"
              min={1}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
            />
          </div>

          <div className="flex items-center sm:pt-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-[#FF641A] focus:ring-[#FF641A] bg-slate-800"
              />
              <span className="text-xs font-semibold text-slate-200">
                Feature on Homepage Slider &amp; Spotlight
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Link
          href="/experts"
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#FF641A]/20 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          <span>{isSaving ? "Saving..." : isEdit ? "Update Expert" : "Create Expert"}</span>
        </button>
      </div>
    </form>
  );
}
