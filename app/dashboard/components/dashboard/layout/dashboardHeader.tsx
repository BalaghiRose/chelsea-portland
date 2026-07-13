"use client";

import { Bell, LogOut, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOutAdmin } from "@/app/admin/login/actions";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">
        {/* Left */}

        <div>
          <h1 className=" section-subheading  text-primary">
            Dashboard
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          <form action={signOutAdmin}>
            <Button
              type="submit"
              variant="outline"
              size="icon"
              className="rounded-2xl border-border"
              aria-label="Sign out"
            >
              <LogOut size={18} className="text-red-600"/> 
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
