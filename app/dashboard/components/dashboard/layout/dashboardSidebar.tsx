"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  Settings,
  FileText,
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Website Content",
    href: "/dashboard/content",
    icon: FileText,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Case Studies",
    href: "/dashboard/case-studies",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-card xl:flex">
      {/* Logo */}
      <div className="border-b border-border px-7 py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          Chelsea Portland
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Content Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-5">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-6">
        <p className="text-xs text-muted-foreground">
          Chelsea Portland CMS
        </p>

        <p className="mt-1 text-xs text-muted-foreground/80">
          Version 1.0
        </p>
      </div>
    </aside>
  );
}