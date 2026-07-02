import type { Metadata } from "next";
import CaseStudyDetailClient from "./pageClient";
import ContactSection from "../../_components/contact";
import Footer from "../../_components/footer";
import LocationSection from "../../_components/location";

export const metadata: Metadata = {
  title: "Case Study Details",
  description: "Read a detailed Chelsea Portland case study.",
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
