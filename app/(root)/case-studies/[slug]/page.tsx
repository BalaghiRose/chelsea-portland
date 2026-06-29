import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  caseStudies,
  getCaseStudyBySlug,
} from "../../utils/components/caseStudies";

interface CaseStudyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) return { title: "Case Study Not Found" };

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <main className="bg-[#F0EFE9] text-[#0B1728]">
      {/* ── Hero ── */}
      <div className="relative h-[420px] overflow-hidden bg-[#0B1728] lg:h-[520px]">
        {/* Background image */}
        <Image
          src={study.image}
          alt={study.title}
          fill
          priority
          className="object-cover opacity-40"
        />

        {/* Architectural grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(191,160,106,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(191,160,106,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Breadcrumb */}
        <nav className="absolute left-6 top-5 flex items-center gap-2 text-[11px] tracking-wide text-white/40 lg:left-10">
          <Link href="/" className="transition-colors hover:text-[#BFA06A]">
            Home
          </Link>
          <span className="text-white/20">/</span>
          <Link
            href="/case-studies"
            className="transition-colors hover:text-[#BFA06A]"
          >
            Case Studies
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/30">Details</span>
        </nav>

        {/* Title block — pinned to bottom of hero */}
        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-24 lg:px-10"
          style={{
            background:
              "linear-gradient(transparent, rgba(11,23,40,0.92) 55%)",
          }}
        >
          {/* Eyebrow */}
          <div className="mb-3 flex items-center gap-3">
            <span className="block h-px w-7 bg-[#BFA06A]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#BFA06A]">
              Case Study
            </span>
          </div>

          <h1 className="max-w-3xl text-2xl font-medium leading-snug tracking-tight text-[#F0EFE9] sm:text-3xl lg:text-4xl">
            {study.title}
          </h1>
        </div>
      </div>

      {/* ── Meta strip ── */}
      <div
        className="grid border-b border-[#BFA06A]/20 bg-[#0B1728]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        }}
      >
        {[
          { label: "Client", value: study.client },
          { label: "Location", value: study.location },
          { label: "Duration", value: study.duration },
          { label: "Sector", value: study.sector },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className={`px-6 py-5 lg:px-8 ${i < arr.length - 1 ? "border-r border-white/[0.06]" : ""}`}
          >
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#BFA06A]/70">
              {item.label}
            </p>
            <p className="text-sm leading-snug text-[#F0EFE9]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-10 lg:py-16">
        {/* Content */}
        <div>
          {/* Summary callout */}
          <div className="mb-10 rounded-xl border border-[#0B1728]/[0.08] bg-[#F8F7F3] px-6 py-5">
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#6B7A8D]">
              Project Overview
            </p>
            <p className="text-sm leading-[1.8] text-[#3D4B5C]">
              {study.summary}
            </p>
          </div>

          {/* Sections */}
          <div className="grid gap-10">
            {study.sections.map((section) => (
              <section key={section.title}>
                {/* Brass rule + title */}
                <div className="mb-1 h-0.5 w-8 bg-[#BFA06A]" />
                <h2 className="mb-4 border-b border-[#0B1728]/10 pb-3 text-xl font-medium text-[#0B1728]">
                  {section.title}
                </h2>

                <div className="grid gap-4">
                  {section.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="text-sm leading-[1.85] text-[#3D4B5C]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="h-fit lg:sticky lg:top-8">
          <div className="rounded-xl bg-[#0B1728] p-6">
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#BFA06A]/70">
              Sector
            </p>
            <p className="mb-5 border-b border-white/[0.06] pb-5 text-sm leading-snug text-[#F0EFE9]">
              {study.sector}
            </p>

            <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[#BFA06A]/70">
              Services Delivered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {study.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/[0.14] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-white/60"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Results ── */}
      <section className="bg-[#0B1728] px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          {/* Eyebrow with rule */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#BFA06A]">
              Key Results
            </span>
            <span className="block h-px flex-1 bg-[#BFA06A]/20" />
          </div>

          {/* Result cards */}
          <div
            className="grid gap-px bg-white/[0.05]"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {study.results.map((result) => (
              <div
                key={result}
                className="border border-white/[0.05] bg-[#0B1728]/90 px-7 py-8"
              >
                <p className="text-sm leading-[1.75] text-white/65">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}