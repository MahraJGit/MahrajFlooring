import Image from "next/image";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { getCurrentUser } from "@/lib/auth/current-user";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <span className="relative size-10 overflow-hidden rounded-xl">
            <Image
              src="/svgs/logo/mahraj-mark.svg"
              alt=""
              fill
              sizes="40px"
              className="object-contain"
            />
          </span>
          <div>
            <p className="font-heading text-lg font-semibold text-ink">
              Mahraj Flooring
            </p>
            <p className="text-sm text-muted-foreground">Content management</p>
          </div>
        </div>
        <h1 className="font-heading text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Use your existing Mahraj admin email and password.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
