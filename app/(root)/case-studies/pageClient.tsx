"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CaseStudyShowcaseCard from "../utils/components/CaseStudyShowcaseCard";
import type { CaseStudy } from "../utils/types";

export default function CaseStudiesPageClient() {
  const caseStudies = (useQuery(api.caseStudies.getCaseStudies) ?? []) as CaseStudy[];
  const settings = useQuery(api.caseStudies.getCaseStudiesSectionSettings);

  const spotlight = caseStudies[0];
  const secondaryStudies = caseStudies.slice(1);

  return (
    <main className="bg-[#f5f5f5]">
      <section className="relative overflow-hidden bg-[#08131d] pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(175,0,64,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(79,130,189,0.2),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.03)_0%,_transparent_100%)]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:px-10">
          <div className="max-w-[760px]">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/60">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span className="text-white/35">/</span>
              <span className="text-white">Case Studies</span>
            </nav>

            <p className="section-label mx-auto text-secondary lg:mx-0">{settings?.title ?? "Case Studies"}</p>

            <h1 className="font-heading mt-8 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl xl:text-[5.8rem]">
              Work that feels considered, clear, and commercially useful.
            </h1>

            <p className="mt-7 max-w-[62ch] text-base leading-8 text-white/72 sm:text-lg">
              A curated selection of international mandates spanning market entry,
              property support, adviser coordination, and commercial representation.
              Each one is shaped around practical UK-side execution and a calm,
              high-touch client experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#featured"
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-xs uppercase tracking-[0.22em] text-[#08131d] transition hover:bg-[#af0040] hover:text-white"
              >
                Explore Featured Work
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-xs uppercase tracking-[0.22em] text-white/88 transition hover:border-white hover:text-white"
              >
                Back To Home
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { value: caseStudies.length.toString().padStart(2, "0"), label: "Published case studies" },
              {
                value: caseStudies.filter((study) => study.featured).length.toString().padStart(2, "0"),
                label: "Featured on homepage",
              },
              { value: "100%", label: "Client-focused delivery" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
                <p className="font-heading text-4xl text-white sm:text-5xl">{stat.value}</p>
                <p className="mt-4 max-w-[14ch] text-sm leading-7 text-white/68">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {spotlight ? (
        <section id="featured" className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
            <CaseStudyShowcaseCard study={spotlight} index={0} />
          </div>
        </section>
      ) : null}

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">All Case Studies</p>
              <h2 className="font-heading mt-3 text-3xl leading-tight text-primary sm:text-4xl">
                Browse the full collection.
              </h2>
            </div>
            <p className="hidden max-w-[28ch] text-sm leading-7 text-slate-500 lg:block">
              Each case study keeps the same premium visual system but changes scale and emphasis so the page stays dynamic.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 mt-20">
            {secondaryStudies.map((study, index) => (
              <CaseStudyShowcaseCard key={study._id} study={study} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
