import type { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) =>
  user?.role === "admin";

export const isEditor: Access = ({ req: { user } }) =>
  user?.role === "admin" || user?.role === "editor";

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.id === id;
};

/**
 * Anonymous visitors only ever see published documents. Signed-in staff see
 * drafts too, which is what powers the admin list views and live preview.
 */
export const publishedOrSignedIn: Access = ({ req: { user } }) => {
  if (user) return true;
  return {
    _status: {
      equals: "published",
    },
  };
};

export const anyone: Access = () => true;
