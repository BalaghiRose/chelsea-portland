"use client";

import { Mail, MapPin, Globe, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#F4F4F4] py-20 sm:py-24 lg:py-32 xl:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10">
        {/* LEFT */}

        <div className="flex flex-col justify-between">
          <div className="max-w-xl">
            <p className="section-label text-secondary uppercase">Contact Us</p>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Whether you are entering the UK market, managing existing UK
              interests, seeking local representation or requiring practical
              support with a business, investment, project or commercial matter,
              we welcome the opportunity to discuss your requirements.
            </p>
          </div>

          {/* Contact Cards */}

          <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
            <ContactCard
              icon={<MapPin size={22} />}
              value="Chelsea Portland House,
47–49 Park Royal Road, London NW10 7LQ, United Kingdom"
            />

            <ContactCard
              icon={<Mail size={22} />}
              value="partnerships@chelsea-portland.com"
            />

            <ContactCard
              icon={<Globe size={22} />}
              value="chelsea-portland.com"
            />
          </div>
        </div>

        {/* FORM */}

        <div className="border border-[#d9dee3] bg-white p-5 sm:p-8 shadow-[0_40px_90px_-40px_rgba(0,16,30,.14)] lg:p-8 xl:p-10">
          <p className="section-label text-secondary uppercase">Enquiry Form</p>

          <form className="mt-10 flex h-full flex-col">
            <div className="grid gap-8">
              <Input label="Full Name" placeholder="John Smith" />

              <Input label="Organisation" placeholder="Chelsea Portland Ltd." />

              <Input
                label="Email Address"
                placeholder="john@example.com"
                type="email"
              />

              <Input label="Telephone" placeholder="+44 123 456 789" />

              <div>
                <label className="mb-3 block text-base uppercase tracking-[0.16em] sm:tracking-[0.22em] text-primary">
                  Message
                </label>

                <textarea
                  rows={3}
                  placeholder="Tell us about your project..."
                  className="w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-4 pt-2 text-base outline-none transition focus:border-[#C59A5C] sm:text-lg"
                />
              </div>
            </div>

            <div className="mt-10">
              <button className="group flex w-full items-center justify-center gap-3 border border-[#00101E] bg-primary px-4 py-4 sm:py-5 text-base sm:text-lg uppercase tracking-[0.14em] sm:tracking-[0.25em] text-white transition hover:bg-[#0B2138]">
                Send Enquiry
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  icon: React.ReactNode;
  value: string;
}

function ContactCard({ icon, value }: CardProps) {
  return (
    <div className="flex items-start gap-3 p-4 sm:items-center sm:gap-4 sm:p-5 lg:p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-secondary text-white">
        {icon}
      </div>

      <div>
        <p className="whitespace-pre-line leading-7 text-primary w-full max-w-[34ch]">
          {value}
        </p>
      </div>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="mb-3 block text-base uppercase tracking-[0.16em] sm:tracking-[0.22em] text-primary">
        {label}
      </label>

      <input
        {...props}
        className="w-full border-0 border-b border-slate-300 bg-transparent px-0  text-sm outline-none transition focus:border-[#af0040] sm:text-lg"
      />
    </div>
  );
}
