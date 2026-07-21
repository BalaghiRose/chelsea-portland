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
import Image from "next/image";

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
  
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-background xl:flex">
      <div className="border-b border-border px-7 py-8">
        <Image
          src="/assets/logos/chelsea_portland_logo_152x56px_dark.svg"
          alt="Chelsea Portland"
          width={152}
          height={40}
        />

        <p className="mt-1 text-sm text-muted-foreground">
          Content Management System
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 p-5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isRootDashboard = item.href === "/dashboard";
          const active = isRootDashboard
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 border-l-2 px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "border-primary bg-muted text-foreground"
                  : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}