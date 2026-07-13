import ContentHeader from "./components/componentHeader";

import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ContentCard from "./components/commponentCard";

const SUPPORTED_SECTIONS = [
  "about",
  "why-us",
  "how-we-help",
  "contact",
  "location",
];

export default async function ContentPage() {
  const sections = await fetchQuery(api.cms.queries.getAllSections);
  const sectionMap = new Map(sections.map((section) => [section.section, section]));

  const contentCards = SUPPORTED_SECTIONS.map((sectionKey) => {
    const existingSection = sectionMap.get(sectionKey);

    return (
      existingSection ?? {
        _id: sectionKey,
        section: sectionKey,
        updatedAt: 0,
        isPublished: true,
        content: null,
      }
    );
  });

  return (
    <div className="space-y-8">
      <ContentHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {contentCards.map((section) => (
          <ContentCard
            key={section._id}
            section={section}
          />
        ))}
      </div>
    </div>
  );
}