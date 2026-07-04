import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CaseStudy } from "../types";
import { getCaseStudyHref } from "./caseStudies";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: Props) {
  const imageSrc = study.thumbnailUrl ?? "/assets/images/casestudies1.jpg";

  return (
    <article className="group mx-auto min-w-full overflow-hidden bg-white shadow-sm">

      <div className="relative aspect-[16/9] overflow-hidden">

        <Image
          src={imageSrc}
          alt={study.altText || study.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

      </div>

      <div className="flex flex-col gap-5 bg-[#071320] px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-6">

        <div className="space-y-3 sm:max-w-[65%]">
        <h3 className="text-base leading-7 text-white lg:text-lg">
          {study.title}
        </h3>

        </div>

        <Link
          href={getCaseStudyHref(study.slug)}
          className="flex max-sm:w-full justify-center w-fit shrink-0 items-center gap-3 border border-white/30 px-6 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
        >
          Read More
          <ChevronRight size={16} />
        </Link>

      </div>

    </article>
  );
}