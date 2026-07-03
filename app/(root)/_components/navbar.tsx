"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/#about" },
  { label: "SERVICES", href: "/#services" },
  { label: "CASE STUDIES", href: "/#case-studies" },
  { label: "CONTACT", href: "/#contact" },
];

// Page-order of hash sections (top → bottom)
const SECTION_IDS = ["about", "services", "case-studies", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("/");

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY > lastY && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY = currentY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via scroll position
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }

    const detect = () => {
      const threshold = window.scrollY + window.innerHeight * 0.35;
      let current = "/";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = `/#${id}`;
      }
      setActiveHref(current);
    };

    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, [pathname]);

  const isActive = (href: string) => href === activeHref;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/20 backdrop-blur-xl shadow-sm border-b border-white/30 py-4"
            : "bg-transparent py-5 lg:py-7"
        } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          {/* Mobile & Tablet: simple flex row */}
          <div className="flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={
                  scrolled
                    ? "/assets/logos/chelsea_portland_logo_152x56px_dark.svg"
                    : "/assets/logos/chelsea_portland_logo_152x56px.svg"
                }
                alt="Chelsea Portland House"
                width={140}
                height={52}
                priority
                className="w-32 sm:w-36"
              />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`p-1 transition ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid lg:grid-cols-[220px_1fr_220px] lg:items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={
                  scrolled
                    ? "/assets/logos/chelsea_portland_logo_152x56px_dark.svg"
                    : "/assets/logos/chelsea_portland_logo_152x56px.svg"
                }
                alt="Chelsea Portland House"
                width={180}
                height={70}
                priority
              />
            </Link>

            {/* Center Navigation */}
            <div className="flex justify-center">
              <div
                className={`transition-all duration-500 ${
                  scrolled
                    ? "bg-transparent backdrop-blur-0 border-transparent"
                    : "bg-[#3569a9]/45 backdrop-blur-md border border-white/20"
                }  px-1 py-1`}
              >
                <ul className="flex items-center">
                  {navigation.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`text-[13px] font-light tracking-wide transition-all duration-300 px-5 xl:px-6 py-3 block ${
                          isActive(item.href)
                            ? scrolled
                              ? "bg-[#00101e] text-white"
                              : "bg-white text-[#00101e]"
                            : scrolled
                              ? "text-slate-800 hover:bg-black/5 hover:text-black"
                              : "text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right placeholder (keeps logo left, nav centered) */}
            <div />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#00101e]/80 backdrop-blur-2xl transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-white/80 transition hover:text-white"
          >
            <X size={30} />
          </button>
        </div>

        <nav className="flex h-[80vh] flex-col items-center justify-center gap-10">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xl font-light tracking-widest transition-all duration-300 ${
                isActive(item.href)
                  ? "text-white font-medium border-b border-white pb-0.5"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
