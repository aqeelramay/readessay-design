"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calculator,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Sliders,
  Calendar,
  GraduationCap,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ExternalLink,
  Info,
  DollarSign,
  Check,
  X,
} from "lucide-react";
import {
  getAdminCalculatorData,
  updateCalculatorConfig,
  bulkUpdateCalculatorRates,
  createCalculatorLevel,
  updateCalculatorLevel,
  deleteCalculatorLevel,
  createCalculatorDeadline,
  updateCalculatorDeadline,
  deleteCalculatorDeadline,
  createCalculatorPaperType,
  updateCalculatorPaperType,
  deleteCalculatorPaperType,
  type AdminCalculatorData,
  type CalculatorConfig,
  type CalculatorLevel,
  type CalculatorDeadline,
  type CalculatorPaperType,
  type CalculatorRate,
} from "@/lib/api";

type ActiveTab = "matrix" | "flow" | "settings";

export function CalculatorManagerView() {
  const [data, setData] = useState<AdminCalculatorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("matrix");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Rate Matrix Draft State: Record<"levelId_deadlineId", number>
  const [rateDrafts, setRateDrafts] = useState<Record<string, number>>({});
  const [isSavingRates, setIsSavingRates] = useState(false);

  // Config Draft State
  const [configDraft, setConfigDraft] = useState<CalculatorConfig | null>(null);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  // Modals / Item editing state
  const [editingLevel, setEditingLevel] = useState<CalculatorLevel | null>(null);
  const [newLevelModalOpen, setNewLevelModalOpen] = useState(false);
  const [levelForm, setLevelForm] = useState({ name: "", slug: "", displayOrder: 1, isActive: true });

  const [editingDeadline, setEditingDeadline] = useState<CalculatorDeadline | null>(null);
  const [newDeadlineModalOpen, setNewDeadlineModalOpen] = useState(false);
  const [deadlineForm, setDeadlineForm] = useState({ label: "", slug: "", hours: 24, displayOrder: 1, isActive: true });

  const [editingPaperType, setEditingPaperType] = useState<CalculatorPaperType | null>(null);
  const [newPaperTypeModalOpen, setNewPaperTypeModalOpen] = useState(false);
  const [paperTypeForm, setPaperTypeForm] = useState({ name: "", slug: "", multiplier: 1.0, displayOrder: 1, isActive: true });

  // Live Preview Interactive State
  const [previewLevelSlug, setPreviewLevelSlug] = useState<string>("");
  const [previewServiceSlug, setPreviewServiceSlug] = useState<string>("");
  const [previewDeadlineSlug, setPreviewDeadlineSlug] = useState<string>("");
  const [previewPages, setPreviewPages] = useState<number>(2);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }

  function showError(msg: string) {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 6000);
  }

  // Load Admin Calculator Data
  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await getAdminCalculatorData();
      setData(res);
      setConfigDraft(res.config);

      // Initialize rate drafts
      const drafts: Record<string, number> = {};
      res.rates.forEach((r) => {
        drafts[`${r.levelId}_${r.deadlineId}`] = r.pricePerPage;
      });
      setRateDrafts(drafts);

      // Initialize preview defaults
      if (res.config.defaultLevelSlug) {
        setPreviewLevelSlug(res.config.defaultLevelSlug);
      } else if (res.levels.length > 0) {
        setPreviewLevelSlug(res.levels[0].slug);
      }

      if (res.config.defaultDeadlineSlug) {
        setPreviewDeadlineSlug(res.config.defaultDeadlineSlug);
      } else if (res.deadlines.length > 0) {
        setPreviewDeadlineSlug(res.deadlines[0].slug);
      }

      if (res.services.length > 0) {
        setPreviewServiceSlug(res.services[0].slug);
      } else if (res.paperTypes.length > 0) {
        setPreviewServiceSlug(res.paperTypes[0].slug);
      }

      if (res.config.defaultPages) {
        setPreviewPages(res.config.defaultPages);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load calculator data";
      setLoadError(msg);
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Check if rate drafts differ from saved data
  const dirtyRatesCount = useMemo(() => {
    if (!data) return 0;
    let count = 0;
    data.rates.forEach((r) => {
      const draftVal = rateDrafts[`${r.levelId}_${r.deadlineId}`];
      if (draftVal !== undefined && Math.abs(draftVal - r.pricePerPage) > 0.0001) {
        count++;
      }
    });
    return count;
  }, [data, rateDrafts]);

  // Handle cell rate edit
  const handleRateChange = (levelId: string, deadlineId: string, value: string) => {
    const num = parseFloat(value);
    setRateDrafts((prev) => ({
      ...prev,
      [`${levelId}_${deadlineId}`]: isNaN(num) ? 0 : num,
    }));
  };

  // Auto-fill a single row from High School base rate with 1.25x ladder
  const autoFillRowLadder = (deadlineId: string) => {
    if (!data || data.levels.length === 0) return;
    const sortedLevels = [...data.levels].sort((a, b) => a.displayOrder - b.displayOrder);
    const baseLevel = sortedLevels[0];
    const baseRate = rateDrafts[`${baseLevel.id}_${deadlineId}`] || 10;

    let currentRate = baseRate;
    const newDrafts = { ...rateDrafts };

    sortedLevels.forEach((level, idx) => {
      if (idx === 0) {
        newDrafts[`${level.id}_${deadlineId}`] = Number(baseRate.toFixed(2));
      } else {
        currentRate = currentRate * 1.25;
        newDrafts[`${level.id}_${deadlineId}`] = Number(currentRate.toFixed(2));
      }
    });

    setRateDrafts(newDrafts);
    showToast(`Calculated ×1.25 ladder for deadline row across ${sortedLevels.length} levels`);
  };

  // Auto-fill ALL rows from their first level base rate with 1.25x ladder
  const autoFillAllRowsLadder = () => {
    if (!data || data.levels.length === 0) return;
    const sortedLevels = [...data.levels].sort((a, b) => a.displayOrder - b.displayOrder);
    const newDrafts = { ...rateDrafts };

    data.deadlines.forEach((deadline) => {
      const baseLevel = sortedLevels[0];
      const baseRate = rateDrafts[`${baseLevel.id}_${deadline.id}`] || 10;

      let currentRate = baseRate;
      sortedLevels.forEach((level, idx) => {
        if (idx === 0) {
          newDrafts[`${level.id}_${deadline.id}`] = Number(baseRate.toFixed(2));
        } else {
          currentRate = currentRate * 1.25;
          newDrafts[`${level.id}_${deadline.id}`] = Number(currentRate.toFixed(2));
        }
      });
    });

    setRateDrafts(newDrafts);
    showToast(`Applied ×1.25 academic ladder across all ${data.deadlines.length} deadlines`);
  };

  // Revert rate drafts to database state
  const resetRateDrafts = () => {
    if (!data) return;
    const drafts: Record<string, number> = {};
    data.rates.forEach((r) => {
      drafts[`${r.levelId}_${r.deadlineId}`] = r.pricePerPage;
    });
    setRateDrafts(drafts);
    showToast("Reverted pricing matrix to saved rates");
  };

  // Save Pricing Matrix
  const saveRates = async () => {
    if (!data) return;
    setIsSavingRates(true);
    try {
      const ratesToSave: { levelId: string; deadlineId: string; pricePerPage: number }[] = [];
      data.levels.forEach((l) => {
        data.deadlines.forEach((d) => {
          const val = rateDrafts[`${l.id}_${d.id}`];
          if (val !== undefined) {
            ratesToSave.push({
              levelId: l.id,
              deadlineId: d.id,
              pricePerPage: Number(val),
            });
          }
        });
      });

      await bulkUpdateCalculatorRates(ratesToSave);
      showToast(`Successfully saved ${ratesToSave.length} rates to the pricing matrix!`);
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save rate matrix";
      showError(msg);
    } finally {
      setIsSavingRates(false);
    }
  };

  // Save Settings Config
  const saveConfig = async () => {
    if (!configDraft) return;
    setIsSavingConfig(true);
    try {
      await updateCalculatorConfig({
        widgetTitle: configDraft.widgetTitle,
        widgetSubtitle: configDraft.widgetSubtitle,
        badgeText: configDraft.badgeText,
        ctaButtonText: configDraft.ctaButtonText,
        currencySymbol: configDraft.currencySymbol,
        wordsPerPage: Number(configDraft.wordsPerPage),
        minPages: Number(configDraft.minPages),
        maxPages: Number(configDraft.maxPages),
        defaultPages: Number(configDraft.defaultPages),
        defaultLevelSlug: configDraft.defaultLevelSlug,
        defaultDeadlineSlug: configDraft.defaultDeadlineSlug,
        useServicesFromCatalog: Boolean(configDraft.useServicesFromCatalog),
      });
      showToast("Calculator widget configuration updated successfully!");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update configuration";
      showError(msg);
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Level CRUD
  const handleCreateLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCalculatorLevel(levelForm);
      showToast(`Created level "${levelForm.name}" with default rates`);
      setNewLevelModalOpen(false);
      setLevelForm({ name: "", slug: "", displayOrder: (data?.levels.length || 0) + 1, isActive: true });
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to create level");
    }
  };

  const handleUpdateLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLevel) return;
    try {
      await updateCalculatorLevel(editingLevel.id, {
        name: editingLevel.name,
        slug: editingLevel.slug,
        displayOrder: editingLevel.displayOrder,
        isActive: editingLevel.isActive,
      });
      showToast(`Updated level "${editingLevel.name}"`);
      setEditingLevel(null);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update level");
    }
  };

  const handleDeleteLevel = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete level "${name}"? All associated rate cells will be deleted.`)) return;
    try {
      await deleteCalculatorLevel(id);
      showToast(`Deleted level "${name}"`);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to delete level");
    }
  };

  // Deadline CRUD
  const handleCreateDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCalculatorDeadline(deadlineForm);
      showToast(`Created deadline "${deadlineForm.label}" with default rates`);
      setNewDeadlineModalOpen(false);
      setDeadlineForm({ label: "", slug: "", hours: 24, displayOrder: (data?.deadlines.length || 0) + 1, isActive: true });
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to create deadline");
    }
  };

  const handleUpdateDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeadline) return;
    try {
      await updateCalculatorDeadline(editingDeadline.id, {
        label: editingDeadline.label,
        slug: editingDeadline.slug,
        hours: Number(editingDeadline.hours),
        displayOrder: editingDeadline.displayOrder,
        isActive: editingDeadline.isActive,
      });
      showToast(`Updated deadline "${editingDeadline.label}"`);
      setEditingDeadline(null);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update deadline");
    }
  };

  const handleDeleteDeadline = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete deadline "${label}"? All associated rate cells will be deleted.`)) return;
    try {
      await deleteCalculatorDeadline(id);
      showToast(`Deleted deadline "${label}"`);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to delete deadline");
    }
  };

  // Paper Type CRUD
  const handleCreatePaperType = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCalculatorPaperType(paperTypeForm);
      showToast(`Created paper type "${paperTypeForm.name}"`);
      setNewPaperTypeModalOpen(false);
      setPaperTypeForm({ name: "", slug: "", multiplier: 1.0, displayOrder: (data?.paperTypes.length || 0) + 1, isActive: true });
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to create paper type");
    }
  };

  const handleUpdatePaperType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaperType) return;
    try {
      await updateCalculatorPaperType(editingPaperType.id, {
        name: editingPaperType.name,
        slug: editingPaperType.slug,
        multiplier: Number(editingPaperType.multiplier),
        displayOrder: editingPaperType.displayOrder,
        isActive: editingPaperType.isActive,
      });
      showToast(`Updated paper type "${editingPaperType.name}"`);
      setEditingPaperType(null);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update paper type");
    }
  };

  const handleDeletePaperType = async (id: string, name: string) => {
    if (!confirm(`Delete paper type "${name}"?`)) return;
    try {
      await deleteCalculatorPaperType(id);
      showToast(`Deleted paper type "${name}"`);
      await loadData();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to delete paper type");
    }
  };

  // Live Calculator Calculation Logic for Preview Card
  const previewCalculation = useMemo(() => {
    if (!data) return { pricePerPage: 0, totalPrice: 0, words: 0, multiplier: 1.0 };

    const selectedLevel = data.levels.find((l) => l.slug === previewLevelSlug) || data.levels[0];
    const selectedDeadline = data.deadlines.find((d) => d.slug === previewDeadlineSlug) || data.deadlines[0];

    let ratePerPage = 15;
    if (selectedLevel && selectedDeadline) {
      const key = `${selectedLevel.id}_${selectedDeadline.id}`;
      ratePerPage = rateDrafts[key] ?? 15;
    }

    let multiplier = 1.0;
    if (data.config.useServicesFromCatalog) {
      // Catalog services default to 1.0 multiplier
      multiplier = 1.0;
    } else {
      const pt = data.paperTypes.find((p) => p.slug === previewServiceSlug);
      if (pt) multiplier = pt.multiplier;
    }

    const wordsPerPage = configDraft?.wordsPerPage || data.config.wordsPerPage || 275;
    const words = previewPages * wordsPerPage;
    const totalPrice = ratePerPage * multiplier * previewPages;

    return {
      pricePerPage: ratePerPage,
      multiplier,
      totalPrice: Number(totalPrice.toFixed(2)),
      words,
      levelName: selectedLevel?.name || "Undergraduate",
      deadlineLabel: selectedDeadline?.label || "6 days",
    };
  }, [data, previewLevelSlug, previewDeadlineSlug, previewServiceSlug, previewPages, rateDrafts, configDraft]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-[#FF641A] mb-3" />
        <p className="text-sm font-medium">Loading pricing matrix and calculator configurations...</p>
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="p-6 bg-red-950/40 border border-red-500/30 rounded-xl text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-white">Failed to Load Calculator Data</h3>
        <p className="text-sm text-red-300 mt-1 mb-4">{loadError || "Database connection error"}</p>
        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  const sortedLevels = [...data.levels].sort((a, b) => a.displayOrder - b.displayOrder);
  const sortedDeadlines = [...data.deadlines].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-rose-600 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#243445]/60 border border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF641A]/10 border border-[#FF641A]/20 flex items-center justify-center text-[#FF641A]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Order Pricing & Calculator</h1>
              <p className="text-sm text-slate-300">
                Full-funnel database matrix: per-page rates, academic tiers, deadline rules, and live hero widget.
              </p>
            </div>
          </div>
        </div>

        {/* Global Stats Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400">Matrix: </span>
            <span className="font-semibold text-white">
              {sortedLevels.length} Levels × {sortedDeadlines.length} Deadlines
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400">Words/Page: </span>
            <span className="font-semibold text-[#FF641A]">{data.config.wordsPerPage}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400">Currency: </span>
            <span className="font-semibold text-emerald-400">{data.config.currencySymbol} USD</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Tabs (col-span-8) + Right Live Preview (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Management Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab("matrix")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "matrix"
                  ? "bg-[#FF641A] text-white shadow-md shadow-[#FF641A]/20"
                  : "bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Pricing Matrix (Excel Grid)</span>
              {dirtyRatesCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-amber-400 text-slate-950 font-bold">
                  {dirtyRatesCount} unsaved
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("flow")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "flow"
                  ? "bg-[#FF641A] text-white shadow-md shadow-[#FF641A]/20"
                  : "bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Levels & Deadlines Flow</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-[#FF641A] text-white shadow-md shadow-[#FF641A]/20"
                  : "bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Widget Settings</span>
            </button>
          </div>

          {/* TAB 1: PRICING MATRIX (EXCEL GRID) */}
          {activeTab === "matrix" && (
            <div className="space-y-4">
              {/* Matrix Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                <div className="flex items-center gap-2">
                  <button
                    onClick={autoFillAllRowsLadder}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold transition-colors"
                    title="Calculate all rows based on High School column using ×1.25 multiplier ladder"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Auto-Fill All Rows (×1.25 Ladder)</span>
                  </button>

                  {dirtyRatesCount > 0 && (
                    <button
                      onClick={resetRateDrafts}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revert Changes</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    Values saved in <strong className="text-white">{data.config.currencySymbol} USD</strong> per page
                  </span>
                  <button
                    onClick={saveRates}
                    disabled={isSavingRates}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm shadow-[#FF641A]/20"
                  >
                    {isSavingRates ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Pricing Matrix</span>
                  </button>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-md">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#243445] text-slate-200 border-b border-slate-700">
                      <th className="py-3 px-4 font-semibold w-28 uppercase tracking-wider text-[11px]">
                        Deadline
                      </th>
                      {sortedLevels.map((lvl) => (
                        <th key={lvl.id} className="py-3 px-3 font-semibold text-center border-l border-slate-700/60">
                          <div className="flex flex-col items-center">
                            <span>{lvl.name}</span>
                            {!lvl.isActive && (
                              <span className="text-[10px] text-rose-400 font-normal">(Inactive)</span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="py-3 px-3 font-semibold text-center border-l border-slate-700/60 w-24">
                        Row Helper
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sortedDeadlines.map((dl) => (
                      <tr key={dl.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Deadline Label Header */}
                        <td className="py-2.5 px-4 font-medium text-white bg-slate-900/60">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{dl.label}</span>
                            {!dl.isActive && (
                              <span className="text-[9px] text-rose-400 font-normal">off</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block">{dl.hours} hrs</span>
                        </td>

                        {/* Level Rate Cells */}
                        {sortedLevels.map((lvl) => {
                          const key = `${lvl.id}_${dl.id}`;
                          const currentVal = rateDrafts[key] ?? 0;
                          const originalRate = data.rates.find(
                            (r) => r.levelId === lvl.id && r.deadlineId === dl.id
                          )?.pricePerPage;
                          const isCellDirty =
                            originalRate !== undefined && Math.abs(currentVal - originalRate) > 0.0001;

                          return (
                            <td key={lvl.id} className="py-2 px-2 text-center border-l border-slate-800">
                              <div className="relative inline-block w-24">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                                  $
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={currentVal}
                                  onChange={(e) => handleRateChange(lvl.id, dl.id, e.target.value)}
                                  className={`w-full pl-6 pr-2 py-1.5 rounded-md text-right text-xs font-mono font-semibold transition-all border ${
                                    isCellDirty
                                      ? "bg-amber-950/40 border-amber-500/80 text-amber-200 focus:ring-1 focus:ring-amber-400"
                                      : "bg-slate-800/70 border-slate-700 text-white focus:border-[#FF641A] focus:ring-1 focus:ring-[#FF641A]"
                                  } focus:outline-none`}
                                />
                              </div>
                            </td>
                          );
                        })}

                        {/* Row Auto Ladder Helper Button */}
                        <td className="py-2 px-2 text-center border-l border-slate-800">
                          <button
                            onClick={() => autoFillRowLadder(dl.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-medium transition-colors"
                            title="Fill row from High School with 1.25x ladder"
                          >
                            <Sparkles className="w-3 h-3 text-[#FF641A]" />
                            <span>×1.25</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: LEVELS & DEADLINES FLOW */}
          {activeTab === "flow" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Levels Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#FF641A]" />
                    <h2 className="text-base font-bold text-white">Academic Levels</h2>
                  </div>
                  <button
                    onClick={() => {
                      setLevelForm({ name: "", slug: "", displayOrder: sortedLevels.length + 1, isActive: true });
                      setNewLevelModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Level</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {sortedLevels.map((lvl) => (
                    <div
                      key={lvl.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-[10px]">
                          {lvl.displayOrder}
                        </span>
                        <div>
                          <p className="font-bold text-white">{lvl.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">slug: {lvl.slug}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            lvl.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {lvl.isActive ? "Active" : "Hidden"}
                        </span>
                        <button
                          onClick={() => setEditingLevel(lvl)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Level"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLevel(lvl.id, lvl.name)}
                          className="p-1 rounded hover:bg-rose-900/40 text-rose-400"
                          title="Delete Level"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deadline Tiers Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-base font-bold text-white">Deadline Tiers</h2>
                  </div>
                  <button
                    onClick={() => {
                      setDeadlineForm({ label: "", slug: "", hours: 24, displayOrder: sortedDeadlines.length + 1, isActive: true });
                      setNewDeadlineModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Tier</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {sortedDeadlines.map((dl) => (
                    <div
                      key={dl.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-[10px]">
                          {dl.displayOrder}
                        </span>
                        <div>
                          <p className="font-bold text-white">{dl.label}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {dl.hours} hrs &bull; slug: {dl.slug}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            dl.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {dl.isActive ? "Active" : "Hidden"}
                        </span>
                        <button
                          onClick={() => setEditingDeadline(dl)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Deadline"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDeadline(dl.id, dl.label)}
                          className="p-1 rounded hover:bg-rose-900/40 text-rose-400"
                          title="Delete Deadline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WIDGET SETTINGS */}
          {activeTab === "settings" && configDraft && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Calculator Widget Configurations</h2>
                  <p className="text-xs text-slate-400">
                    Control texts, default options, words-per-page, and service catalog bindings.
                  </p>
                </div>
                <button
                  onClick={saveConfig}
                  disabled={isSavingConfig}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm shadow-[#FF641A]/20"
                >
                  {isSavingConfig ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Widget Title</label>
                  <input
                    type="text"
                    value={configDraft.widgetTitle}
                    onChange={(e) => setConfigDraft({ ...configDraft, widgetTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={configDraft.badgeText}
                    onChange={(e) => setConfigDraft({ ...configDraft, badgeText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Widget Subtitle</label>
                  <input
                    type="text"
                    value={configDraft.widgetSubtitle}
                    onChange={(e) => setConfigDraft({ ...configDraft, widgetSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={configDraft.ctaButtonText}
                    onChange={(e) => setConfigDraft({ ...configDraft, ctaButtonText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={configDraft.currencySymbol}
                    onChange={(e) => setConfigDraft({ ...configDraft, currencySymbol: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Words Per Page</label>
                  <input
                    type="number"
                    value={configDraft.wordsPerPage}
                    onChange={(e) => setConfigDraft({ ...configDraft, wordsPerPage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Standard academic guideline is 275 words.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Default Pages</label>
                  <input
                    type="number"
                    value={configDraft.defaultPages}
                    onChange={(e) => setConfigDraft({ ...configDraft, defaultPages: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Default Academic Level</label>
                  <select
                    value={configDraft.defaultLevelSlug}
                    onChange={(e) => setConfigDraft({ ...configDraft, defaultLevelSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  >
                    {sortedLevels.map((lvl) => (
                      <option key={lvl.id} value={lvl.slug}>
                        {lvl.name} ({lvl.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Default Deadline</label>
                  <select
                    value={configDraft.defaultDeadlineSlug}
                    onChange={(e) => setConfigDraft({ ...configDraft, defaultDeadlineSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                  >
                    {sortedDeadlines.map((dl) => (
                      <option key={dl.id} value={dl.slug}>
                        {dl.label} ({dl.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={configDraft.useServicesFromCatalog}
                      onChange={(e) => setConfigDraft({ ...configDraft, useServicesFromCatalog: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FF641A] focus:ring-0 bg-slate-800 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white">Use Live Services from Services Catalog</span>
                      <p className="text-[11px] text-slate-400">
                        When enabled, the service dropdown populates from published services in the CMS database.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom Paper Types & Multipliers Section */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Custom Paper Types & Multipliers</h3>
                    <p className="text-[11px] text-slate-400">
                      Fallback paper types and price multipliers (e.g., Essay 1.0x, Dissertation 1.3x).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPaperTypeForm({ name: "", slug: "", multiplier: 1.0, displayOrder: data.paperTypes.length + 1, isActive: true });
                      setNewPaperTypeModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paper Type</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.paperTypes.map((pt) => (
                    <div
                      key={pt.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white">{pt.name}</span>
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300 font-mono">
                          {pt.multiplier}x
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingPaperType(pt)}
                          className="p-1 rounded hover:bg-slate-700 text-slate-300"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeletePaperType(pt.id, pt.name)}
                          className="p-1 rounded hover:bg-rose-900/40 text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Preview Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 bg-slate-900/95 border-2 border-[#FF641A]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
            {/* Preview Card Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Live Hero Preview</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FF641A]/20 text-[#FF641A]">
                {configDraft?.badgeText || "PRICE CALCULATOR"}
              </span>
            </div>

            {/* Widget Title & Subtitle */}
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {configDraft?.widgetTitle || "Calculate Order Price"}
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {configDraft?.widgetSubtitle || "Instant estimate tailored to your exact academic needs"}
              </p>
            </div>

            {/* Level Selector Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-300">Academic Level</label>
              <div className="grid grid-cols-3 gap-1">
                {sortedLevels.filter((l) => l.isActive).map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setPreviewLevelSlug(lvl.slug)}
                    className={`py-1 px-1.5 rounded text-[11px] font-semibold truncate transition-all ${
                      previewLevelSlug === lvl.slug
                        ? "bg-[#FF641A] text-white shadow-sm"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service / Paper Type Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-300">Type of Service</label>
              <select
                value={previewServiceSlug}
                onChange={(e) => setPreviewServiceSlug(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FF641A]"
              >
                {data.config.useServicesFromCatalog
                  ? data.services.map((svc) => (
                      <option key={svc.id} value={svc.slug}>
                        {svc.title}
                      </option>
                    ))
                  : data.paperTypes.map((pt) => (
                      <option key={pt.id} value={pt.slug}>
                        {pt.name} ({pt.multiplier}x)
                      </option>
                    ))}
              </select>
            </div>

            {/* Deadline Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-300">Deadline</label>
              <select
                value={previewDeadlineSlug}
                onChange={(e) => setPreviewDeadlineSlug(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FF641A]"
              >
                {sortedDeadlines.filter((d) => d.isActive).map((dl) => (
                  <option key={dl.id} value={dl.slug}>
                    {dl.label} ({dl.hours} hrs)
                  </option>
                ))}
              </select>
            </div>

            {/* Pages & Word Count Stepper */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-300">Pages / Words</span>
                <span className="text-slate-400 font-mono">
                  {previewCalculation.words.toLocaleString()} words ({configDraft?.wordsPerPage || 275} w/p)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewPages((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={previewPages}
                  onChange={(e) => setPreviewPages(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 py-1.5 px-2 text-center rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-[#FF641A]"
                />
                <button
                  type="button"
                  onClick={() => setPreviewPages((p) => p + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Calculated Price Display */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Total Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#FF641A] font-heading tracking-tight">
                    ${previewCalculation.totalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1 font-semibold">USD</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60 font-mono">
                <span>
                  Rate: ${previewCalculation.pricePerPage.toFixed(2)}/page
                </span>
                <span>
                  {previewPages} pages &bull; {previewCalculation.words} words
                </span>
              </div>
            </div>

            {/* CTA Button Preview */}
            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF641A]/20 transition-all"
            >
              <span>{configDraft?.ctaButtonText || "Continue with Order"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Hand-off URL query inspection */}
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400 space-y-0.5">
              <div className="flex items-center gap-1 font-semibold text-slate-300">
                <Info className="w-3 h-3 text-[#FF641A]" />
                <span>Redirect Target:</span>
              </div>
              <p className="font-mono break-all text-slate-400">
                /contact?service={previewServiceSlug}&amp;level={previewLevelSlug}&amp;deadline={previewDeadlineSlug}&amp;pages={previewPages}&amp;words={previewCalculation.words}&amp;estimate={previewCalculation.totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD LEVEL */}
      {newLevelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Add Academic Level</h3>
            <form onSubmit={handleCreateLevel} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Level Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Postgraduate"
                  value={levelForm.name}
                  onChange={(e) => setLevelForm({ ...levelForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug (optional)</label>
                <input
                  type="text"
                  placeholder="postgraduate"
                  value={levelForm.slug}
                  onChange={(e) => setLevelForm({ ...levelForm, slug: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  value={levelForm.displayOrder}
                  onChange={(e) => setLevelForm({ ...levelForm, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewLevelModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold"
                >
                  Create Level
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT LEVEL */}
      {editingLevel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Edit Academic Level</h3>
            <form onSubmit={handleUpdateLevel} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Level Name</label>
                <input
                  type="text"
                  required
                  value={editingLevel.name}
                  onChange={(e) => setEditingLevel({ ...editingLevel, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingLevel.slug}
                  onChange={(e) => setEditingLevel({ ...editingLevel, slug: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingLevel.displayOrder}
                  onChange={(e) => setEditingLevel({ ...editingLevel, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingLevel.isActive}
                  onChange={(e) => setEditingLevel({ ...editingLevel, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#FF641A] bg-slate-800 border-slate-700"
                />
                <span className="text-xs text-white">Active in Calculator</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingLevel(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DEADLINE */}
      {newDeadlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Add Deadline Tier</h3>
            <form onSubmit={handleCreateDeadline} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 days"
                  value={deadlineForm.label}
                  onChange={(e) => setDeadlineForm({ ...deadlineForm, label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hours</label>
                <input
                  type="number"
                  required
                  placeholder="336"
                  value={deadlineForm.hours}
                  onChange={(e) => setDeadlineForm({ ...deadlineForm, hours: parseInt(e.target.value) || 24 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug (optional)</label>
                <input
                  type="text"
                  placeholder="14-days"
                  value={deadlineForm.slug}
                  onChange={(e) => setDeadlineForm({ ...deadlineForm, slug: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  value={deadlineForm.displayOrder}
                  onChange={(e) => setDeadlineForm({ ...deadlineForm, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewDeadlineModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  Create Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DEADLINE */}
      {editingDeadline && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Edit Deadline Tier</h3>
            <form onSubmit={handleUpdateDeadline} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Label</label>
                <input
                  type="text"
                  required
                  value={editingDeadline.label}
                  onChange={(e) => setEditingDeadline({ ...editingDeadline, label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hours</label>
                <input
                  type="number"
                  required
                  value={editingDeadline.hours}
                  onChange={(e) => setEditingDeadline({ ...editingDeadline, hours: parseInt(e.target.value) || 24 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingDeadline.slug}
                  onChange={(e) => setEditingDeadline({ ...editingDeadline, slug: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingDeadline.displayOrder}
                  onChange={(e) => setEditingDeadline({ ...editingDeadline, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingDeadline.isActive}
                  onChange={(e) => setEditingDeadline({ ...editingDeadline, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#FF641A] bg-slate-800 border-slate-700"
                />
                <span className="text-xs text-white">Active in Calculator</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDeadline(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PAPER TYPE */}
      {newPaperTypeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Add Paper Type Option</h3>
            <form onSubmit={handleCreatePaperType} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dissertation"
                  value={paperTypeForm.name}
                  onChange={(e) => setPaperTypeForm({ ...paperTypeForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Multiplier (e.g. 1.0, 1.25)</label>
                <input
                  type="number"
                  step="0.05"
                  required
                  value={paperTypeForm.multiplier}
                  onChange={(e) => setPaperTypeForm({ ...paperTypeForm, multiplier: parseFloat(e.target.value) || 1.0 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPaperTypeModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PAPER TYPE */}
      {editingPaperType && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Edit Paper Type Option</h3>
            <form onSubmit={handleUpdatePaperType} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingPaperType.name}
                  onChange={(e) => setEditingPaperType({ ...editingPaperType, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Multiplier</label>
                <input
                  type="number"
                  step="0.05"
                  required
                  value={editingPaperType.multiplier}
                  onChange={(e) => setEditingPaperType({ ...editingPaperType, multiplier: parseFloat(e.target.value) || 1.0 })}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingPaperType.isActive}
                  onChange={(e) => setEditingPaperType({ ...editingPaperType, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#FF641A] bg-slate-800 border-slate-700"
                />
                <span className="text-xs text-white">Active in Dropdown</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPaperType(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
