"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAdmin, type AdminLoginState } from "./actions";
import Image from "next/image";

const initialState: AdminLoginState = {
  error: "",
};

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left: full-size image, hidden on mobile — form-only on small screens */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/assets/images/chelsea_admin_img.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>

      {/* Right: primary background, form */}
      <div className="flex w-full items-center justify-center bg-primary px-4 py-12 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md rounded-sm border border-white/10 bg-primary p-6 sm:p-8">
          <div className="mb-8 flex flex-col items-center gap-3 space-y-2">
            <Image
              src="/assets/logos/chelsea_portland_logo_152x56px.svg"
              alt="Chelsea Portland"
              width={152}
              height={40}
            />
            <h1 className="text-3xl font-semibold tracking-tight text-primary-foreground">
              Admin Sign In
            </h1>
            <p className="text-sm text-primary-foreground/70">
              Use your dashboard credentials to continue.
            </p>
          </div>

          <form action={action} className="space-y-5">
            <input type="hidden" name="next" value={nextPath} />

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-primary-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="admin@chelsea.com"
                required
                className="h-11 rounded-sm border-white/20 bg-white text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-primary-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-11 rounded-sm border-white/20 bg-white text-foreground"
              />
            </div>

            {state.error ? (
              <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {state.error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="h-11 w-full rounded-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}