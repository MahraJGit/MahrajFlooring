const ALLOWED = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "a",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "img",
  "span",
  "div",
  "blockquote",
  "hr",
]);

const VOID = new Set(["br", "img", "hr", "col"]);

function cleanAttributes(tag: string, raw: string) {
  const kept: string[] = [];
  const pattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw))) {
    const name = match[1].toLowerCase();
    const value = (match[3] ?? match[4] ?? match[5] ?? "").trim();
    if (name.startsWith("on")) continue;
    if ((name === "href" || name === "src") && /^javascript:/i.test(value)) continue;
    if (tag === "a" && name === "href" && value) {
      kept.push(`href="${escapeAttr(value)}"`);
      kept.push('rel="noopener noreferrer"');
    } else if (tag === "img" && (name === "src" || name === "alt") && value) {
      kept.push(`${name}="${escapeAttr(value)}"`);
    } else if ((tag === "th" || tag === "td") && (name === "colspan" || name === "rowspan")) {
      if (/^\d{1,2}$/.test(value)) kept.push(`${name}="${value}"`);
    } else if (name === "class" && tag !== "table") {
      kept.push(`class="${escapeAttr(value)}"`);
    }
  }
  return kept.length ? ` ${kept.join(" ")}` : "";
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function tableClass(raw: string) {
  const match = /class\s*=\s*("([^"]*)"|'([^']*)')/i.exec(raw);
  const current = match?.[2] ?? match?.[3] ?? "";
  const classes = current.split(/\s+/).filter(Boolean);
  if (!classes.includes("blog-table")) classes.unshift("blog-table");
  const withoutClass = raw.replace(/\sclass\s*=\s*("([^"]*)"|'([^']*)')/i, "");
  return ` class="${escapeAttr(classes.join(" "))}"${cleanAttributes("table", withoutClass)}`;
}

/** Keeps table markup for blog articles and always applies the shared table class. */
export function sanitizeBlogHtml(input: string) {
  let html = input.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(
    /<\s*(script|style|iframe|object|embed|form|link|meta)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
    ""
  );
  html = html.replace(/<\s*(script|style|iframe|object|embed|form|link|meta)\b[^>]*\/?\s*>/gi, "");

  return html.replace(/<\/?\s*([a-zA-Z0-9]+)([^>]*)>/g, (full, tag: string, attrs: string) => {
    const name = tag.toLowerCase();
    if (!ALLOWED.has(name)) return "";
    const closing = full.startsWith("</");
    if (closing) return VOID.has(name) ? "" : `</${name}>`;
    if (name === "table") return `<table${tableClass(attrs)}>`;
    const selfClosing = VOID.has(name) || /\s*\/\s*$/.test(attrs);
    return `<${name}${cleanAttributes(name, attrs)}${selfClosing ? " /" : ""}>`;
  });
}

export function htmlToPlainText(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
