import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devnex Dashboard — Zayafkalar",
  robots: "noindex,nofollow",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
