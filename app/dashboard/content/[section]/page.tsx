import { fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import ContentSectionEditor from "../components/contentSectionEditor";

interface ContentSectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function ContentSectionPage({
  params,
}: ContentSectionPageProps) {
  const { section } = await params;
  const sectionRecord = await fetchQuery(api.cms.queries.getSection, {
    section,
  });

  return (
    <ContentSectionEditor
      section={section}
      initialSection={sectionRecord ?? undefined}
    />
  );
}
