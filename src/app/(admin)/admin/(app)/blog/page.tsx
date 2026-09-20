import Link from "next/link";

import { SavedBanner } from "@/components/admin/field";
import { AdminPageHeader, AdminPagination, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireUser } from "@/actions/auth";
import { listCategoryOptions, listPosts } from "@/lib/blog/queries";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser();
  const params = await searchParams;
  const q = first(params.q);
  const status = first(params.status);
  const category = first(params.category);
  const featured = first(params.featured);
  const sort = first(params.sort);
  const page = Number(first(params.page) ?? "1") || 1;
  const saved = first(params.saved);

  const [result, categories] = await Promise.all([
    listPosts({
      q,
      status: status === "draft" || status === "published" ? status : "all",
      category,
      featured: featured === "featured" || featured === "standard" ? featured : "all",
      sort: sort === "title" || sort === "updated" ? sort : "published",
      page,
      limit: 25,
    }),
    listCategoryOptions(),
  ]);

  const filtered = Boolean(q || status || category || featured || (sort && sort !== "published"));

  return (
    <>
      <AdminPageHeader
        title="Blog"
        description="Public articles live at /blog/[slug]. Drafts stay off the website until you publish them."
        action={
          <Button asChild>
            <Link href="/admin/blog/new">New post</Link>
          </Button>
        }
      />
      <SavedBanner value={saved} />
      <form className="mb-4 flex flex-wrap gap-2" method="get">
        <Input name="q" defaultValue={q} placeholder="Search posts" className="h-9 w-56" />
        <select name="status" defaultValue={status ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select name="category" defaultValue={category ?? ""} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <select name="featured" defaultValue={featured ?? "all"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="all">All posts</option>
          <option value="featured">Featured</option>
          <option value="standard">Not featured</option>
        </select>
        <select name="sort" defaultValue={sort ?? "published"} className="h-9 rounded-lg border border-input bg-transparent px-2 text-sm">
          <option value="published">Sort by published date</option>
          <option value="updated">Sort by updated</option>
          <option value="title">Sort by title</option>
        </select>
        <Button type="submit" variant="outline">
          Filter
        </Button>
        {filtered ? (
          <Button asChild variant="ghost">
            <Link href="/admin/blog">Clear</Link>
          </Button>
        ) : null}
      </form>

      {result.items.length === 0 ? (
        <EmptyState
          title={filtered ? "No posts match" : "No blog posts yet"}
          body={
            filtered
              ? "Try another filter or create a new post."
              : "Drafts stay private. Published posts appear on the website blog."
          }
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Title</AdminTh>
              <AdminTh>Status</AdminTh>
              <AdminTh>Category</AdminTh>
              <AdminTh>Author</AdminTh>
              <AdminTh>Published</AdminTh>
              <AdminTh>Featured</AdminTh>
              <AdminTh>Updated</AdminTh>
              <AdminTh>Actions</AdminTh>
            </tr>
          </thead>
          <tbody>
            {result.items.map((post) => (
              <tr key={post.id} className="hover:bg-muted/40">
                <AdminTd>
                  <div className="flex items-center gap-3">
                    {post.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverUrl}
                        alt=""
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <span className="size-10 rounded-md bg-muted" />
                    )}
                    <div>
                      <Link href={`/admin/blog/${post.id}`} className="font-medium hover:text-brand">
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <StatusBadge status={post.status} />
                </AdminTd>
                <AdminTd>{post.categoryTitle}</AdminTd>
                <AdminTd>{post.author || "—"}</AdminTd>
                <AdminTd>{post.publishedAt || "—"}</AdminTd>
                <AdminTd>{post.featured ? "Featured" : "—"}</AdminTd>
                <AdminTd>
                  {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : "—"}
                </AdminTd>
                <AdminTd>
                  <div className="flex flex-wrap gap-1">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                    </Button>
                    {post.status === "published" ? (
                      <Button asChild variant="ghost" size="sm">
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                          View live
                        </a>
                      </Button>
                    ) : null}
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
            ...(category ? { category } : {}),
            ...(featured ? { featured } : {}),
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
