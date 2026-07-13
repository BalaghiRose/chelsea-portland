import type { Metadata } from "next";
import type { ReactNode } from "react";
import NavbarWrapper from "./_components/NavbarWrapper";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarWrapper />
      <div>{children}</div>
    </>
  );
}
