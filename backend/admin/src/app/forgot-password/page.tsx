import type { Metadata } from "next";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — ReadEssay Admin",
  description: "Request single-use password recovery instructions for Super Admin",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplitShell>
      <ForgotPasswordForm />
    </AuthSplitShell>
  );
}

