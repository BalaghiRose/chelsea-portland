import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

interface LocationSectionProps {
  image: string;
}

export default function LocationSection({ image }: LocationSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#071320]">
      <div className="grid min-h-[720px] lg:grid-cols-[38%_62%]">
        {/* LEFT */}

        <div className="flex flex-col items-center justify-between">
          <div className="mx-auto w-full max-w-[520px] px-8 py-20 lg:px-14">
            <h3 className="section-label text-secondary text-lg uppercase">
              London, United Kingdom
            </h3>

            <p className="mt-10 text-2xl leading-9 text-white/75">
              Located in west London and serving client with interests
              throughout the kingdom.
            </p>
          </div>
          <div>
            <Link
              href="#"
              className="group  inline-flex items-center gap-4 border border-white/20 px-7 py-5 text-base uppercase tracking-[0.22em] text-white transition hover:border-[#C59A5C] hover:bg-white hover:text-primary"
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

        <div className="relative min-h-[500px]">
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
