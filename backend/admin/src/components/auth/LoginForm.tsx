"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  // Navigation / Step state
  const [step, setStep] = useState<"credentials" | "two-factor">("credentials");

  // Step 1: Credentials fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [require2fa, setRequire2fa] = useState(true);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Step 2: 2FA OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cleanup timeout on unmount
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle Caps Lock detection
  function handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  }

  // Handle Credentials submission
  function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCredentialsError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Generic credential validation: never reveal if user exists or doesn't
    if (
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedEmail.includes("@") ||
      !trimmedEmail.includes(".")
    ) {
      setCredentialsError("Please enter a valid work email and password.");
      return;
    }

    setIsLoading(true);

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      if (require2fa) {
        setStep("two-factor");
      } else {
        router.push("/");
      }
    }, 450);
  }

  // OTP Handlers
  function handleOtpChange(index: number, value: string) {
    setOtpError(null);
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance if digit entered
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    setOtpError(null);
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    // Focus last filled box
    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  }

  function handleUseDemoOtp() {
    setOtp(["4", "8", "2", "9", "1", "0"]);
    setOtpError(null);
    otpRefs.current[5]?.focus();
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError(null);

    const fullCode = otp.join("");
    if (fullCode.length < 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsVerifying(true);
    timerRef.current = setTimeout(() => {
      setIsVerifying(false);
      router.push("/");
    }, 500);
  }

  // ==========================================
  // Render Step 2: Two-Factor Verification
  // ==========================================
  if (step === "two-factor") {
    return (
      <div className="w-full max-w-md mx-auto">
        {/* Step Badge & Header */}
        <div className="text-center sm:text-left mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange/10 text-orange border border-orange/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Two-Factor Authentication</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Two-Factor Verification
          </h1>
          <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
            Enter the 6-digit authentication code from your authenticator app
            for <span className="font-semibold text-text-primary">{email || "admin@readessay.com"}</span>.
          </p>
        </div>

        {/* 2FA Error Alert Banner */}
        {otpError && (
          <div
            role="alert"
            className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{otpError}</span>
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpRefs.current[idx] = el;
                }}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                autoComplete={idx === 0 ? "one-time-code" : "off"}
                aria-label={`Digit ${idx + 1}`}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                onPaste={handleOtpPaste}
                className="w-11 h-12 sm:w-12 sm:h-13 text-center font-mono font-bold text-xl text-text-primary bg-surface border border-border rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
              />
            ))}
          </div>

          {/* Primary Verify Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Security Code...</span>
              </>
            ) : (
              <>
                <span>Verify &amp; Enter Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* 2FA Actions & Demo Helper */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setOtpError(null);
                setStep("credentials");
              }}
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              ← Back to credentials
            </button>
            <button
              type="button"
              onClick={handleUseDemoOtp}
              className="text-orange hover:text-orange-hover transition-colors font-medium"
            >
              Use demo code 482910
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ==========================================
  // Render Step 1: Credentials Form
  // ==========================================
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-text-primary text-center tracking-tight">
          Sign in
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Enter your staff credentials to access the administrative workspace.
        </p>
      </div>

      {/* Generic Error Alert Banner */}
      {credentialsError && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{credentialsError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        {/* Work Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Work Email
          </label>
          <input
            id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyEvent}
              onKeyUp={handleKeyEvent}
              placeholder="••••••••••••"
              className="w-full bg-surface border border-border rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
            <button
              type="button"
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

        {/* Options Row: Remember Me & 2FA Preview Toggle */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-border text-orange focus:ring-orange/30 accent-orange"
            />
            <span className="text-xs text-text-secondary">
              Keep me signed in for 7 days
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={require2fa}
              onChange={(e) => setRequire2fa(e.target.checked)}
              className="w-4 h-4 rounded border-border text-orange focus:ring-orange/30 accent-orange"
            />
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <span>Require 2FA step</span>
              <span className="text-[10px] font-semibold text-orange bg-orange/10 px-1.5 py-0.2 rounded border border-orange/20">
                Preview
              </span>
            </span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Signin</span>
            )}
          </button>
        </div>
      </form>


    </div>
  );
}

