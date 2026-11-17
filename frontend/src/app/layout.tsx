import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReadEssay - #1 Academic Support Platform",
  description:
    "ReadEssay provides premier academic research assistance, proofreading, essay guidance, and expert support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-canvas text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
