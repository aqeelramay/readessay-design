import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  title,
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onCancel}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Dialog card */}
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative bg-surface border border-border rounded-2xl p-6 shadow-xl w-full max-w-md z-50 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-text-primary">
                &ldquo;{itemName}&rdquo;
              </span>
              ? This action will remove it from the admin catalog.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

