import type { Metadata } from "next";
import type { ReactNode } from "react";
import NavbarWrapper from "./_components/NavbarWrapper";

export const metadata: Metadata = {
  title: "Chelsea Portland | Trusted UK Presence For Businesses",
  description: "Trusted UK commercial presence and local representation for overseas law firms, international businesses and investors with UK interests. Based in London.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarWrapper />
      <div>{children}</div>
    </>
  );
}
