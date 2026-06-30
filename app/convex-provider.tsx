"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const fallbackConvexUrl = "https://placeholder.convex.cloud";

const convexClient = new ConvexReactClient(convexUrl ?? fallbackConvexUrl);

interface ConvexProviderProps {
  children: ReactNode;
}

export default function AppConvexProvider({ children }: ConvexProviderProps) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
