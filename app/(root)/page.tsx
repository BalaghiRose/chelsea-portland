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

export default async function HomePage() {
  const about = await fetchQuery(api.cms.queries.getPublishedSection, {
    section: "about",
  });
  const whyUs = await fetchQuery(api.cms.queries.getPublishedSection, {
    section: "why-us",
  });
  const howWeHelp = await fetchQuery(api.cms.queries.getPublishedSection, {
    section: "how-we-help",
  });
  const contact = await fetchQuery(api.cms.queries.getPublishedSection, {
    section: "contact",
  });
  const location = await fetchQuery(api.cms.queries.getPublishedSection, {
    section: "location",
  });

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
