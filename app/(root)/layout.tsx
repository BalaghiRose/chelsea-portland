import type { Metadata } from "next";
import type { ReactNode } from "react";
import NavbarWrapper from "./_components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Chelsea Portland",
  description: "Strategic case studies, services, and international UK market support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarWrapper />
      <div>{children}</div>
    </>
  );
}
