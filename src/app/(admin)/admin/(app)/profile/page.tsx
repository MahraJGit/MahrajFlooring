import { AdminPageHeader } from "@/components/admin/page-chrome";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/actions/auth";

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <>
      <AdminPageHeader
        title="Profile"
        description="Your sign-in details. Password changes will be added with user management."
      />
      <Card className="max-w-lg">
        <CardContent className="space-y-4 pt-5">
          <Field label="Name" value={user.name} />
          <Field label="Email" value={user.email} />
          <Field label="Role" value={user.role === "admin" ? "Admin" : "Editor"} />
        </CardContent>
      </Card>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}
