import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, Inter } from "next/font/google";
import "./styles/globals.scss";
import { cn } from "@/lib/utils";
import AppConvexProvider from "./convex-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const headingSerif = Cormorant_Garamond({
  variable: "--font-heading-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chelseaportland.com"),
  title: {
    default: "Chelsea Portland House | UK Business Representation",
    template: "%s | Chelsea Portland House",
  },
  description:
    "Trusted UK commercial presence, local representation and practical support for overseas law firms, international businesses and investors. Based in London.",
  keywords: [
    "UK business representation",
    "UK commercial presence",
    "overseas law firms UK",
    "UK market entry",
    "local representation United Kingdom",
    "international business UK",
    "stakeholder engagement London",
    "Chelsea Portland House",
    "UK presence overseas clients",
    "London commercial representation",
  ],
  authors: [{ name: "Chelsea Portland House" }],
  creator: "Chelsea Portland House",
  publisher: "Chelsea Portland House",
  category: "Business Services",
  openGraph: {
    title: "Chelsea Portland House | UK Business Representation",
    description:
      "Trusted UK commercial presence and local representation for overseas law firms, international businesses and investors with UK interests. Based in London.",
    url: "https://chelseaportland.com",
    siteName: "Chelsea Portland House",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/assets/images/hero_section_image.png",
        width: 1200,
        height: 630,
        alt: "Chelsea Portland House – Trusted UK Presence for International Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chelsea Portland House | UK Business Representation",
    description:
      "Trusted UK commercial presence and local representation for overseas law firms, international businesses and investors with UK interests. Based in London.",
    images: ["/assets/images/hero_section_image.png"],
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
    canonical: "https://chelseaportland.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", outfit.variable, headingSerif.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AppConvexProvider>{children}</AppConvexProvider>
      </body>
    </html>
  );
}
