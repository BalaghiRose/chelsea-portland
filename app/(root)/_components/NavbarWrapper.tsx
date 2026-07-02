"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  // Hide the global navbar on individual case study detail pages
  const isCaseStudyDetail = /^\/case-studies\/[^/]+/.test(pathname);
  if (isCaseStudyDetail) return null;
  return <Navbar />;
}
