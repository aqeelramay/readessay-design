import type { Metadata } from "next";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — ReadEssay Admin",
  description: "Staff credentials and two-factor gateway for ReadEssay Operations",
};

export default function LoginPage() {
  return (
    <AuthSplitShell>
      <LoginForm />
    </AuthSplitShell>
  );
}

