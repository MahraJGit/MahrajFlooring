import { draftMode, headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { getPayloadClient } from "@/lib/payload/client";

/**
 * Entry point for the admin panel's Preview button. Verifies the Payload
 * session before enabling Next.js draft mode, so unpublished content stays
 * private.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path || !path.startsWith("/")) {
    return new Response("Invalid preview path", { status: 400 });
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await nextHeaders() });

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
