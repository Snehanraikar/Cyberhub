import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberHub — AI-Powered Cybersecurity Learning Platform",
  description: "Complete cybersecurity learning platform with attack visualization, CVE intelligence, frameworks, cheatsheets, and AI assistance.",
  keywords: ["cybersecurity", "learning", "CTF", "OWASP", "CVE", "penetration testing", "security"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
