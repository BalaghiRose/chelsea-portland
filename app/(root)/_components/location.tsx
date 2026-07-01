import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

interface LocationSectionProps {
  image: string;
}

export default function LocationSection({ image }: LocationSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#071320]">
      <div className="grid min-h-[620px] lg:min-h-[720px] lg:grid-cols-[38%_62%]">
        {/* LEFT */}

        <div className="flex flex-col justify-between px-4 py-12 sm:px-6 sm:py-14 lg:px-0 lg:py-0">
          <div className="mx-auto w-full max-w-[520px] px-0 lg:px-14 lg:pt-20">
            <h3 className="section-label text-secondary text-lg uppercase">
              London, United Kingdom
            </h3>

            <p className="mt-10 text-2xl leading-9 text-white/75">
              Located in west London and serving client with interests
              throughout the kingdom.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[520px] pb-4 lg:px-14 lg:pb-20">
            <Link
              href="#"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 border border-white/20 px-5 sm:px-7 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-[0.14em] sm:tracking-[0.22em] text-white transition hover:border-[#C59A5C] hover:bg-white hover:text-primary"
            >
              <MapPin size={18} />
              View on Google Maps
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]">
          <Image
            src={image}
            alt="Office Location"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#071320]/20" />
        </div>
      </div>
    </section>
  );
}
