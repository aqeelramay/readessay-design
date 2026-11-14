import { type ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";

interface AuthSplitShellProps {
  children: ReactNode;
}

export function AuthSplitShell({ children }: AuthSplitShellProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8 antialiased">
      {/* Centered elevated card */}
      <div className="w-full max-w-[520px] bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <main className="p-8 sm:p-10 flex flex-col justify-center bg-surface">
          {/* Brand Header */}
          <div className="mb-6 pb-5 border-b border-border flex justify-center">
            <BrandLogo surface="light" size="md" />
          </div>

          {/* Form Content */}
          {children}

        </main>
      </div>
    </div>
  );
}
