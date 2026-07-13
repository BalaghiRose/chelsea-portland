import SectionLayout from "./section-layout";
import { normalizeSectionContent } from "./cms-section-content";

interface WhyUsProps {
  content?: unknown;
}

export default function WhyUs({ content }: WhyUsProps) {
  const cmsContent = normalizeSectionContent("why-us", content);

  return (
    <SectionLayout
      id="why-us"
      sectionLabel={cmsContent.sectionLabel ?? "Why Us"}
      sectionLabelClassName="section-label"
      contentClassName="paragraph "
      background="primary"
      logo={true}
    >
      {cmsContent.paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </SectionLayout>
  );
}
