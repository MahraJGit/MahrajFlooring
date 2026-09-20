import { toId } from "@/lib/db/ids";
import { getModels } from "@/lib/db/models";
import type { UserRole } from "@/lib/cms/types";

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export async function listUsers(): Promise<UserListItem[]> {
  const { User } = await getModels();
  const docs = await User.find()
    .sort({ createdAt: 1 })
    .select("name email role")
    .lean();

  return docs.map((doc) => ({
    id: toId(doc._id),
    name: String(doc.name ?? ""),
    email: String(doc.email ?? ""),
    role: doc.role === "admin" ? "admin" : "editor",
  }));
}
