import { site } from "@/content/site";

export function documentTitle(seoTitle: string | undefined | null, fallback: string) {
  const custom = seoTitle?.trim();
  if (custom) return { absolute: custom };
  const name = fallback.trim() || site.name;
  return { absolute: `${name} | ${site.name}` };
}
