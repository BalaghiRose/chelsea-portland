import SectionLayout from "./section-layout";
import { normalizeSectionContent } from "./cms-section-content";

interface HowWeHelpProps {
  content?: unknown;
}

export default function HowWeHelp({ content }: HowWeHelpProps) {
  const cmsContent = normalizeSectionContent("how-we-help", content);

  return (
    <SectionLayout
      id="how-we-help"
      sectionLabel={cmsContent.sectionLabel ?? "Who We Help"}
      sectionLabelClassName="text-secondary section-label"
      contentClassName="paragraph text-primary"
    >
      {cmsContent.paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </SectionLayout>
  );
}
