"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setError("Please enter a valid work email address.");
      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 450);
  }

  // ==========================================
  // Confirmation State (Anti-enumeration compliant)
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 mx-auto sm:mx-0">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Recovery Request Processed
        </h1>

        <p className="text-sm text-text-secondary mt-2.5 leading-relaxed">
          If an active account matches that email, single-use recovery
          instructions have been dispatched (valid for 15 minutes).
        </p>

        <div className="mt-6 pt-5 border-t border-border space-y-4">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sign In</span>
          </Link>

          <p className="text-xs text-text-muted text-center sm:text-left">
            Didn&apos;t receive instructions?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setError(null);
              }}
              className="text-orange hover:underline font-medium"
            >
              Try another email address
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Form State: Request Password Reset
  // ==========================================
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back to sign in link */}
      <div className="mb-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Reset Staff Password
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Enter your ReadEssay email address to request a single-use
          recovery link.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="recovery-email"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Email Address
          </label>
          <input
            id="recovery-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@readessay.com"
            className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Recovery Instructions...</span>
            </>
          ) : (
            <span>Send Recovery Link</span>
          )}
        </button>
      </form>
    </div>
  );
}

