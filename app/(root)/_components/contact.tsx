"use client";

import { useState } from "react";
import { Mail, MapPin, Globe, ArrowRight, AlertCircle } from "lucide-react";
import { normalizeSectionContent } from "./cms-section-content";

interface ContactSectionProps {
  content?: unknown;
}

interface ContactFormValues {
  fullName: string;
  organisation: string;
  email: string;
  telephone: string;
  message: string;
}

const SITE_CONTACT_EMAIL = "partnerships@chelsea-portland.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common personal/free email providers we don't accept
const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "rediffmail.com",
];

const INITIAL_FORM_VALUES: ContactFormValues = {
  fullName: "",
  organisation: "",
  email: "",
  telephone: "",
  message: "",
};

function isBusinessEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmed)) return false;

  const domain = trimmed.split("@")[1];
  return domain ? !PERSONAL_EMAIL_DOMAINS.includes(domain) : false;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const cmsContent = normalizeSectionContent("contact", content);
  const [values, setValues] = useState<ContactFormValues>(INITIAL_FORM_VALUES);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("");
      return;
    }

    if (!EMAIL_REGEX.test(value.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isBusinessEmail(value)) {
      setEmailError(
        "Please use your business email address to submit your enquiry."
      );
      return;
    }

    setEmailError("");
  };

  const handleFieldChange =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((currentValues) => ({
        ...currentValues,
        [field]: value,
      }));

      if (field === "email" && touched) {
        validateEmail(value);
      }

      if (field === "fullName" && touched) {
        setFullNameError(value.trim() ? "" : "Please enter your full name.");
      }

      if (field === "message" && touched) {
        setMessageError(value.trim() ? "" : "Please enter your message.");
      }

      setSubmitMessage("");
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    setSubmitMessage("");

    const fullName = values.fullName.trim();
    const message = values.message.trim();
    const email = values.email.trim();

    setFullNameError(fullName ? "" : "Please enter your full name.");
    setMessageError(message ? "" : "Please enter your message.");
    validateEmail(email);

    if (!fullName || !message || !email || !isBusinessEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          organisation: values.organisation.trim(),
          email,
          telephone: values.telephone.trim(),
          message,
        }),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok || !result.success) {
        setSubmitMessage(result.error ?? "Failed to send enquiry.");
        return;
      }

      setValues(INITIAL_FORM_VALUES);
      setTouched(false);
      setFullNameError("");
      setMessageError("");
      setEmailError("");
      setSubmitMessage(
        `Thank you. Your enquiry has been sent to ${SITE_CONTACT_EMAIL}.`
      );
    } catch {
      setSubmitMessage("Failed to send enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#F4F4F4] py-20 sm:py-24 lg:py-32 xl:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10">
        <div className="flex flex-col justify-between">
          <div className="max-w-xl">
            <h2 className="section-label text-secondary uppercase">
              {cmsContent.sectionLabel ?? "Contact Us"}
            </h2>

            {cmsContent.paragraphs.map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 space-y-3 sm:mt-14 sm:space-y-4">
            {cmsContent.contactCards.map((card, index) => (
              <ContactCard
                key={`${card.value}-${index}`}
                icon={getContactIcon(card.icon)}
                value={card.value}
              />
            ))}
          </div>
        </div>

        <div className="border border-[#d9dee3] bg-white p-5 sm:p-8 shadow-[0_40px_90px_-40px_rgba(0,16,30,.14)] lg:p-8 xl:p-10">
          <h3 className="section-label text-secondary uppercase">
            Enquiry Form
          </h3>

          <form
            className="mt-10 flex h-full flex-col"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-8">
              <Input
                label="Full Name"
                name="fullName"
                required
                value={values.fullName}
                onChange={handleFieldChange("fullName")}
                aria-invalid={!!fullNameError}
                aria-describedby={fullNameError ? "full-name-error" : undefined}
                error={!!fullNameError}
                errorText={fullNameError}
              />

              <Input
                label="Organisation"
                name="organisation"
                value={values.organisation}
                onChange={handleFieldChange("organisation")}
              />

              <div>
                <label className="mb-3 block text-base uppercase tracking-[0.16em] sm:tracking-[0.22em] text-primary">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleFieldChange("email")}
                  onBlur={() => {
                    setTouched(true);
                    validateEmail(values.email);
                  }}
                  required
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full border-0 border-b bg-transparent px-0 pb-1 text-sm outline-none transition focus:border-[#af0040] sm:text-lg ${
                    emailError ? "border-red-500" : "border-slate-300"
                  }`}
                />

                {emailError && (
                  <p
                    id="email-error"
                    className="mt-2 flex items-start gap-1.5 text-sm text-red-600"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              <Input
                label="Telephone"
                type="tel"
                name="telephone"
                value={values.telephone}
                onChange={handleFieldChange("telephone")}
              />

              <div>
                <label className="mb-3 block text-base uppercase tracking-[0.16em] sm:tracking-[0.22em] text-primary">
                  Message
                </label>

                <textarea
                  rows={3}
                  name="message"
                  value={values.message}
                  onChange={handleFieldChange("message")}
                  required
                  aria-invalid={!!messageError}
                  aria-describedby={messageError ? "message-error" : undefined}
                  className={`w-full border-0 border-b bg-transparent px-0 pb-4 pt-2 text-base outline-none transition focus:border-[#C59A5C] sm:text-lg ${
                    messageError ? "border-red-500" : "border-slate-300"
                  }`}
                />

                {messageError && (
                  <p
                    id="message-error"
                    className="mt-2 flex items-start gap-1.5 text-sm text-red-600"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{messageError}</span>
                  </p>
                )}
              </div>
            </div>

            {submitMessage && (
              <p className="mt-6 text-sm text-secondary">{submitMessage}</p>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 border border-[#00101E] bg-primary px-4 py-4 text-base uppercase tracking-[0.14em] text-white transition hover:bg-[#0B2138] disabled:cursor-not-allowed disabled:opacity-70 sm:py-5 sm:text-lg sm:tracking-[0.25em]"
              >
                {isSubmitting ? "Preparing Email..." : "Send Enquiry"}
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

function getContactIcon(icon?: "map" | "mail" | "globe") {
  if (icon === "mail") {
    return <Mail size={22} />;
  }

  if (icon === "globe") {
    return <Globe size={22} />;
  }

  return <MapPin size={22} />;
}

interface CardProps {
  icon: React.ReactNode;
  value: string;
}

function ContactCard({ icon, value }: CardProps) {
  return (
    <div className="flex items-center gap-3 sm:items-center sm:gap-4 sm:py-3 lg:py-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-secondary text-white">
        {icon}
      </div>

      <div>
        <p className="w-full max-w-[34ch] whitespace-pre-line leading-7 text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorText?: string;
}

function Input({
  label,
  error = false,
  errorText,
  ...props
}: InputProps) {
  const fieldId = props.name ? `${props.name}-field` : undefined;
  const describedBy = errorText ? `${props.name}-error` : props["aria-describedby"];

  return (
    <div>
      <label className="mb-3 block text-base uppercase tracking-[0.16em] text-primary sm:tracking-[0.22em]">
        {label}
      </label>

      <input
        {...props}
        id={fieldId}
        aria-describedby={describedBy}
        className={`w-full border-0 border-b bg-transparent px-0 text-sm outline-none transition focus:border-[#af0040] sm:text-lg ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      />

      {errorText && (
        <p
          id={`${props.name}-error`}
          className="mt-2 flex items-start gap-1.5 text-sm text-red-600"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorText}</span>
        </p>
      )}
    </div>
  );
}