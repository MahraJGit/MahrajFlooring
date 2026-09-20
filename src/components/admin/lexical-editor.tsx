"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Trash2,
  Underline,
} from "lucide-react";

import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import {
  blocksToLexical,
  emptyParagraph,
  htmlToSpans,
  lexicalToBlocks,
  newBlockId,
  spansToHtml,
  spansToPlainText,
  type EditorBlock,
  type InlineMedia,
  type InlineSpan,
} from "@/lib/cms/lexical";
import { cn } from "@/lib/utils";

const BLOCK_TYPES = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading-2", label: "Heading" },
  { value: "heading-3", label: "Subheading" },
  { value: "list", label: "Bulleted list" },
  { value: "ordered", label: "Numbered list" },
  { value: "quote", label: "Quote" },
  { value: "code", label: "Code" },
  { value: "hr", label: "Divider" },
] as const;

export function LexicalEditor({
  value,
  mediaById,
  onChange,
  error,
}: {
  value: unknown;
  mediaById?: Record<string, InlineMedia>;
  onChange: (next: unknown) => void;
  error?: string;
}) {
  const [blocks, setBlocks] = useState<EditorBlock[]>(() =>
    lexicalToBlocks(value, mediaById)
  );
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const skipEmit = useRef(true);

  useEffect(() => {
    if (skipEmit.current) {
      skipEmit.current = false;
      return;
    }
    onChange(blocksToLexical(blocks));
    // Parent handlers are recreated each render; serialize only after local edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  function updateBlocks(next: EditorBlock[]) {
    setBlocks(next.length > 0 ? next : [emptyParagraph()]);
  }

  function replace(id: string, next: EditorBlock) {
    updateBlocks(blocks.map((block) => (block.id === id ? next : block)));
  }

  function remove(id: string) {
    updateBlocks(blocks.filter((block) => block.id !== id));
  }

  function insert(afterId: string | null, block: EditorBlock) {
    if (!afterId) {
      updateBlocks([...blocks, block]);
      return;
    }
    const index = blocks.findIndex((item) => item.id === afterId);
    const next = [...blocks];
    next.splice(index + 1, 0, block);
    updateBlocks(next);
  }

  function convert(id: string, kind: string) {
    const current = blocks.find((block) => block.id === id);
    if (!current) return;
    const spans =
      "spans" in current
        ? current.spans
        : current.type === "list"
          ? current.items[0] ?? [{ text: "" }]
          : current.type === "code"
            ? [{ text: current.text }]
            : [{ text: "" }];
    const text = spansToPlainText(spans);

    let next: EditorBlock = emptyParagraph();
    if (kind === "heading-2") next = { id, type: "heading", level: 2, spans };
    else if (kind === "heading-3") next = { id, type: "heading", level: 3, spans };
    else if (kind === "list") next = { id, type: "list", ordered: false, items: [spans] };
    else if (kind === "ordered") next = { id, type: "list", ordered: true, items: [spans] };
    else if (kind === "quote") next = { id, type: "quote", spans };
    else if (kind === "code") next = { id, type: "code", text };
    else if (kind === "hr") next = { id, type: "hr" };
    else next = { id, type: "paragraph", spans };

    replace(id, next);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/40 p-2">
        <ToolbarButton
          icon={Heading2}
          label="Heading"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "heading", level: 2, spans: [{ text: "" }] })}
        />
        <ToolbarButton
          icon={Heading3}
          label="Subheading"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "heading", level: 3, spans: [{ text: "" }] })}
        />
        <ToolbarButton
          icon={List}
          label="Bulleted list"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "list", ordered: false, items: [[{ text: "" }]] })}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered list"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "list", ordered: true, items: [[{ text: "" }]] })}
        />
        <ToolbarButton
          icon={Quote}
          label="Quote"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "quote", spans: [{ text: "" }] })}
        />
        <ToolbarButton
          icon={Code}
          label="Code"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "code", text: "" })}
        />
        <ToolbarButton
          icon={Minus}
          label="Divider"
          onClick={() => insert(blocks.at(-1)?.id ?? null, { id: newBlockId(), type: "hr" })}
        />
        <ToolbarButton
          icon={ImagePlus}
          label="Image"
          onClick={() => {
            const block = { id: newBlockId(), type: "image" as const, mediaId: "" };
            insert(blocks.at(-1)?.id ?? null, block);
            setPickerFor(block.id);
          }}
        />
        <ToolbarButton
          icon={Plus}
          label="Paragraph"
          onClick={() => insert(blocks.at(-1)?.id ?? null, emptyParagraph())}
        />
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-white p-3 sm:p-4">
        {blocks.map((block) => (
          <BlockCard
            key={block.id}
            block={block}
            pickerOpen={pickerFor === block.id}
            onPickerOpen={() => setPickerFor(block.id)}
            onPickerClose={() => setPickerFor(null)}
            onChange={(next) => replace(block.id, next)}
            onConvert={(kind) => convert(block.id, kind)}
            onRemove={() => remove(block.id)}
            onInsertAfter={() => insert(block.id, emptyParagraph())}
          />
        ))}
      </div>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Content is stored in the same format the public blog already uses.
        </p>
      )}
    </div>
  );
}

function BlockCard({
  block,
  pickerOpen,
  onPickerOpen,
  onPickerClose,
  onChange,
  onConvert,
  onRemove,
  onInsertAfter,
}: {
  block: EditorBlock;
  pickerOpen: boolean;
  onPickerOpen: () => void;
  onPickerClose: () => void;
  onChange: (next: EditorBlock) => void;
  onConvert: (kind: string) => void;
  onRemove: () => void;
  onInsertAfter: () => void;
}) {
  return (
    <div className="rounded-lg border border-transparent p-2 hover:border-border hover:bg-muted/20">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {block.type !== "raw" && block.type !== "image" && block.type !== "hr" ? (
          <select
            className="h-8 rounded-md border border-input bg-transparent px-2 text-xs"
            value={
              block.type === "heading"
                ? `heading-${block.level}`
                : block.type === "list"
                  ? block.ordered
                    ? "ordered"
                    : "list"
                  : block.type
            }
            onChange={(event) => onConvert(event.target.value)}
          >
            {BLOCK_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {block.type === "raw"
              ? `Preserved ${String(block.node.type ?? "block")}`
              : block.type === "hr"
                ? "Divider"
                : "Image"}
          </span>
        )}
        <InlineToolbar />
        <div className="ml-auto flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={onInsertAfter}>
            Add
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove} aria-label="Remove block">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {block.type === "paragraph" || block.type === "heading" || block.type === "quote" ? (
        <RichLine
          className={
            block.type === "heading"
              ? block.level === 2
                ? "font-heading text-2xl font-semibold"
                : "font-heading text-xl font-semibold"
              : block.type === "quote"
                ? "border-s-4 border-brand bg-surface-alt px-4 py-3 italic"
                : "text-base leading-relaxed"
          }
          spans={block.spans}
          onChange={(spans) => onChange({ ...block, spans })}
        />
      ) : null}

      {block.type === "list" ? (
        <div className="space-y-2">
          {block.items.map((item, index) => (
            <div key={`${block.id}-${index}`} className="flex gap-2">
              <span className="mt-2 w-5 text-sm text-muted-foreground">
                {block.ordered ? `${index + 1}.` : "•"}
              </span>
              <RichLine
                className="flex-1"
                spans={item}
                onChange={(spans) => {
                  const items = block.items.map((current, itemIndex) =>
                    itemIndex === index ? spans : current
                  );
                  onChange({ ...block, items });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  onChange({
                    ...block,
                    items: block.items.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange({ ...block, items: [...block.items, [{ text: "" }]] })}
          >
            Add item
          </Button>
        </div>
      ) : null}

      {block.type === "code" ? (
        <textarea
          className="min-h-28 w-full rounded-md border border-input bg-muted/40 p-3 font-mono text-sm"
          value={block.text}
          onChange={(event) => onChange({ ...block, text: event.target.value })}
        />
      ) : null}

      {block.type === "hr" ? <hr className="my-4 border-border" /> : null}

      {block.type === "image" ? (
        <div>
          {pickerOpen || !block.mediaId ? (
            <MediaPicker
              label="Article image"
              value={block.mediaId}
              previewUrl={block.url}
              previewAlt={block.alt}
              previewFilename={block.filename}
              previewWidth={block.width}
              previewHeight={block.height}
              onChange={(next) => {
                onChange({
                  ...block,
                  mediaId: next.id,
                  url: next.url,
                  alt: next.alt,
                  filename: next.filename,
                  width: next.width ?? null,
                  height: next.height ?? null,
                });
                if (next.id) onPickerClose();
              }}
            />
          ) : (
            <button type="button" className="block w-full text-left" onClick={onPickerOpen}>
              {block.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={block.url}
                  alt={block.alt || ""}
                  className="max-h-72 rounded-md object-cover"
                />
              ) : (
                <p className="text-sm text-muted-foreground">Image selected. Click to replace.</p>
              )}
            </button>
          )}
        </div>
      ) : null}

      {block.type === "raw" ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-950">
          This block is kept exactly as it appears on the live article so existing
          formatting is not rewritten.
        </p>
      ) : null}
    </div>
  );
}

function RichLine({
  spans,
  onChange,
  className,
}: {
  spans: InlineSpan[];
  onChange: (spans: InlineSpan[]) => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const html = spansToHtml(spans);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== html && document.activeElement !== ref.current) {
      ref.current.innerHTML = html || "<br>";
    }
  }, [html]);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={cn(
        "min-h-10 rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      onInput={() => {
        if (!ref.current) return;
        onChange(htmlToSpans(ref.current.innerHTML));
      }}
      onBlur={() => {
        if (!ref.current) return;
        onChange(htmlToSpans(ref.current.innerHTML));
      }}
    />
  );
}

function InlineToolbar() {
  return (
    <div className="flex gap-0.5">
      <MarkButton icon={Bold} label="Bold" command="bold" />
      <MarkButton icon={Italic} label="Italic" command="italic" />
      <MarkButton icon={Underline} label="Underline" command="underline" />
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-ink"
        aria-label="Link"
        onClick={() => {
          const href = window.prompt("Link URL");
          if (!href) return;
          document.execCommand("createLink", false, href);
        }}
      >
        <Link2 className="size-3.5" />
      </button>
    </div>
  );
}

function MarkButton({
  icon: Icon,
  label,
  command,
}: {
  icon: typeof Bold;
  label: string;
  command: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-ink"
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault();
        document.execCommand(command);
      }}
    >
      <Icon className="size-3.5" />
    </button>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Bold;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick}>
      <Icon className="mr-1.5 size-3.5" />
      {label}
    </Button>
  );
}
