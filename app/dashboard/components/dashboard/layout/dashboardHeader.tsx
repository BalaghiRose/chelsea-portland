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
          <h1 className="text-xl font-semibold tracking-tight text-primary">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your website content.
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Search */}

          <div className="relative hidden w-72 lg:block">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search..."
              className="h-10 rounded-2xl border-border pl-9"
            />
          </div>

          {/* Notifications */}

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-2xl border-border"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </Button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              CP
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-medium text-primary">
                Administrator
              </p>

              <p className="text-xs text-muted-foreground">
                admin@chelsea.com
              </p>
            </div>
          </div>

          <form action={signOutAdmin}>
            <Button
              type="submit"
              variant="outline"
              size="icon"
              className="rounded-2xl border-border"
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}