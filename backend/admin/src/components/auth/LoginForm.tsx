"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Lock,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/auth-api";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Caps Lock detection
  function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  }

  // Handle Credentials submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setErrorMessage("Please enter your username.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      await login(trimmedUsername, password);
      // On success, redirect to the dashboard root
      router.replace("/");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || "Invalid username or password");
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred during sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title & Subtitle */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
          Super Admin Sign In
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          Enter your administrative username and password to access ReadEssay Operations.
        </p>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 shadow-2xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="font-medium leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Main Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Username
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-text-primary"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-orange hover:text-orange-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyEvent}
              onKeyUp={handleKeyEvent}
              placeholder="••••••••••••"
              className="w-full bg-surface border border-border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-orange"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Caps Lock Warning Hint */}
          {capsLockOn && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-amber-600">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Caps Lock is on</span>
            </div>
          )}
        </div>

        {/* Primary Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Sign in to Dashboard</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
