import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "../types";
import { getCaseStudyHref } from "./caseStudies";

interface CaseStudyShowcaseCardProps {
  study: CaseStudy;
  index: number;
}

export default function CaseStudyShowcaseCard({
  study,
  index,
}: CaseStudyShowcaseCardProps) {
  const imageSrc = study.thumbnailUrl ?? "/assets/images/casestudies1.jpg";

  return (
    <article className="group relative py-16 lg:py-28">
      {/* Background Number */}
      <div className="pointer-events-none absolute left-0 top-0 hidden select-none lg:block">
        <span className="font-heading text-[180px] font-bold leading-none tracking-[-0.08em] text-slate-100 transition-all duration-700 group-hover:text-slate-200">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* Hero Image */}
        <div className="relative h-[420px] overflow-hidden rounded-[40px] lg:h-[680px]">
          <Image
            src={imageSrc}
            alt={study.altText || study.title}
            fill
            priority={index === 0}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071320]/75 via-[#071320]/30 to-transparent" />
        </div>

        {/* Floating Content */}
        <div className="relative -mt-28 px-6 lg:absolute lg:bottom-16 lg:left-16 lg:mt-0 lg:max-w-[560px]">
          <div className="rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-[0_40px_90px_-30px_rgba(0,16,30,.25)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 lg:p-10">
            {/* Title */}
            <h2 className="font-heading text-4xl leading-[1.05] text-primary lg:text-5xl">
              {study.title}
            </h2>

            {/* Summary */}
            <p className="mt-6 text-[17px] leading-8 text-slate-600">
              {study.paras.split("\n").find((line) => line.trim())?.trim() ?? ""}
            </p>

            {/* CTA */}
            <Link
              href={getCaseStudyHref(study.slug)}
              className="group/link mt-10 flex items-center justify-between border-t border-slate-200 pt-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Explore Project
                </p>

                <p className="mt-2 text-lg font-medium text-primary">
                  View Case Study
                </p>
              </div>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover/link:rotate-45">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}