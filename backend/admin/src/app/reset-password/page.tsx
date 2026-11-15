import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password — ReadEssay Admin",
  description: "Choose a new password for your ReadEssay Super Admin account",
};

function ResetPasswordFallback() {
  return (
    <div className="w-full max-w-md mx-auto py-12 flex flex-col items-center justify-center gap-3 text-text-secondary">
      <Loader2 className="w-6 h-6 animate-spin text-orange" />
      <span className="text-xs font-medium">Loading reset gateway...</span>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthSplitShell>
      <Suspense fallback={<ResetPasswordFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitShell>
  );
}
