import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_EMAIL = "admin@chelsea.com";
export const ADMIN_PASSWORD = "Chelsea@2026";
export const ADMIN_SESSION_COOKIE = "chelsea_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
