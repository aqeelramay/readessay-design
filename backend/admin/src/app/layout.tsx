import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ReadEssay — Admin Panel",
  description: "Administrative control center for ReadEssay Operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <Suspense fallback={null}>
          <AuthProvider>
            <AdminLayout>{children}</AdminLayout>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
