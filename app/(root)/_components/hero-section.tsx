import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}

      <Image
        src="/assets/images/hero_section_image.jpg" // Replace with your image
        alt="London"
        fill
        priority
        className="object-cover object-top"
      />

      {/* Blue Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#2b69b6]/45 via-[#2b69b6]/20 to-black/20" />

      {/* Hero Content */}

      <div className="relative z-10 flex h-full items-start justify-center px-6">
        <div className="mx-auto mt-56 max-w-[980px] text-center">
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
