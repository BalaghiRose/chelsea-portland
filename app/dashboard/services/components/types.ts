import type { Id } from "@/convex/_generated/dataModel";

export interface DashboardService {
  _id: Id<"services">;
  _creationTime: number;
  title: string;
  description: string[];
  icon?: Id<"_storage">;
  iconUrl: string | null;
  thumbnail?: Id<"_storage">;
  thumbnailUrl: string | null;
  altText: string;
  sortOrder?: number;
  createdAt: number;
  updatedAt: number;
}
