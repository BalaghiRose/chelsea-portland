"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
  const dynamicServices = useQuery(api.services.getServices);
  const sectionSettings = useQuery(api.services.getServicesSectionSettings);

  const serviceItems =
    dynamicServices && dynamicServices.length > 0
      ? dynamicServices.map((service) => ({
          id: service._id,
          icon: service.iconUrl ?? "/icons/business.svg",
          title: service.title,
          description: service.description.join(" "),
          image: service.thumbnailUrl ?? "/assets/images/services_image-1.jpg",
          button: "Arrange an Introduction Call",
          altText: service.altText,
        }))
      : services.map((service) => ({
          ...service,
          altText: service.title,
        }));

        
  return (
    <section id="services" className="bg-[#F4F4F4] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h2 className="text-secondary section-label section-label--center ">
            {(sectionSettings?.title ?? "Services").toUpperCase()}
          </h2>
        </div>

        {/* Slider */}

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {serviceItems.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="grid overflow-hidden bg-white lg:grid-cols-2 p-4">
                {/* Image */}

                <div className="order-1 relative min-h-[220px] sm:min-h-[320px] lg:order-2 lg:min-h-[560px] xl:min-h-[600px]">
                  <Image
                    src={service.image}
                    alt={service.altText}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Content */}

                <div className="order-2 flex flex-col justify-center p-2 sm:p-8 lg:order-1 lg:p-12 xl:p-16">
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={80}
                    height={80}
                    className=" sm:mb-6 max-sm:w-[60] "
                  />

                  <h3 className="font-heading mb-3 sm:mb-6 section-subheading text-primary font-agatho">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-5 sm:leading-6 mb-3 sm:mb-6 font-light text-primary line-clamp-3 sm:line-clamp-none">
                    {service.description}
                  </p>

                  <button
                    className="
                    inline-flex
                    w-fit
                    items-center
                    gap-8
                    border
                    border-[var(--color-primary)]
                    text-primary
                    max-sm:px-2
                    sm:px-8
                    py-4
                    text-xs
                    sm:text-base
                    uppercase
                    tracking-[0.14em]
                    sm:tracking-wide
                    transition
                    hover:border-[var(--color-primary)]
                    hover:bg-[var(--color-primary)]
                    hover:!text-white
                    [&_svg]:text-current
                    hover:[&_svg]:!text-white
                  "
                  >
                    {service.button}

                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}

        <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-5">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              flex
              h-12
              w-12
              sm:h-16
              sm:w-16
              items-center
              justify-center
              border
              border-[var(--color-primary)]
              text-primary
              transition
              hover:border-[var(--color-primary)]
              hover:bg-[var(--color-primary)]
              hover:!text-white
              [&_svg]:text-current
              hover:[&_svg]:!text-white
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="
              flex
              h-12
              w-12
              sm:h-16
              sm:w-16
              items-center
              justify-center
              border
              border-[var(--color-primary)]
              text-primary
              transition
              hover:border-[var(--color-primary)]
              hover:bg-[var(--color-primary)]
              hover:!text-white
              [&_svg]:text-current
              hover:[&_svg]:!text-white
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
