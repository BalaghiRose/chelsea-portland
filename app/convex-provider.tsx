"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL. Set the Convex deployment URL before starting the app."
  );
}

const convexClient = new ConvexReactClient(convexUrl);

interface ConvexProviderProps {
  children: ReactNode;
}

export default function AppConvexProvider({ children }: ConvexProviderProps) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
