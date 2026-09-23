import Link from "next/link";
import { Plus } from "lucide-react";

import { SavedBanner } from "@/components/admin/field";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-chrome";
import { ServiceGroupActions } from "@/components/admin/service-group-actions";
import { ServiceGroupFilters } from "@/components/admin/service-group-filters";
import { StatusBadge } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireUser } from "@/actions/auth";
import { listServiceGroups } from "@/lib/services/queries";
import { cn } from "@/lib/utils";

const headClass =
  "h-11 bg-muted/60 px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground";

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
  const statusFilter = status === "draft" || status === "published" ? status : "all";
  const menuFilter = menu === "visible" || menu === "hidden" ? menu : "all";

  const result = await listServiceGroups({
    q,
    status: statusFilter,
    menu: menuFilter,
    page,
    limit: 50,
  });

  const filtered = Boolean(q || status || menu);
  const query = { q, status: statusFilter, menu: menuFilter };

  return (
    <>
      <AdminPageHeader
        title="Service groups"
        description="Mega-menu columns. Published groups with services appear on the services page."
        action={
          <Button asChild>
            <Link href="/admin/service-groups/new">
              <Plus />
              New group
            </Link>
          </Button>
        }
      />
      <SavedBanner value={saved} />
      <div className="mb-4">
        <ServiceGroupFilters
          key={[q, status, menu].join("|")}
          q={q}
          status={statusFilter}
          menu={menuFilter}
          filtered={filtered}
        />
      </div>

      {result.items.length === 0 ? (
        <EmptyState
          title={filtered ? "No service groups match" : "No service groups yet"}
          body={
            filtered
              ? "Try another filter, or clear them to see every group."
              : "Create the first group, then add services under it."
          }
          action={
            filtered ? (
              <Button asChild variant="outline">
                <Link href="/admin/service-groups">Clear filters</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/admin/service-groups/new">
                  <Plus />
                  New group
                </Link>
              </Button>
            )
          }
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                {result.total === 1 ? "1 group" : `${result.total} groups`}
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className={headClass}>Group</TableHead>
                  <TableHead className={cn(headClass, "hidden sm:table-cell")}>Services</TableHead>
                  <TableHead className={cn(headClass, "hidden md:table-cell")}>Menu</TableHead>
                  <TableHead className={headClass}>Status</TableHead>
                  <TableHead className={cn(headClass, "hidden lg:table-cell")}>Position</TableHead>
                  <TableHead className={cn(headClass, "hidden lg:table-cell")}>Updated</TableHead>
                  <TableHead className={cn(headClass, "text-end")}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.items.map((group) => {
                  const draft = group.status === "draft";
                  return (
                    <TableRow
                      key={group.id}
                      className={cn(
                        draft &&
                          "bg-amber-50/80 hover:bg-amber-50 dark:bg-amber-950/20 dark:hover:bg-amber-950/30"
                      )}
                    >
                      <TableCell className="px-4 py-3 whitespace-normal">
                        <div className="min-w-40">
                          <Link
                            href={`/admin/service-groups/${group.id}`}
                            className="line-clamp-2 font-medium text-ink hover:text-brand"
                          >
                            {group.title}
                          </Link>
                          <p className="truncate text-xs text-muted-foreground">
                            {group.slug
                              ? `/services#service-group-${group.slug}`
                              : "No public URL yet"}
                          </p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {group.serviceCount === 1
                              ? "1 service"
                              : `${group.serviceCount} services`}
                            <span className="md:hidden">
                              {" "}
                              · {group.showInMegaMenu ? "In menu" : "Hidden"}
                            </span>
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 sm:table-cell">
                        <Badge variant="muted" className="normal-case tracking-normal">
                          {group.serviceCount === 1 ? "1 service" : `${group.serviceCount} services`}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 md:table-cell">
                        <Badge
                          variant={group.showInMegaMenu ? "published" : "muted"}
                          className="normal-case tracking-normal"
                        >
                          {group.showInMegaMenu ? "In menu" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-normal">
                        <div className="flex flex-col items-start gap-1">
                          <StatusBadge status={group.status} />
                          <span className="text-xs text-muted-foreground">
                            {draft ? "Hidden from the website" : "On the website"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 lg:table-cell">
                        {group.sortOrder}
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 lg:table-cell">
                        {formatDate(group.updatedAt)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-end">
                        <ServiceGroupActions
                          id={group.id}
                          title={group.title}
                          slug={group.slug}
                          status={group.status}
                          serviceCount={group.serviceCount}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <GroupPagination
            page={result.page}
            pageCount={result.pageCount}
            hrefFor={(next) => listingHref(query, { page: String(next) })}
          />
        </>
      )}
    </>
  );
}

function GroupPagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  const pages = pageWindow(page, pageCount);

  return (
    <nav
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Pagination"
    >
      <p className="text-sm text-muted-foreground">
        Page {page} of {pageCount}
      </p>
      <div className="flex flex-wrap gap-1">
        {page > 1 ? (
          <Button asChild variant="outline" size="sm">
            <Link href={hrefFor(page - 1)}>Previous</Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" size="sm" disabled>
            Previous
          </Button>
        )}
        {pages.map((next) => (
          <Button key={next} asChild variant={next === page ? "default" : "outline"} size="sm">
            <Link href={hrefFor(next)} aria-current={next === page ? "page" : undefined}>
              {next}
            </Link>
          </Button>
        ))}
        {page < pageCount ? (
          <Button asChild variant="outline" size="sm">
            <Link href={hrefFor(page + 1)}>Next</Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" size="sm" disabled>
            Next
          </Button>
        )}
      </div>
    </nav>
  );
}

function pageWindow(page: number, pageCount: number) {
  const width = 5;
  const start = Math.max(1, Math.min(page - 2, pageCount - width + 1));
  const end = Math.min(pageCount, start + width - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function listingHref(
  current: { q?: string; status?: string; menu?: string },
  patch: { page?: string }
) {
  const params = new URLSearchParams();
  if (current.q) params.set("q", current.q);
  if (current.status === "draft" || current.status === "published") {
    params.set("status", current.status);
  }
  if (current.menu === "visible" || current.menu === "hidden") {
    params.set("menu", current.menu);
  }
  if (patch.page && patch.page !== "1") params.set("page", patch.page);
  const qs = params.toString();
  return qs ? `/admin/service-groups?${qs}` : "/admin/service-groups";
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
