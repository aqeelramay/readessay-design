"use client";

import { useEffect, useRef, useState, useId } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  ImagePlus,
  Link2,
  Unlink,
  Undo2,
  Redo2,
  RemoveFormatting,
  Eye,
  Code2,
  Upload,
  X,
  Check,
} from "lucide-react";

interface RichArticleEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichArticleEditor({
  value,
  onChange,
  placeholder = "Write or paste your article content here...",
}: RichArticleEditorProps) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageModalFileInputId = useId();

  // Dialog Modals
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState<"file" | "url">("file");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageAltInput, setImageAltInput] = useState("");
  const [imageCaptionInput, setImageCaptionInput] = useState("");
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState<string | null>(
    null
  );

  // Sync value to visual editor when switching modes or when content changes externally
  useEffect(() => {
    if (editorRef.current && mode === "visual") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, mode]);

  // Execute standard formatting commands
  function execCmd(command: string, cmdValue?: string) {
    if (mode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  // Format Headings and Paragraphs
  function formatBlock(tag: "h2" | "h3" | "p") {
    if (mode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, `<${tag}>`);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  // Insert arbitrary HTML fragment at current selection
  function insertHtml(html: string) {
    if (mode !== "visual") return;
    editorRef.current?.focus();
    const success = document.execCommand("insertHTML", false, html);
    if (!success && typeof window !== "undefined") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        while ((node = tempDiv.firstChild)) {
          frag.appendChild(node);
        }
        range.insertNode(frag);
      }
    }
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  // Insert Faculty Insider Callout Box
  function handleInsertCallout() {
    const calloutHtml = `<blockquote class="border-l-4 border-orange bg-orange/5 p-4 rounded-r-xl my-4 text-sm text-text-primary not-italic">
  <strong class="block text-navy font-semibold mb-1">Faculty Insider Note: Title Here</strong>
  Enter callout observation or defense instruction text here...
</blockquote><p><br></p>`;
    insertHtml(calloutHtml);
  }

  // Insert Table
  function handleInsertTable() {
    const tableHtml = `<div class="overflow-x-auto my-4">
  <table class="w-full text-left border-collapse text-xs border border-border">
    <thead>
      <tr class="bg-canvas border-b border-border">
        <th class="p-2.5 font-bold text-navy">Section / Milestone</th>
        <th class="p-2.5 font-bold text-navy">Word Count Percentage</th>
        <th class="p-2.5 font-bold text-navy">Evaluation Benchmark</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-border">
      <tr>
        <td class="p-2.5 font-medium">Chapter 1: Introduction</td>
        <td class="p-2.5 font-mono">10% – 12%</td>
        <td class="p-2.5">Empirical problem gap and research questions</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium">Chapter 2: Literature Review</td>
        <td class="p-2.5 font-mono">25% – 30%</td>
        <td class="p-2.5">Thematic synthesis and theoretical model</td>
      </tr>
      <tr>
        <td class="p-2.5 font-medium">Chapter 3: Methodology</td>
        <td class="p-2.5 font-mono">15% – 20%</td>
        <td class="p-2.5">Sampling instrumentation and ethical clearance</td>
      </tr>
    </tbody>
  </table>
</div><p><br></p>`;
    insertHtml(tableHtml);
  }

  // Handle Link Insertion
  function handleApplyLink() {
    if (!linkUrl.trim()) return;
    execCmd("createLink", linkUrl.trim());
    setLinkUrl("");
    setIsLinkModalOpen(false);
  }

  // Handle Local File Selection for Image
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  // Handle Image / Figure Insertion
  function handleInsertImage() {
    const finalUrl =
      imageTab === "file" ? selectedFileDataUrl : imageUrlInput.trim();
    if (!finalUrl) return;

    const alt = imageAltInput.trim() || "Academic guide figure";
    const caption = imageCaptionInput.trim();

    const figureHtml = `<figure class="my-6 rounded-xl overflow-hidden border border-border bg-canvas/40 p-2 text-center">
  <img src="${finalUrl}" alt="${alt}" class="w-full h-auto rounded-lg object-cover max-h-[420px]" />
  ${
    caption
      ? `<figcaption class="mt-2 text-center text-xs text-text-secondary italic">${caption}</figcaption>`
      : ""
  }
</figure><p><br></p>`;

    insertHtml(figureHtml);
    // Reset modal
    setIsImageModalOpen(false);
    setSelectedFileDataUrl(null);
    setImageUrlInput("");
    setImageAltInput("");
    setImageCaptionInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Calculate live word count & read time
  const plainText = value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xs">
      {/* Top Header: Tab Mode Switcher + Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-canvas border-b border-border">
        {/* Visual vs Source Mode Toggle */}
        <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              mode === "visual"
                ? "bg-navy text-white shadow-2xs"
                : "text-text-secondary hover:text-text-primary hover:bg-canvas"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("html")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              mode === "html"
                ? "bg-navy text-white shadow-2xs"
                : "text-text-secondary hover:text-text-primary hover:bg-canvas"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Source</span>
          </button>
        </div>

        {/* Word count & Reading time indicator */}
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span className="font-mono">
            <strong className="text-text-primary">{wordCount}</strong> words
          </span>
          <span className="text-border">•</span>
          <span>
            ~<strong className="text-text-primary">{estimatedReadTime}</strong>{" "}
            min read
          </span>
        </div>
      </div>

      {/* Editor Toolbar (Visual mode only) */}
      {mode === "visual" && (
        <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-surface border-b border-border">
          {/* Headings Group */}
          <div className="flex items-center gap-1 pr-2 border-r border-border">
            <button
              type="button"
              onClick={() => formatBlock("h2")}
              title="Heading 2 (Auto-extracted into Sticky Table of Contents)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold text-orange bg-orange/10 hover:bg-orange/20 border border-orange/30 transition-colors"
            >
              <Heading2 className="w-3.5 h-3.5" />
              <span>H2 (TOC)</span>
            </button>
            <button
              type="button"
              onClick={() => formatBlock("h3")}
              title="Heading 3 (Sub-heading)"
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Heading3 className="w-3.5 h-3.5" />
              <span>H3</span>
            </button>
            <button
              type="button"
              onClick={() => formatBlock("p")}
              title="Normal Paragraph"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Pilcrow className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Inline Formats */}
          <div className="flex items-center gap-0.5 px-2 border-r border-border">
            <button
              type="button"
              onClick={() => execCmd("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-0.5 px-2 border-r border-border">
            <button
              type="button"
              onClick={() => execCmd("insertUnorderedList")}
              title="Bullet List"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Structural Components: Callout, Table, Image, Link */}
          <div className="flex items-center gap-1 px-2 border-r border-border">
            <button
              type="button"
              onClick={handleInsertCallout}
              title="Insert Faculty Insider Callout Quote"
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Quote className="w-3.5 h-3.5 text-orange" />
              <span>Callout</span>
            </button>
            <button
              type="button"
              onClick={handleInsertTable}
              title="Insert Academic Breakdown Table"
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <TableIcon className="w-3.5 h-3.5 text-navy" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              title="Insert Image or Figure (Upload file or paste URL)"
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <ImagePlus className="w-3.5 h-3.5 text-orange" />
              <span>Figure</span>
            </button>
            <button
              type="button"
              onClick={() => setIsLinkModalOpen(true)}
              title="Insert Link"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("unlink")}
              title="Remove Link"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Unlink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Utilities: Clear, Undo, Redo */}
          <div className="flex items-center gap-0.5 pl-2 ml-auto">
            <button
              type="button"
              onClick={() => execCmd("removeFormat")}
              title="Clear Formatting"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <RemoveFormatting className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("undo")}
              title="Undo"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("redo")}
              title="Redo"
              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      {mode === "visual" ? (
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            onInput={() => {
              if (editorRef.current) {
                onChange(editorRef.current.innerHTML);
              }
            }}
            data-placeholder={placeholder}
            className="min-h-[460px] p-5 sm:p-6 focus:outline-none bg-surface text-text-primary text-sm leading-relaxed overflow-y-auto max-h-[720px]
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:border-l-4 [&_h2]:border-orange [&_h2]:pl-3 [&_h2]:py-1 [&_h2]:my-5 [&_h2]:bg-orange/5 [&_h2]:rounded-r-lg
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-navy [&_h3]:my-4
              [&_p]:my-3 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1
              [&_blockquote]:border-l-4 [&_blockquote]:border-orange [&_blockquote]:bg-orange/5 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:my-4 [&_blockquote]:text-text-primary
              [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:border [&_table]:border-border
              [&_th]:border [&_th]:border-border [&_th]:p-2.5 [&_th]:bg-canvas [&_th]:font-bold [&_th]:text-navy
              [&_td]:border [&_td]:border-border [&_td]:p-2.5
              [&_figure]:my-6 [&_figure]:rounded-xl [&_figure]:overflow-hidden [&_figure]:border [&_figure]:border-border [&_figure]:bg-canvas/40 [&_figure]:p-2 [&_figure]:text-center
              [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:object-cover [&_img]:max-h-[420px]
              [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-text-secondary [&_figcaption]:italic
              [&_a]:text-orange [&_a]:underline"
          />
        </div>
      ) : (
        <textarea
          rows={22}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write clean semantic HTML markup here..."
          className="w-full p-4 text-xs font-mono text-text-primary bg-canvas/30 focus:bg-surface focus:outline-none resize-y leading-relaxed border-0"
        />
      )}

      {/* Insert Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4">
          <div className="bg-surface rounded-xl border border-border shadow-xl w-full max-w-md p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-orange" />
                <h3 className="text-sm font-bold text-text-primary">
                  Insert Hyperlink
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Destination URL
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com or /blog/topic"
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none text-text-primary font-mono"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyLink}
                disabled={!linkUrl.trim()}
                className="px-4 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Image / Figure Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4">
          <div className="bg-surface rounded-xl border border-border shadow-xl w-full max-w-lg p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-orange" />
                <h3 className="text-sm font-bold text-text-primary">
                  Insert Inline Figure / Image
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source Tab: File Upload vs URL */}
            <div className="flex items-center gap-1 bg-canvas p-1 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setImageTab("file")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  imageTab === "file"
                    ? "bg-surface text-navy shadow-2xs font-bold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Upload from Computer
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  imageTab === "url"
                    ? "bg-surface text-navy shadow-2xs font-bold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Image URL
              </button>
            </div>

            {imageTab === "file" ? (
              <div>
                <input
                  id={imageModalFileInputId}
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor={imageModalFileInputId}
                  className="border-2 border-dashed border-border hover:border-orange rounded-xl p-6 text-center cursor-pointer transition-colors block bg-canvas/40"
                >
                  <Upload className="w-6 h-6 text-orange mx-auto mb-2" />
                  <p className="text-xs font-semibold text-text-primary">
                    Click to select an image file
                  </p>
                  <p className="text-[11px] text-text-secondary mt-1">
                    PNG, JPG, WEBP, or GIF
                  </p>
                </label>

                {selectedFileDataUrl && (
                  <div className="mt-3 p-2 bg-canvas rounded-lg border border-border flex items-center gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden bg-slate-200 border border-border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedFileDataUrl}
                        alt="Selected preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Image loaded ready to
                      insert
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/... or Google CDN"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none text-text-primary font-mono"
                />
              </div>
            )}

            {/* Alt & Caption */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAltInput}
                  onChange={(e) => setImageAltInput(e.target.value)}
                  placeholder="e.g. Statistical regression matrix table"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none text-text-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Figure Caption (Optional)
                </label>
                <input
                  type="text"
                  value={imageCaptionInput}
                  onChange={(e) => setImageCaptionInput(e.target.value)}
                  placeholder="e.g. Figure 1.2: Empirical sampling distribution."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none text-text-primary"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={
                  imageTab === "file"
                    ? !selectedFileDataUrl
                    : !imageUrlInput.trim()
                }
                className="px-4 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                Insert Figure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

