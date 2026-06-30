import type { Id } from "@/convex/_generated/dataModel";

export interface DashboardCaseStudy {
  _id: Id<"caseStudies">;
  _creationTime: number;
  slug: string;
  title: string;
  paras: string;
  featured: boolean;
  thumbnail?: Id<"_storage">;
  thumbnailUrl: string | null;
  altText: string;
  sortOrder?: number;
  createdAt: number;
  updatedAt: number;
}
