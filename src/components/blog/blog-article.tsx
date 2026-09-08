import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { buildHeadingIds } from "@/lib/payload/rich-text";

export function BlogArticleBody({ data }: { data: SerializedEditorState }) {
  // Keyed by node identity so anchors match the sidebar exactly, even when two
  // headings share the same text.
  const headingIds = buildHeadingIds(data as never);

  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag;
      return (
        <Tag id={headingIds.get(node)} className="scroll-mt-28">
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      );
    },
  });

  return (
    <div
      className={[
        "max-w-none text-base leading-relaxed text-body",
        "[&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink",
        "[&_h3]:mt-9 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_h2+p]:mt-3 [&_h3+p]:mt-3",
        "[&_p]:mt-5 [&_p]:max-w-[68ch]",
        "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-6",
        "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:ps-6",
        "[&_li]:marker:text-brand [&_li]:ps-1",
        "[&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-dark",
        "[&_blockquote]:mt-7 [&_blockquote]:rounded-md [&_blockquote]:bg-surface-alt",
        "[&_blockquote]:border-s-4 [&_blockquote]:border-brand [&_blockquote]:px-5 [&_blockquote]:py-4",
        "[&_blockquote]:text-ink [&_blockquote]:italic",
        "[&_img]:mt-7 [&_img]:rounded-md",
        "[&_hr]:my-10 [&_hr]:border-border",
        "[&_strong]:font-semibold [&_strong]:text-ink",
      ].join(" ")}
    >
      <RichText data={data} converters={converters} disableContainer />
    </div>
  );
}
