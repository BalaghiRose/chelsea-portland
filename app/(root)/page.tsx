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
import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const revalidate = 300;

const HOME_SECTION_KEYS = [
  "about",
  "why-us",
  "how-we-help",
  "contact",
  "location",
] as const;

const getCachedPublishedSections = unstable_cache(
  async (sections: readonly string[]) => {
    try {
      return await fetchQuery(api.cms.queries.getPublishedSections, {
        sections: [...sections],
      });
    } catch {
      return {} as Record<string, { content?: unknown } | null>;
    }
  },
  ["home-published-sections"],
  {
    revalidate: 300,
    tags: ["cms-sections"],
  }
);

export default async function HomePage() {
  const publishedSections = await getCachedPublishedSections(HOME_SECTION_KEYS);

  const about = publishedSections.about ?? null;
  const whyUs = publishedSections["why-us"] ?? null;
  const howWeHelp = publishedSections["how-we-help"] ?? null;
  const contact = publishedSections.contact ?? null;
  const location = publishedSections.location ?? null;

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
