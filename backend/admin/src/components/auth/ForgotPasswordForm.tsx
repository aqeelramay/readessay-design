"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, User } from "lucide-react";
import { forgotPassword, ApiError } from "@/lib/auth-api";

export function ForgotPasswordForm() {
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Please enter your admin username.");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(trimmedUsername);
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to process password reset. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // ==========================================
  // Confirmation State (Anti-enumeration compliant)
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 mx-auto sm:mx-0 shadow-2xs">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Recovery Request Processed
        </h1>

        <p className="text-sm text-text-secondary mt-2.5 leading-relaxed">
          If that username exists, password reset instructions have been sent to the configured recovery email (valid for 15 minutes).
        </p>

        <div className="mt-6 pt-5 border-t border-border space-y-4">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>

          <p className="text-xs text-text-muted text-center sm:text-left">
            Need to try another username?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setError(null);
              }}
              className="text-orange hover:underline font-medium cursor-pointer"
            >
              Try again
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
          Reset Super Admin Password
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Enter your admin username to send a password reset link to the configured recovery email.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 shadow-2xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="font-medium leading-relaxed">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Admin Username
          </label>
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              required
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. aqeel"
              className="w-full bg-surface border border-border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            <span>Send Reset Link</span>
          )}
        </button>
      </form>
    </div>
  );
}
