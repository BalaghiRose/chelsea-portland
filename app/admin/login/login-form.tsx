"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAdmin, type AdminLoginState } from "./actions";

const initialState: AdminLoginState = {
  error: "",
};

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-8 space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
          Chelsea Portland
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          Admin Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Use your dashboard credentials to continue.
        </p>
      </div>

      <form action={action} className="space-y-5">
        <input type="hidden" name="next" value={nextPath} />

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-primary">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@chelsea.com"
            required
            className="h-11 rounded-2xl border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-primary">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="h-11 rounded-2xl border-border bg-background"
          />
        </div>

        {state.error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {state.error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
