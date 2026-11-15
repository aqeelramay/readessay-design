"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { resetPassword, ApiError } from "@/lib/auth-api";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Password reset token is missing from the URL.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter identical passwords.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
      redirectTimerRef.current = setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message || "Invalid or expired password reset token.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to reset password. Please try again or request a new link.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Missing or Invalid Token from URL
  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 mx-auto sm:mx-0 shadow-2xs">
          <AlertCircle className="w-6 h-6" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Invalid Reset Link
        </h1>

        <p className="text-sm text-text-secondary mt-2.5 leading-relaxed">
          The password reset token is missing or malformed. Please request a new password reset link.
        </p>

        <div className="mt-6 pt-5 border-t border-border space-y-4">
          <Link
            href="/forgot-password"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 cursor-pointer"
          >
            <span>Request New Reset Link</span>
          </Link>

          <div className="text-center sm:text-left">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 mx-auto sm:mx-0 shadow-2xs">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Password Reset Successfully
        </h1>

        <p className="text-sm text-text-secondary mt-2.5 leading-relaxed">
          Your Super Admin password has been updated. Redirecting you to sign in...
        </p>

        <div className="mt-6 pt-5 border-t border-border">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 cursor-pointer"
          >
            <span>Go to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

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
          Set New Password
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Create a new strong password for your Super Admin account (minimum 8 characters).
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex flex-col gap-2 shadow-2xs"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{error}</span>
          </div>
          {error.includes("expired") || error.includes("Invalid") ? (
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-orange hover:underline ml-6"
            >
              Request a new reset link →
            </Link>
          ) : null}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password Field */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="new-password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isLoading}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-surface border border-border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-orange"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-surface border border-border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-orange"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Save New Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
