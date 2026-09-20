import { toId } from "@/lib/db/ids";
import { getModels } from "@/lib/db/models";

export type MediaListItem = {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number | null;
  height: number | null;
  url: string;
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listMedia(query?: string): Promise<MediaListItem[]> {
  const { Media } = await getModels();
  const filter = query?.trim()
    ? {
        $or: [
          { alt: { $regex: escapeRegex(query.trim()), $options: "i" } },
          { filename: { $regex: escapeRegex(query.trim()), $options: "i" } },
        ],
      }
    : {};

  const docs = await Media.find(filter)
    .sort({ createdAt: -1 })
    .select("alt filename mimeType filesize width height url")
    .limit(80)
    .lean();

  return docs.map((doc) => ({
    id: toId(doc._id),
    alt: String(doc.alt ?? ""),
    filename: String(doc.filename ?? ""),
    mimeType: String(doc.mimeType ?? ""),
    filesize: Number(doc.filesize ?? 0),
    width: typeof doc.width === "number" ? doc.width : null,
    height: typeof doc.height === "number" ? doc.height : null,
    url: String(doc.url ?? ""),
  }));
}

export async function getMedia(id: string): Promise<MediaListItem | null> {
  const { Media } = await getModels();
  const doc = await Media.findById(id)
    .select("alt filename mimeType filesize width height url")
    .lean();
  if (!doc) return null;
  return {
    id: toId(doc._id),
    alt: String(doc.alt ?? ""),
    filename: String(doc.filename ?? ""),
    mimeType: String(doc.mimeType ?? ""),
    filesize: Number(doc.filesize ?? 0),
    width: typeof doc.width === "number" ? doc.width : null,
    height: typeof doc.height === "number" ? doc.height : null,
    url: String(doc.url ?? ""),
  };
}
