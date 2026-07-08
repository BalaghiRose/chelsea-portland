"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-1">
      <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10">
        {/* Top */}
        <div className="grid gap-16 lg:grid-cols-[1fr_420px]">
          {/* Left */}
          <div>
            {/* Logo */}

            <Link href="/" className="inline-flex">
              <Image
                src="/assets/logos/chelsea_portland_logo_152x56px.svg"
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
                  className="relative text-[17px] text-white/75 transition hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[#AF0040] after:transition-all hover:after:w-full"
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
              value="Chelsea Portland House
47–49 Park Royal Road
London NW10 7LG
United Kingdom"
            />

            <ContactCard
              icon={<Mail size={20} />}
              value="partnerships@chelsea-portland.com"
            />
          </div>
        </div>

        {/* Divider */}

        <div className="my-16 h-px bg-white/10" />

        {/* Bottom */}

        <div className="flex flex-col gap-8 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} Chelsea Portland House. All rights
            reserved.
          </p>

          <div className="flex gap-10 ">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="transition hover:text-white">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                  <DialogDescription>Last updated: July 2026</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-base text-slate-900 dark:text-slate-100">
                  <article>
                    <h2 className="text-2xl ">Introduction</h2>
                    <p>
                      Chelsea Portland House respects your privacy and is
                      committed to protecting your personal information.
                    </p>
                    <p>
                      This Privacy Policy explains how we collect, use and
                      protect information provided to us when you visit our
                      website, contact us or engage with our services.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Information We Collect</h2>
                    <p>
                      We may collect personal information that you voluntarily
                      provide, including:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Name</li>
                      <li>Organisation or company details</li>
                      <li>
                        Contact information including email address and
                        telephone number
                      </li>
                      <li>
                        Information provided through enquiry forms or
                        correspondence
                      </li>
                    </ul>
                  </article>

                  <article>
                    <h2 className="text-2xl ">How We Use Your Information</h2>
                    <p>We use personal information to:</p>
                    <ul className="list-disc pl-5">
                      <li>Respond to enquiries</li>
                      <li>
                        Communicate with clients and professional contacts
                      </li>
                      <li>Provide our services</li>
                      <li>Manage business relationships</li>
                      <li>Maintain appropriate records</li>
                    </ul>
                    <p>
                      We do not sell your personal information to third parties.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Sharing Information</h2>
                    <p>
                      Where required to support client matters, we may share
                      information with trusted professional advisers, service
                      providers or other relevant parties.
                    </p>
                    <p>
                      Information will only be shared where appropriate and
                      necessary.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Data Security</h2>
                    <p>
                      We take reasonable steps to protect personal information
                      and maintain appropriate safeguards against unauthorised
                      access, loss or misuse.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Retaining Information</h2>
                    <p>
                      We retain personal information only for as long as
                      reasonably necessary for business, legal or regulatory
                      purposes.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Your Rights</h2>
                    <p>
                      You may have rights regarding your personal information,
                      including requesting access, correction or deletion of
                      your data.
                    </p>
                  </article>

                  <article>
                    <h2 className="text-2xl ">Contact</h2>
                    <p>
                      Chelsea Portland House
                    </p>
                    <p></p>
                      47–49 Park Royal Road
                      <br />
                    <p>
                      London, NW10 7LQ
                    </p>
                    <p>
                      United Kingdom  
                    </p>
                    <br />
                    <p>
                      partnership@chelsea-portland.com
                    </p>
                  </article>
                </div>
                <DialogFooter className="mt-6" showCloseButton />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="transition hover:text-white">
                  Terms of Service
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                  <DialogDescription>
                    By using this site, you agree to our terms for content
                    usage, enquiries, and service delivery.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-slate-900 dark:text-slate-100">
                  <p>
                    We aim to provide accurate content and responsive support.
                    Our services are subject to availability, and we reserve the
                    right to update these terms as needed.
                  </p>
                  <p>
                    Any enquiries or contracts entered through this site are
                    subject to applicable laws and standard professional terms.
                  </p>
                </div>
                <DialogFooter className="mt-6" showCloseButton />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  value: string;
}

function ContactCard({ icon, value }: ContactCardProps) {
  return (
    <div className="group flex items-center gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center  bg-secondary text-white transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>

      <div>
        <p className=" whitespace-pre-line leading-7 text-white/80">{value}</p>
      </div>
    </div>
  );
}
