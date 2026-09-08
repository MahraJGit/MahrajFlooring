import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Clears a stale Next.js draft-mode cookie left over from an admin preview
 * session, then sends the visitor back to the page they were reading.
 */
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  const target = searchParams.get("redirect") || "/blog";

  redirect(target.startsWith("/") ? target : "/blog");
}
