type Block = { heading: string } | { paragraph: string };

function textNode(text: string) {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

/**
 * Minimal Lexical document builder so seeded posts arrive with real body copy
 * that the admin editor can open and edit normally.
 */
export function richText(blocks: Block[]) {
  return {
    root: {
      type: "root",
      children: blocks.map((block) =>
        "heading" in block
          ? {
              type: "heading",
              tag: "h2",
              children: [textNode(block.heading)],
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              version: 1,
            }
          : {
              type: "paragraph",
              children: [textNode(block.paragraph)],
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              textFormat: 0,
              version: 1,
            }
      ),
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}
