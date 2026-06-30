export interface CaseStudy {
  _id: string;
  slug: string;
  title: string;
  paras: string;
  featured: boolean;
  altText: string;
  thumbnailUrl: string | null;
  sortOrder?: number;
}