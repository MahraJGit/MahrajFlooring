import Link from "next/link";

import { MoveGroupButton } from "@/components/admin/move-buttons";
import { SavedBanner } from "@/components/admin/field";
import { AdminPageHeader, AdminPagination, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireUser } from "@/actions/auth";
import { listServiceGroups } from "@/lib/services/queries";

export default async function ServiceGroupsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser();
  const params = await searchParams;
  const q = first(params.q);
  const status = first(params.status);
  const menu = first(params.menu);
  const page = Number(first(params.page) ?? "1") || 1;
  const saved = first(params.saved);

  const result = await listServiceGroups({
    q,
    status: status === "draft" || status === "published" ? status : "all",
    menu: menu === "visible" || menu === "hidden" ? menu : "all",
    page,
    limit: 50,
  });

  return (
    <>
      <AdminPageHeader
        title="Service groups"
        description="Mega-menu columns. Publish a group and add services under it."
        action={
          <Button asChild>
            <Link href="/admin/service-groups/new">New group</Link>
          </Button>
        }
      />
      <SavedBanner value={saved} />
      <form className="mb-4 flex flex-wrap gap-2" method="get">
        <Input name="q" defaultValue={q} placeholder="Search groups" className="h-9 w-56" />
        <select name="status" defaultValue={status ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select name="menu" defaultValue={menu ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All menu visibility</option>
          <option value="visible">In mega menu</option>
          <option value="hidden">Hidden from menu</option>
        </select>
        <Button type="submit" variant="outline">
          Filter
        </Button>
        {q || status || menu ? (
          <Button asChild variant="ghost">
            <Link href="/admin/service-groups">Clear</Link>
          </Button>
        ) : null}
      </form>

      {result.items.length === 0 ? (
        <EmptyState
          title={q || status || menu ? "No service groups match" : "No service groups yet"}
          body={
            q || status || menu
              ? "Try clearing filters, or create a new group."
              : "Create the first group, then add services under it."
          }
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Name</AdminTh>
              <AdminTh>Slug</AdminTh>
              <AdminTh>Services</AdminTh>
              <AdminTh>Position</AdminTh>
              <AdminTh>Menu</AdminTh>
              <AdminTh>Status</AdminTh>
              <AdminTh>Updated</AdminTh>
              <AdminTh>Actions</AdminTh>
            </tr>
          </thead>
          <tbody>
            {result.items.map((group) => (
              <tr key={group.id} className="hover:bg-muted/40">
                <AdminTd>
                  <Link href={`/admin/service-groups/${group.id}`} className="font-medium hover:text-brand">
                    {group.title}
                  </Link>
                </AdminTd>
                <AdminTd>
                  <span className="text-xs text-muted-foreground">{group.slug}</span>
                </AdminTd>
                <AdminTd>{group.serviceCount}</AdminTd>
                <AdminTd>{group.sortOrder}</AdminTd>
                <AdminTd>{group.showInMegaMenu ? "Visible" : "Hidden"}</AdminTd>
                <AdminTd>
                  <StatusBadge status={group.status} />
                </AdminTd>
                <AdminTd>
                  {group.updatedAt ? new Date(group.updatedAt).toLocaleDateString() : "—"}
                </AdminTd>
                <AdminTd>
                  <div className="flex flex-wrap gap-1">
                    <MoveGroupButton id={group.id} direction="earlier" />
                    <MoveGroupButton id={group.id} direction="later" />
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/service-groups/${group.id}`}>Edit</Link>
                    </Button>
                  </div>
                </AdminTd>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
      <AdminPagination
        page={result.page}
        pageCount={result.pageCount}
        hrefFor={(next) =>
          `?${new URLSearchParams({
            ...(q ? { q } : {}),
            ...(status ? { status } : {}),
            ...(menu ? { menu } : {}),
            page: String(next),
          }).toString()}`
        }
      />
    </>
  );
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
