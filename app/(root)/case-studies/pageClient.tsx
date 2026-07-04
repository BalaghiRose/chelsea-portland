"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CaseStudyShowcaseCard from "../utils/components/CaseStudyShowcaseCard";
import type { CaseStudy } from "../utils/types";

export default function CaseStudiesPageClient() {
  const caseStudies = (useQuery(api.caseStudies.getCaseStudies) ??
    []) as CaseStudy[];

  const settings = useQuery(api.caseStudies.getCaseStudiesSectionSettings);

  const featuredStudy = caseStudies[0];
  const remainingStudies = caseStudies.slice(1);

  return (
    <main className="min-h-screen bg-[#00101e] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Case Studies</span>
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            {settings?.title ?? "Case Studies"}
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-regular leading-tight sm:text-5xl lg:text-6xl">
            Real projects with measurable business impact.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Browse our portfolio of successful engagements across property,
            investment, relocation, education and commercial consultancy.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#featured"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              View Featured
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-white transition hover:border-white hover:bg-white/5"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredStudy && (
        <section
          id="featured"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-semibold">Featured Case Study</h2>

            <p className="mt-2 text-white/60">
              A highlighted project demonstrating our approach and outcomes.
            </p>
          </div>

          <CaseStudyShowcaseCard study={featuredStudy} index={0} />
        </section>
      )}

      {/* All Case Studies */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold">All Case Studies</h2>

          <p className="mt-2 text-white/60">
            Explore the complete collection of our work.
          </p>
        </div>

        {remainingStudies.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {remainingStudies.map((study, index) => (
              <CaseStudyShowcaseCard
                key={study._id}
                study={study}
                index={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/60">
            No case studies available.
          </div>
        )}
      </section>
    </main>
  );
}
