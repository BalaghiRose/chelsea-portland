import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "../types";
import { getCaseStudyHref } from "./caseStudies";

interface CaseStudyShowcaseCardProps {
  study: CaseStudy;
  index: number;
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";

  const cleanText = text.replace(/\s+/g, " ").trim();

  return cleanText.length > maxLength
    ? `${cleanText.slice(0, maxLength).trim()}...`
    : cleanText;
};

export default function CaseStudyShowcaseCard({
  study,
  index,
}: CaseStudyShowcaseCardProps) {
  const imageSrc = study.thumbnailUrl ?? "/assets/images/casestudies1.jpg";

  const description = truncateText(
    study.paras
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? "",
    200,
  );

  return (
    <article className="group relative py-12 lg:py-20">
      {/* Background Number */}
      <div className="pointer-events-none absolute left-0 top-0 hidden select-none lg:block">
        <span className="font-heading text-[160px] font-bold leading-none tracking-[-0.08em] text-slate-100 transition-colors duration-500 group-hover:text-slate-200">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        {/* Hero Image */}
        <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[420px] lg:h-[620px]">
          <Image
            src={imageSrc}
            alt={study.altText || study.title}
            fill
            priority={index === 0}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071320]/75 via-[#071320]/35 to-transparent" />
        </div>

        {/* Floating Content */}
        <div className="relative -mt-20 px-4 sm:px-6 lg:absolute lg:bottom-12 lg:left-12 lg:mt-0 lg:max-w-[560px] lg:px-0">
          <div className="rounded-3xl border border-white/10 bg-white/95 p-6 shadow-[0_30px_80px_-20px_rgba(0,16,30,.25)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 sm:p-8 lg:p-10">
            {/* Title */}
            <h3 className="font-heading text-2xl leading-tight text-primary line-clamp-2 min-h-[3.8rem] sm:text-3xl">
              {study.title}
            </h3>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-slate-600 line-clamp-3 min-h-[5.25rem]">
              {description}
            </p>

            {/* CTA */}
            <Link
              href={getCaseStudyHref(study.slug)}
              className="group/link mt-8 flex items-center justify-between border-t border-slate-200 pt-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Explore Project
                </p>

                <p className="mt-2 text-lg font-medium text-primary">
                  View Case Study
                </p>
              </div>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover/link:rotate-45 group-hover/link:scale-110">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
