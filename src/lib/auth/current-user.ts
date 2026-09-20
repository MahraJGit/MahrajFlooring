import { toId } from "@/lib/db/ids";
import { getModels } from "@/lib/db/models";
import { readSession } from "@/lib/auth/session";
import type { AdminUser, UserRole } from "@/lib/cms/types";

export async function getCurrentUser(): Promise<AdminUser | null> {
  const session = await readSession();
  if (!session) return null;

  const { User } = await getModels();
  const doc = await User.findById(session.userId)
    .select("name email role")
    .lean();

  if (!doc) return null;

  const role = doc.role === "admin" ? "admin" : "editor";

  return {
    id: toId(doc._id),
    name: typeof doc.name === "string" ? doc.name : session.name,
    email: typeof doc.email === "string" ? doc.email : session.email,
    role,
  };
}

export function isAdmin(role: UserRole) {
  return role === "admin";
}
