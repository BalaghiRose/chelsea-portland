"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const services = [
  {
    id: 1,
    icon: "/icons/business.svg",
    title: "UK Market Entry & Business Establishment",
    description:
      "We assist international businesses, investors and entrepreneurs seeking to establish, expand or strengthen their presence within the United Kingdom. Whether entering the UK market for the first time or developing an existing strategy, we provide practical support, local insight and commercial assistance to help clients navigate opportunities within the UK with confidence. Our involvement may include stakeholder engagement, introductions, coordination and practical support throughout the process.",
    image: "/assets/images/services_image-1.jpg",
    button: "Arrange an Introduction Call",
  },
  {
    id: 2,
    icon: "/icons/business.svg",
    title: "Commercial Representation",
    description:
      "Our experienced team provides strategic representation for overseas businesses looking to establish commercial relationships within the UK market.",
    image: "/assets/images/services_image-1.jpg",
    button: "Learn More",
  },
];

export default function Services() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="services"
      className="bg-[#F6F6F6] py-24 lg:py-32"
    >
      <div className="container mx-auto">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="text-secondary section-label mx-auto">
            OUR SERVICES
          </p>

        </div>

        {/* Slider */}

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>

              <div className="grid overflow-hidden bg-white lg:grid-cols-2">

                {/* Left */}

                <div className="flex flex-col justify-center p-10 lg:p-16">

                  <Image
                    src={service.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="mb-12"
                  />

                  <h2 className="font-heading mb-8 section-subheading text-primary">
                    {service.title}
                  </h2>

                  <p className="mb-10 leading-9 text-gray-600">
                    {service.description}
                  </p>

                  <button
                    className="
                    inline-flex
                    w-fit
                    items-center
                    gap-8
                    border
                    border-blue-900
                    text-primary
                    px-8
                    py-4
                    uppercase
                    tracking-wide
                    transition
                    hover:bg-blue-900
                    hover:text-white
                  "
                  >
                    {service.button}

                    <ChevronRight size={18} />
                  </button>

                </div>

                {/* Right */}

                <div className="relative min-h-[420px] lg:min-h-[680px]">

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}

        <div className="mt-16 flex justify-center gap-5">

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              border
              border-secondary
              transition
              hover:bg-secondary
              hover:text-white
            "
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              border
              border-secondary
              transition
              hover:bg-secondary
              hover:text-white
            "
          >
            <ChevronRight size={24} />
          </button>

        </div>

      </div>
    </section>
  );
}