import AboutSection from "./_components/about";
import CaseStudies from "./_components/caseStudies";
import ContactSection from "./_components/contact";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import HowWeHelp from "./_components/how-we-help";
import OverseasLawFirms from "./_components/law-firms";
import LocationSection from "./_components/location";
import ScrollReveal from "./_components/scroll-reveal";
import ServicesSection from "./_components/services";
import WhyUs from "./_components/why-us";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

async function fetchPublishedSection(section: string) {
  try {
    return await fetchQuery(api.cms.queries.getPublishedSection, {
      section,
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [about, whyUs, howWeHelp, contact, location] = await Promise.all([
    fetchPublishedSection("about"),
    fetchPublishedSection("why-us"),
    fetchPublishedSection("how-we-help"),
    fetchPublishedSection("contact"),
    fetchPublishedSection("location"),
  ]);

  return (
    <main>
      <HeroSection />
      <ScrollReveal><AboutSection content={about?.content} /></ScrollReveal>
      <ScrollReveal><WhyUs content={whyUs?.content} /></ScrollReveal>
      <ScrollReveal><HowWeHelp content={howWeHelp?.content} /></ScrollReveal>
      <ScrollReveal><ServicesSection /></ScrollReveal>
      <ScrollReveal><OverseasLawFirms /></ScrollReveal>
      <ScrollReveal><CaseStudies /></ScrollReveal>
      <ScrollReveal><ContactSection content={contact?.content} /></ScrollReveal>
      <ScrollReveal><LocationSection content={location?.content} /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
    </main>
  );
}
