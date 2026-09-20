import { AdminPageHeader, AdminTable, AdminTd, AdminTh, EmptyState } from "@/components/admin/page-chrome";
import { requireUser } from "@/actions/auth";
import { listMedia } from "@/lib/media/queries";

function formatBytes(value: number) {
  if (!value) return "—";
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function MediaPage() {
  await requireUser();
  const items = await listMedia();

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Existing S3 media records. Public URLs stay /api/media/file/{filename}."
      />
      {items.length === 0 ? (
        <EmptyState
          title="No media yet"
          body="Uploaded images will appear here with alt text, size, and dimensions."
        />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <AdminTh>File</AdminTh>
              <AdminTh>Alt text</AdminTh>
              <AdminTh>Type</AdminTh>
              <AdminTh>Size</AdminTh>
              <AdminTh>Dimensions</AdminTh>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/40">
                <AdminTd>
                  <p className="font-medium">{item.filename || item.id}</p>
                  {item.url ? (
                    <p className="max-w-xs truncate text-xs text-muted-foreground">
                      {item.url}
                    </p>
                  ) : null}
                </AdminTd>
                <AdminTd>{item.alt || "—"}</AdminTd>
                <AdminTd>{item.mimeType || "—"}</AdminTd>
                <AdminTd>{formatBytes(item.filesize)}</AdminTd>
                <AdminTd>
                  {item.width && item.height ? `${item.width}×${item.height}` : "—"}
                </AdminTd>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </>
  );
}
