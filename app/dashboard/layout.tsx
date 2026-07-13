import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/admin-auth";
import DashboardShell from "./components/dashboard/layout/dashboardShell";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await requireAdmin();

  return <DashboardShell>{children}</DashboardShell>;
}