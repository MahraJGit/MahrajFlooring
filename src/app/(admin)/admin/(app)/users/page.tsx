import { AdminPageHeader, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/actions/auth";
import { listUsers } from "@/lib/users/queries";

export default async function UsersPage() {
  await requireAdmin();
  const users = await listUsers();

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Admins can manage users. Editors never see this page. Invite/edit actions come next."
      />
      {users.length === 0 ? (
        <EmptyState
          title="No users found"
          body="Existing admin users should appear here. Nothing was deleted or reset."
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Name</AdminTh>
              <AdminTh>Email</AdminTh>
              <AdminTh>Role</AdminTh>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/40">
                <AdminTd>
                  <p className="font-medium">{user.name || "—"}</p>
                </AdminTd>
                <AdminTd>{user.email}</AdminTd>
                <AdminTd>
                  <Badge variant={user.role === "admin" ? "default" : "muted"}>
                    {user.role === "admin" ? "Admin" : "Editor"}
                  </Badge>
                </AdminTd>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </>
  );
}
