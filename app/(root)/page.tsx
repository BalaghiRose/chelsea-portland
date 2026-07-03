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

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><WhyUs /></ScrollReveal>
      <ScrollReveal><HowWeHelp /></ScrollReveal>
      <ScrollReveal><ServicesSection /></ScrollReveal>
      <ScrollReveal><OverseasLawFirms /></ScrollReveal>
      <ScrollReveal><CaseStudies /></ScrollReveal>
      <ScrollReveal><ContactSection /></ScrollReveal>
      <ScrollReveal><LocationSection /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
    </main>
  );
}
