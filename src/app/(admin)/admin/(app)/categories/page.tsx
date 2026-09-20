import Link from "next/link";

import { SavedBanner } from "@/components/admin/field";
import { AdminPageHeader, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/actions/auth";
import { listCategories } from "@/lib/blog/queries";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser();
  const params = await searchParams;
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved;
  const categories = await listCategories();

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description="Blog topics used for filters and Explore by topic. Posts keep their existing category relationship."
        action={
          <Button asChild>
            <Link href="/admin/categories/new">New category</Link>
          </Button>
        }
      />
      <SavedBanner value={saved} />
      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          body="Create a category before publishing a blog post."
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>Name</AdminTh>
              <AdminTh>Slug</AdminTh>
              <AdminTh>Subtitle</AdminTh>
              <AdminTh>Posts</AdminTh>
              <AdminTh>Actions</AdminTh>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-muted/40">
                <AdminTd>
                  <div className="flex items-center gap-3">
                    {category.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.imageUrl}
                        alt=""
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <span className="size-10 rounded-md bg-muted" />
                    )}
                    <Link href={`/admin/categories/${category.id}`} className="font-medium hover:text-brand">
                      {category.title}
                    </Link>
                  </div>
                </AdminTd>
                <AdminTd>{category.slug}</AdminTd>
                <AdminTd>{category.subtitle || "—"}</AdminTd>
                <AdminTd>{category.postCount}</AdminTd>
                <AdminTd>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                  </Button>
                </AdminTd>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </>
  );
}
