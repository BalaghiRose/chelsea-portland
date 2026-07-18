"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import "swiper/css";
import "swiper/css/pagination";

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
  const [activeIndex, setActiveIndex] = useState(0);

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

  const total = serviceItems.length;
  const showControls = total > 1;

  return (
    <section
      id="services"
      className="bg-[#F4F4F4] py-8 sm:py-16 lg:py-24 xl:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mb-6 flex flex-col items-center gap-2 text-center sm:mb-10">
          <h2 className="text-secondary section-label section-label--center">
            {(sectionSettings?.title ?? "Services").toUpperCase()}
          </h2>
        </div>

        {/* Slider with side arrows — the wrapper reserves side gutters so the cards shrink
            to make room for the buttons, instead of the buttons overlapping the cards */}
        <div className="relative px-12 sm:px-14 lg:px-20">
          {/* Left arrow — sits in the left gutter, vertically centered, with a gap to the card */}
          {showControls && (
            <button
              aria-label="Previous service"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--color-primary)] bg-white text-primary shadow-sm transition hover:bg-[var(--color-primary)] hover:!text-white sm:h-11 sm:w-11 lg:h-14 lg:w-14 [&_svg]:text-current hover:[&_svg]:!text-white"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right arrow — sits in the right gutter, vertically centered, with a gap to the card */}
          {showControls && (
            <button
              aria-label="Next service"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--color-primary)] bg-white text-primary shadow-sm transition hover:bg-[var(--color-primary)] hover:!text-white sm:h-11 sm:w-11 lg:h-14 lg:w-14 [&_svg]:text-current hover:[&_svg]:!text-white"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1.08}
            spaceBetween={16}
            grabCursor
            loop={total > 3}
            autoplay={
              showControls
                ? {
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            breakpoints={{
              640: { slidesPerView: 1.15, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            pagination={
              showControls
                ? { el: ".services-pagination", clickable: true }
                : false
            }
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {serviceItems.map((service) => (
              <SwiperSlide key={service.id} className="h-auto">
                <div className="flex h-full flex-col overflow-hidden bg-white">
                  {/* Image on top */}
                  <div className="relative h-48 w-full sm:h-56 lg:h-52 xl:h-56">
                    <Image
                      src={service.image}
                      alt={service.altText}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Content below */}
                  <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-6 xl:p-4">
                    <h3 className="font-heading mb-1.5 section_service-subheading text-primary font-agatho">
                      {service.title}
                    </h3>

                    <p className="mb-0 text-sm font-light leading-5 text-primary line-clamp-3 sm:text-base sm:leading-6 sm:line-clamp-4">
                      {service.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {showControls && (
          <div className="mt-5 flex w-full justify-center sm:mt-8">
            <div className="services-pagination mx-auto flex w-fit items-center justify-center gap-2 [&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!cursor-pointer [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!bg-[var(--color-primary)]/25 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-[var(--color-primary)]" />
          </div>
        )}
      </div>
    </section>
  );
}