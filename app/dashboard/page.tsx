import {
  BriefcaseBusiness,
  FolderKanban,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "./components/dashboard/layout/pageHeader";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Services",
    description:
      "Manage all website services including descriptions and thumbnails.",
    href: "/dashboard/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Case Studies",
    description:
      "Create and maintain project case studies showcased on the website.",
    href: "/dashboard/case-studies",
    icon: FolderKanban,
  },
   {
    title: "Website Content",
    description:
      "Create and maintain project case studies showcased on the website.",
    href: "/dashboard/content",
    icon: FolderKanban,
  },
  
];

export default function DashboardPage() {
  return (
    <>
      {/* <PageHeader
        title="Dashboard"
        description="Welcome to the Chelsea Portland content management system."
      /> */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link
              key={module.title}
              href={module.href}
              className="group flex h-full flex-col border border-border bg-card p-7 transition-all duration-200 hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex h-14 w-14 items-center justify-center border border-border bg-background text-primary">
                <Icon size={28} />
              </div>

              <h2 className="mt-6 text-2xl font-lighter text-primary">
                {module.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {module.description}
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-8 border-border"
              >
                Manage
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Button>
            </Link>
          );
        })}
      </section>
    </>
  );
}