"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CaseStudyCard from "../utils/components/CaseStudyCard";
import type { CaseStudy } from "../utils/types";

export default function CaseStudies() {
  const caseStudies = useQuery(api.caseStudies.getCaseStudies);
  const settings = useQuery(api.caseStudies.getCaseStudiesSectionSettings);

  const featuredCaseStudies = ((caseStudies ?? []) as CaseStudy[])
    .filter((study) => study.featured)
    .slice(0, 4);

  return (
    <section id="case-studies" className="bg-[#F4F4F4] ">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        {/* Heading */}

        <div className="mb-16 text-center">
          <h2 className="section-label section-label--center text-secondary mx-auto uppercase">
            {settings?.title ?? "Case Studies"}
          </h2>
        </div>

        {/* Grid */}

        <div className="mx-auto grid gap-6 lg:grid-cols-2">
          {featuredCaseStudies.map((study) => (
            <CaseStudyCard key={study._id} study={study} />
          ))}
        </div>

        {/* Button */}

        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href="/case-studies"
            className="
            inline-flex
            items-center
            gap-4
            border
            border-[#00101E]
            px-6
            sm:px-8
            py-3.5
            sm:py-4
            text-sm
            text-[#00101E]
            uppercase
            tracking-[0.14em]
            sm:tracking-wider
            transition
            hover:bg-[#00101E]
            hover:text-white
          "
          >
            View All Case Studies
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
