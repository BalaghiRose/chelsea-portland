import type { Metadata } from "next";
import CaseStudyDetailClient from "./pageClient";

export const metadata: Metadata = {
  title: "Case Study Details",
  description: "Read a detailed Chelsea Portland case study.",
};

export default function CaseStudyDetailPage() {
  return <CaseStudyDetailClient />;
}
