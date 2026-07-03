import { ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";

interface SectionLayoutProps {
  id?: string;
  sectionLabel: string;
  title?: string;
  children: ReactNode;
  background?: "white" | "primary";
  className?: string;
  sectionLabelClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  logo?: boolean;
}

export default function SectionLayout({
  id,
  sectionLabel,
  title,
  children,
  background = "white",
  className = "",
  sectionLabelClassName = "",
  titleClassName = "",
  contentClassName = "",
  logo = false,
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 sm:py-16 lg:py-20 xl:py-24",
        background === "primary"
          ? "bg-primary text-white"
          : " text-primary",
      )}
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12">
          <div className="lg:pt-8 lg:col-span-4 lg:col-start-1">
            {logo && (
              <div className="mb-8">
                <Image
                  src="/assets/logos/chelsea_portland_logo_152x56px.svg"
                  alt="Chelsea Portland House"
                  width={180}
                  height={56}
                />
              </div>
            )}
            <p
              className={clsx(
                "text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em]",
                background === "primary" ? "text-white" : "text-primary",
                sectionLabelClassName,
              )}
            >
              {sectionLabel}
            </p>
          </div>

          {/* Right */}

          <div className="lg:col-span-8 lg:col-start-6">
            <h2
              className={clsx(
                "font-heading section_about-heading",
                background === "primary" ? "text-white" : "text-slate-900",
                titleClassName,
              )}
            >
              {title}
            </h2>

            <div
              className={clsx(
                " sm:mt-8 space-y-6 sm:space-y-7 text-base sm:text-lg leading-8 sm:leading-9",
                background === "primary" ? "text-white" : "text-slate-600",
                contentClassName,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
