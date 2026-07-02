"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { ChevronLeft } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { CaseStudy } from "../../utils/types";
import CaseStudyCard from "../../utils/components/CaseStudyCard";

export default function CaseStudyDetailClient() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const study = useQuery(api.caseStudies.getCaseStudyBySlug, {
    slug,
  }) as CaseStudy | null | undefined;

  const allCaseStudies = useQuery(api.caseStudies.getCaseStudies);

  if (study === undefined) return null;

  if (!study) {
    return (
      <main className="bg-[#F4F4F4] px-6 py-24 text-center lg:px-10">
        <h1 className="font-heading text-4xl text-primary">
          Case Study Not Found
        </h1>
        <p className="mt-4 text-slate-600">
          The selected case study does not exist or may have been removed.
        </p>
        <Link
          href="/case-studies"
          className="mt-8 inline-flex items-center justify-center border border-primary px-6 py-3 text-sm uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white"
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

  const related = ((allCaseStudies ?? []) as CaseStudy[])
    .filter((s) => s._id !== study._id)
    .slice(0, 4);

  return (
    <main className="bg-[#F4F4F4] text-[#0B1728]">
      {/* Full-width hero image */}
      <div className="relative w-full h-[100vh] aspect-[16/7] overflow-hidden">
        <Image
          src={heroImage}
          alt={study.altText || study.title}
          fill
          priority
          className="object-cover"
        />

        {/* Back bar overlay */}
        <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent px-6 pb-10 pt-6 lg:px-10 ">
          <Link
            href="/"
            className="inline-flex items-start gap-3 text-white/90 transition hover:text-white"
          >
            <ChevronLeft
              size={28}
              strokeWidth={1.5}
              className="mt-1 shrink-0"
            />
            <div className="w-full sm:w-1/2">
              <span className="font-heading text-lg leading-tight tracking-tight font-light sm:text-xl lg:text-2xl">
                {study.title}
              </span>
              <span className="mt-2 block h-[2px] w-[60px] bg-white" />
            </div>
          </Link>
        </div>
      </div>

      {/* Details: title left, content right */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2">
            {/* Left: label + title */}
            <div className="lg:pt-2">
              <h1 className="font-heading section-subheading text-primary">
                {study.title}
              </h1>
              <span className="mt-4 block h-[2px] w-[60px] bg-[#af0040]" />
            </div>

            {/* Right: paragraphs */}
            <div className=" space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="paragraph text-slate-600">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="4">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 text-center">
              <p className="section-label section-label--center text-secondary">
                Related Case Studies
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {related.map((s) => (
                <CaseStudyCard key={s._id} study={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
