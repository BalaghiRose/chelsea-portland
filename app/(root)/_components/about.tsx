import SectionLayout from "./section-layout";
import { normalizeSectionContent } from "./cms-section-content";

interface AboutSectionProps {
  content?: unknown;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const cmsContent = normalizeSectionContent("about", content);

  return (
    <SectionLayout
      id="about"
      sectionLabel={cmsContent.sectionLabel ?? "About Us"}
      title={cmsContent.title}
      sectionLabelClassName="text-secondary section-label "
      titleClassName="font-bold"
      contentClassName="paragraph text-primary "
    >
      {cmsContent.paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </SectionLayout>
  );
}
