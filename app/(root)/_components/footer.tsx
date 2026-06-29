"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071320] text-white">
      <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10">

        {/* Top */}
        <div className="grid gap-16 lg:grid-cols-[1fr_420px]">

          {/* Left */}
          <div>

            {/* Logo */}

            <Link href="/" className="inline-flex">
              <Image
                src="/images/logo-white.png"
                alt="Chelsea Portland"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>

            {/* Navigation */}

            <nav className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-[17px] text-white/75 transition hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[#C59A5C] after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}

          <div className="space-y-6">

            <ContactCard
              icon={<MapPin size={20} />}
              title="Office"
              value="Chelsea Portland House
47–49 Park Royal Road
London NW10 7LG
United Kingdom"
            />

            <ContactCard
              icon={<Mail size={20} />}
              title="Email"
              value="partnerships@chelsea-portland.com"
            />

          </div>

        </div>

        {/* Divider */}

        <div className="my-16 h-px bg-white/10" />

        {/* Bottom */}

        <div className="flex flex-col gap-8 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between">

          <p>
            © {new Date().getFullYear()} Chelsea Portland House.
            All rights reserved.
          </p>

          <div className="flex gap-10">

            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function ContactCard({
  icon,
  title,
  value,
}: ContactCardProps) {
  return (
    <div className="group flex gap-5">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C59A5C] text-white transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>

      <div>

        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
          {title}
        </p>

        <p className="mt-2 whitespace-pre-line leading-7 text-white/80">
          {value}
        </p>

      </div>

    </div>
  );
}