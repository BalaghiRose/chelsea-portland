import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import CaseStudyDetailClient from "./pageClient";
import ContactSection from "../../_components/contact";
import Footer from "../../_components/footer";
import LocationSection from "../../_components/location";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // Next.js 15: params is async
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  const fallbackMeta: Metadata = {
    title: "Case Study | Chelsea Portland",
    description:
      "Detailed case study from Chelsea Portland showcasing UK presence and representation for international businesses.",
    robots: { index: false, follow: true },
  };

  if (!convexUrl || !slug) {
    return fallbackMeta;
  }

  let study: any = null;
  try {
    study = await fetchQuery(
      api.caseStudies.getCaseStudyBySlug,
      { slug },
      { url: convexUrl, skipConvexDeploymentUrlCheck: true },
    );
  } catch (error) {
    console.error("Failed to fetch case study metadata:", error);
  }

  if (!study) {
    return fallbackMeta;
  }

  // Use custom meta fields first, fall back to derived content
  const fallbackDescription =
    study.paras
      .split("\n")
      .map((line: string) => line.trim())
      .find(Boolean)
      ?.slice(0, 160) ??
    "Chelsea Portland case study covering UK commercial representation and local market support for international clients.";

  const title = study.metaTitle?.trim()
    ? study.metaTitle
    : `${study.title} | Chelsea Portland`;

  const description = study.metaDescription?.trim()
    ? study.metaDescription
    : fallbackDescription;

  const keywords =
    study.metaKeywords && study.metaKeywords.length > 0
      ? study.metaKeywords
      : [
          "Chelsea Portland case study",
          "UK commercial representation",
          "international business UK",
          study.title,
        ];

  const url = `https://chelsea-portland.com/case-studies/${slug}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Chelsea Portland House" }],
    creator: "Chelsea Portland House",
    publisher: "Chelsea Portland House",
    openGraph: {
      title,
      description,
      url,
      siteName: "Chelsea Portland House",
      type: "article",
      locale: "en_GB",
      images: [
        {
          url: study.thumbnailUrl || "/assets/images/hero_section_image.png",
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [study.thumbnailUrl || "/assets/images/hero_section_image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const caseStudies = await fetchQuery(api.caseStudies.getCaseStudies);
  return caseStudies.map((study: { slug: string }) => ({
    slug: study.slug,
  }));
}

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
