export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  client: string;
  sector: string;
  location: string;
  duration: string;
  featured: boolean;
  services: string[];
  results: string[];
  sections: {
    title: string;
    paragraphs: string[];
  }[];
}