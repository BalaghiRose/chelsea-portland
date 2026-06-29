import Link from "next/link";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  aside?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  aside,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#e9edf0] pt-32 pb-18 lg:pt-40 lg:pb-24">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,_rgba(175,0,64,0.14),_transparent_35%),radial-gradient(circle_at_top_left,_rgba(0,16,30,0.18),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
        <div className="max-w-[880px]">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-600">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-3">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-[#af0040]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-900">{item.label}</span>
                )}

                {index < breadcrumbs.length - 1 ? <span className="text-slate-400">/</span> : null}
              </span>
            ))}
          </nav>

          <p className="section-label text-secondary">{eyebrow}</p>

          <h1 className="font-heading mt-8 max-w-[12ch] text-5xl leading-[0.98] text-primary sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-8 max-w-[62ch] text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>

        {aside ? (
          <div className="flex items-end lg:justify-end">
            <div className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_70px_-45px_rgba(0,16,30,0.45)] backdrop-blur">
              {aside}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}