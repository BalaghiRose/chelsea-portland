import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Chelsea Portland",
  description: "Strategic case studies, services, and international UK market support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
