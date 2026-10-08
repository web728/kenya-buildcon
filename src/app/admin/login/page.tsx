import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth/auth";
import { event } from "@/config/event";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/admin");

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect(`/admin/login?error=1&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
    throw err;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center bg-brand-dark px-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Admin</p>
        <h1 className="mt-2 text-xl font-extrabold text-white">{event.shortName} Admin</h1>

        <form action={loginAction} className="mt-8 flex flex-col gap-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl || "/admin"} />
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-400">
              Invalid email or password.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 rounded-md bg-brand-red px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-red-dark"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
