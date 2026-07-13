"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SESSION_COOKIE,
} from "@/lib/admin-auth";

export interface AdminLoginState {
  error?: string;
}

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/dashboard");

  if (!email || !password) {
    return { error: "Enter both email and password." };
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(nextPath);
}

export async function signOutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
