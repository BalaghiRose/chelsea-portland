import type { Metadata } from "next";
import CaseStudiesPageClient from "./pageClient";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore Chelsea Portland case studies covering market entry, commercial representation, and UK-side coordination for international clients.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
