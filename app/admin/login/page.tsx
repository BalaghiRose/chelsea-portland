import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/admin-auth";

import LoginForm from "./login-form";

interface AdminLoginPageProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { next } = await searchParams;

  if (await isAdminAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <LoginForm nextPath={next ?? "/dashboard"} />
    </main>
  );
}
