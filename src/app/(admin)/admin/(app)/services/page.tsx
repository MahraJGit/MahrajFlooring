import Link from "next/link";

import { MoveServiceButton } from "@/components/admin/move-buttons";
import { SavedBanner } from "@/components/admin/field";
import { AdminPageHeader, AdminPagination, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireUser } from "@/actions/auth";
import { listGroupOptions, listServices } from "@/lib/services/queries";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser();
  const params = await searchParams;
  const q = first(params.q);
  const status = first(params.status);
  const group = first(params.group);
  const ready = first(params.ready);
  const sort = first(params.sort);
  const page = Number(first(params.page) ?? "1") || 1;
  const saved = first(params.saved);

  const [result, groups] = await Promise.all([
    listServices({
      q,
      status: status === "draft" || status === "published" ? status : "all",
      group,
      ready: ready === "ready" || ready === "soon" ? ready : "all",
      sort: sort === "name" || sort === "updated" ? sort : "position",
      page,
      limit: 25,
    }),
    listGroupOptions(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Public pages at /services/[slug]. Coming Soon pages stay at the same URL until the full page is ready."
        action={
          <Button asChild>
            <Link href="/admin/services/new">New service</Link>
          </Button>
        }
      />
      <SavedBanner value={saved} />
      <form className="mb-4 flex flex-wrap gap-2" method="get">
        <Input name="q" defaultValue={q} placeholder="Search services" className="h-9 w-56" />
        <select name="group" defaultValue={group ?? ""} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="">All groups</option>
          {groups.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select name="ready" defaultValue={ready ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All page types</option>
          <option value="ready">Full page</option>
          <option value="soon">Coming Soon</option>
        </select>
        <select name="sort" defaultValue={sort ?? "position"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="position">Sort by menu position</option>
          <option value="name">Sort by name</option>
          <option value="updated">Sort by updated</option>
        </select>
        <Button type="submit" variant="outline">
          Filter
        </Button>
        {q || status || group || ready || (sort && sort !== "position") ? (
          <Button asChild variant="ghost">
            <Link href="/admin/services">Clear</Link>
          </Button>
        ) : null}
      </form>

      {result.items.length === 0 ? (
        <EmptyState
          title={q || status || group || ready ? "No services match" : "No services yet"}
          body={
            q || status || group || ready
              ? "Try another filter or create a service under a group."
              : "Create a service group first, then add services under it."
          }
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Name</AdminTh>
              <AdminTh>Group</AdminTh>
              <AdminTh>Slug</AdminTh>
              <AdminTh>Page</AdminTh>
              <AdminTh>Status</AdminTh>
              <AdminTh>Updated</AdminTh>
              <AdminTh>Actions</AdminTh>
            </tr>
          </thead>
          <tbody>
            {result.items.map((service) => (
              <tr key={service.id} className="hover:bg-muted/40">
                <AdminTd>
                  <Link href={`/admin/services/${service.id}`} className="font-medium hover:text-brand">
                    {service.title}
                  </Link>
                </AdminTd>
                <AdminTd>{service.parentTitle}</AdminTd>
                <AdminTd>
                  <span className="text-xs text-muted-foreground">{service.slug}</span>
                </AdminTd>
                <AdminTd>{service.detailReady ? "Full page" : "Coming Soon"}</AdminTd>
                <AdminTd>
                  <StatusBadge status={service.status} />
                </AdminTd>
                <AdminTd>
                  {service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : "—"}
                </AdminTd>
                <AdminTd>
                  <div className="flex flex-wrap gap-1">
                    <MoveServiceButton id={service.id} direction="earlier" />
                    <MoveServiceButton id={service.id} direction="later" />
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/services/${service.id}`}>Edit</Link>
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
            ...(group ? { group } : {}),
            ...(ready ? { ready } : {}),
            ...(sort ? { sort } : {}),
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
