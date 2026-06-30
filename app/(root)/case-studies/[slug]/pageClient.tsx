"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { CaseStudy } from "../../utils/types";

export default function CaseStudyDetailClient() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const study = useQuery(api.caseStudies.getCaseStudyBySlug, {
    slug,
  }) as CaseStudy | null | undefined;

  if (study === undefined) {
    return null;
  }

  if (!study) {
    return (
      <main className="bg-[#F0EFE9] px-6 py-24 text-center lg:px-10">
        <h1 className="font-heading text-4xl text-primary">Case Study Not Found</h1>
        <p className="mt-4 text-slate-600">The selected case study does not exist or may have been removed.</p>
        <Link
          href="/case-studies"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white"
        >
          Back To Case Studies
        </Link>
      </main>
    );
  }

  const heroImage = study.thumbnailUrl ?? "/assets/images/casestudies1.jpg";
  const paragraphs = study.paras
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="bg-[#F0EFE9] text-[#0B1728]">
      <div className="relative h-[420px] overflow-hidden bg-[#0B1728] lg:h-[520px]">
        <Image
          src={heroImage}
          alt={study.altText || study.title}
          fill
          priority
          className="object-cover opacity-40"
        />

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

        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-24 lg:px-10"
          style={{
            background:
              "linear-gradient(transparent, rgba(11,23,40,0.92) 55%)",
          }}
        >
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

      <div
        className="grid border-b border-[#BFA06A]/20 bg-[#0B1728]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        }}
      >
        {[
          { label: "Slug", value: study.slug },
          { label: "Featured", value: study.featured ? "Yes" : "No" },
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

      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-10 lg:py-16">
        <div>
          <div className="mb-10 rounded-xl border border-[#0B1728]/[0.08] bg-[#F8F7F3] px-6 py-5">
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#6B7A8D]">
              Project Overview
            </p>
            <p className="text-sm leading-[1.8] text-[#3D4B5C]">
              {paragraphs[0] ?? ""}
            </p>
          </div>

          <section>
            <div className="mb-1 h-0.5 w-8 bg-[#BFA06A]" />
            <h2 className="mb-4 border-b border-[#0B1728]/10 pb-3 text-xl font-medium text-[#0B1728]">
              Details
            </h2>

            <div className="grid gap-4">
              {paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-sm leading-[1.85] text-[#3D4B5C]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl bg-[#0B1728] p-6 lg:sticky lg:top-8">
          <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#BFA06A]/70">
            Case Study
          </p>
          <p className="text-sm leading-snug text-[#F0EFE9]">{study.title}</p>
        </aside>
      </div>
    </main>
  );
}
