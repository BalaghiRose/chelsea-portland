import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Background Image */}

      <Image
        src="/assets/images/hero_section_image.png" // Replace with your image
        alt="London"
        fill
        priority
        className="object-cover object-top"
      />

      {/* Blue Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#2b69b6]/45 via-[#2b69b6]/20 to-black/20" />

      {/* Hero Content */}

      <div className="relative z-10 flex min-h-[100svh] items-start justify-center px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32">
        <div className="mx-auto mt-24 max-w-[980px] text-center">
          <h1
            className="
              section-heading text-white
            "
          >
            A Trusted UK Presence For
            <br />
            International Businesses And
            <br />
            Advisers.
          </h1>

          <div className="mx-auto mt-10 h-[2px] w-14 bg-white/90" />
        </div>
      </div>
    </section>
  );
}
