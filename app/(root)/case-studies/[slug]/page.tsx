import type { Metadata } from "next";
import CaseStudyDetailClient from "./pageClient";
import ContactSection from "../../_components/contact";
import Footer from "../../_components/footer";
import LocationSection from "../../_components/location";

export const metadata: Metadata = {
  title: "Case Studies | Chelsea Portland",
  description:
    "Explore Chelsea Portland case studies covering market entry, commercial representation, and UK-side coordination for international clients.",
  keywords: [
    "Chelsea Portland case studies",
    "UK market entry case study",
    "UK commercial representation examples",
    "overseas law firm UK support",
    "international business UK case study",
    "UK presence success stories",
    "London business representation",
    "stakeholder engagement case study",
  ],
  authors: [{ name: "Chelsea Portland House" }],
  creator: "Chelsea Portland House",
  publisher: "Chelsea Portland House",
  openGraph: {
    title: "Case Studies | Chelsea Portland",
    description:
      "Explore Chelsea Portland case studies covering market entry, commercial representation, and UK-side coordination for international clients.",
    url: "https://chelsea-portland.com/case-studies",
    siteName: "Chelsea Portland House",
    type: "article",
    locale: "en_GB",
    images: [
      {
        url: "/assets/images/hero_section_image.png",
        width: 1200,
        height: 630,
        alt: "Case Studies | Chelsea Portland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Chelsea Portland",
    description:
      "Explore Chelsea Portland case studies covering market entry, commercial representation, and UK-side coordination for international clients.",
    images: ["/assets/images/hero_section_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://chelsea-portland.com/case-studies",
  },
};

export default function CaseStudyDetailPage() {
  return (
    <>
      <CaseStudyDetailClient />
      <ContactSection />
      <LocationSection />

      <Footer />
    </>
  );
}
