import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { normalizeSectionContent } from "./cms-section-content";

interface LocationSectionProps {
  content?: unknown;
}

const DEFAULT_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.188596908148!2d-0.2674554!3d51.528100599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487611841acf0d3f%3A0xe3783e4c6636329!2sPremier%20Business%20Centre!5e0!3m2!1sen!2s!4v1784615519578!5m2!1sen!2s";

const DEFAULT_MAP_LINK =
  "https://www.google.com/maps/place/Premier+Business+Centre/@51.5270563,-0.2693782,17z/data=!4m5!3m4!1s0x487611841acf0d3f:0xe3783e4c6636329!8m2!3d51.528100599999995!4d-0.2674554";

export default function LocationSection({ content }: LocationSectionProps) {
  const cmsContent = normalizeSectionContent("location", content);
  const mapEmbedSrc = cmsContent.mapEmbedSrc?.trim() || DEFAULT_MAP_EMBED_SRC;
  const mapLink = cmsContent.mapLink?.trim() || DEFAULT_MAP_LINK;

  return (
    <section className="relative overflow-hidden bg-[#071320]">
      <div className="grid min-h-[620px] lg:min-h-[720px] lg:grid-cols-[38%_62%]">
        <div className="flex flex-col justify-between px-4 py-8 sm:px-6 sm:py-14 lg:px-0 lg:py-0">
          <div className="mx-auto w-full max-w-[520px] px-0 lg:px-14 lg:pt-20">
            <h2 className="section-label text-secondary text-lg uppercase">
              {cmsContent.sectionLabel ?? "London, United Kingdom"}
            </h2>

            {cmsContent.paragraphs.map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className="mt-3 mb-3 max-sm:paragraph sm:text-2xl font-light sm:leading-9 text-white"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mx-auto w-full max-w-[520px] pb-4 lg:px-14 lg:pb-20">
            <Link
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 border border-white/20 px-5 sm:px-7 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-[0.14em] sm:tracking-[0.22em] text-white transition hover:border-[#FFFFFF] hover:bg-white hover:text-primary"
            >
              <MapPin size={18} />
              {cmsContent.ctaLabel ?? "View on Google Maps"}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]">
          <iframe
            src={mapEmbedSrc}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Chelsea Portland Office Location"
          />
        </div>
      </div>
    </section>
  );
}