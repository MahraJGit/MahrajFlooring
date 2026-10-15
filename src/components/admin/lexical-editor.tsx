"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Table,
  Type,
  Underline,
  Undo2,
} from "lucide-react";

import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  blocksToLexical,
  escapeHtml,
  htmlToSpans,
  lexicalToBlocks,
  newBlockId,
  spansToHtml,
  type EditorBlock,
  type HeadingLevel,
  type InlineMedia,
  type InlineSpan,
} from "@/lib/cms/lexical";
import { cn } from "@/lib/utils";

export const BLOG_IMAGE_SIZE = { width: 1920, height: 1080 };

type IslandBlock = Extract<EditorBlock, { type: "image" | "html" | "raw" }>;
type ImageIsland = Extract<EditorBlock, { type: "image" }>;
type StyleValue = "paragraph" | "h1" | "h2" | "h3" | "h4" | "quote" | "code";
type PickerState = { mode: "insert" } | { mode: "replace"; id: string } | null;
type LinkDraft = { href: string; needsText: boolean; existing: boolean };
type HtmlDraft = { id: string | null; html: string };

type ToolbarState = {
  style: StyleValue;
  list: "bullet" | "number" | null;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  link: boolean;
};

const IDLE_TOOLBAR: ToolbarState = {
  style: "paragraph",
  list: null,
  bold: false,
  italic: false,
  underline: false,
  link: false,
};

const STYLE_OPTIONS: { value: StyleValue; label: string; tag: string }[] = [
  { value: "paragraph", label: "Normal text", tag: "p" },
  { value: "h1", label: "Heading 1", tag: "h1" },
  { value: "h2", label: "Heading 2", tag: "h2" },
  { value: "h3", label: "Heading 3", tag: "h3" },
  { value: "h4", label: "Heading 4", tag: "h4" },
  { value: "quote", label: "Quote", tag: "blockquote" },
  { value: "code", label: "Code block", tag: "pre" },
];

const BLOCK_TAGS = new Set([
  "P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "PRE", "UL", "OL",
  "LI", "TABLE", "FIGURE", "HR", "SECTION", "ARTICLE", "HEADER", "FOOTER",
]);

// Images picked during this session, so their previews survive switching tabs.
const mediaCache = new Map<string, InlineMedia>();

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
  const rootRef = useRef<HTMLDivElement>(null);
  const islands = useRef(new Map<string, IslandBlock>());
  const savedRange = useRef<Range | null>(null);
  const onChangeRef = useRef(onChange);
  const [toolbar, setToolbar] = useState<ToolbarState>(IDLE_TOOLBAR);
  const [stats, setStats] = useState(() => measure(initialBlocks(value, mediaById)));
  const [picker, setPicker] = useState<PickerState>(null);
  const [imageDraft, setImageDraft] = useState<ImageIsland | null>(null);
  const [htmlDraft, setHtmlDraft] = useState<HtmlDraft | null>(null);
  const [linkDraft, setLinkDraft] = useState<LinkDraft | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    islands.current.clear();
    root.innerHTML = initialBlocks(value, mediaById)
      .map((block) => blockToHtml(block, islands.current))
      .join("");
    ensureEdges(root);
    // The document is loaded once; later edits live in the editable DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onSelectionChange() {
      const root = rootRef.current;
      const selection = window.getSelection();
      if (!root || !selection || selection.rangeCount === 0) return;
      if (!root.contains(selection.anchorNode)) return;
      savedRange.current = selection.getRangeAt(0).cloneRange();
      setToolbar((prev) => sameToolbar(prev, readToolbar(root)));
    }
    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  function emit() {
    const root = rootRef.current;
    if (!root) return;
    const blocks = domToBlocks(root, islands.current);
    setStats(measure(blocks));
    onChangeRef.current(blocksToLexical(blocks));
  }

  function refreshToolbar() {
    const root = rootRef.current;
    if (root) setToolbar((prev) => sameToolbar(prev, readToolbar(root)));
  }

  function afterCommand() {
    const root = rootRef.current;
    if (!root) return;
    normalizeRoot(root);
    emit();
    refreshToolbar();
  }

  function restoreSelection() {
    const root = rootRef.current;
    if (!root) return;
    if (document.activeElement !== root) root.focus({ preventScroll: true });
    const range = savedRange.current;
    const selection = window.getSelection();
    if (range && root.contains(range.startContainer)) {
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else if (root.lastChild) {
      placeCaret(root.lastChild, true);
    }
  }

  function currentTop() {
    const root = rootRef.current;
    const selection = window.getSelection();
    if (!root || !selection?.anchorNode) return null;
    return topBlock(root, selection.anchorNode, selection.anchorOffset);
  }

  function run(command: string, value?: string) {
    restoreSelection();
    document.execCommand(command, false, value);
    afterCommand();
  }

  function formatBlock(tag: string) {
    const applied = document.execCommand("formatBlock", false, tag);
    if (!applied) document.execCommand("formatBlock", false, `<${tag}>`);
  }

  function applyStyle(style: StyleValue) {
    restoreSelection();
    const top = currentTop();
    if (top?.nodeName === "UL") document.execCommand("insertUnorderedList");
    if (top?.nodeName === "OL") document.execCommand("insertOrderedList");
    const tag = STYLE_OPTIONS.find((option) => option.value === style)?.tag ?? "p";
    formatBlock(tag);
    afterCommand();
  }

  function applyList(ordered: boolean) {
    restoreSelection();
    const top = currentTop();
    if (top && /^(H[1-6]|BLOCKQUOTE|PRE)$/.test(top.nodeName)) {
      document.execCommand("formatBlock", false, "<p>");
    }
    document.execCommand(ordered ? "insertOrderedList" : "insertUnorderedList");
    afterCommand();
  }

  function insertBlock(html: string) {
    const root = rootRef.current;
    if (!root) return;
    const range = savedRange.current;
    const top = (
      range && root.contains(range.startContainer)
        ? topBlock(root, range.startContainer, range.startOffset)
        : null
    ) as ChildNode | null;
    const template = document.createElement("template");
    template.innerHTML = html;
    const nodes = Array.from(template.content.childNodes);
    if (!top) root.append(...nodes);
    else if (isEmptyParagraph(top)) top.before(...nodes);
    else top.after(...nodes);

    let next = nodes.at(-1)?.nextSibling ?? null;
    if (!next || isIsland(next) || next.nodeName === "HR") {
      const paragraph = newParagraph();
      nodes.at(-1)?.after(paragraph);
      next = paragraph;
    }
    root.focus({ preventScroll: true });
    placeCaret(next, false);
    emit();
  }

  function updateIsland(id: string, next: IslandBlock) {
    const root = rootRef.current;
    islands.current.set(id, next);
    const element = root?.querySelector(`[data-block-id="${CSS.escape(id)}"]`);
    if (element) element.outerHTML = islandHtml(next);
    emit();
  }

  function removeIsland(element: HTMLElement) {
    const root = rootRef.current;
    if (!root) return;
    root.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNode(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("delete");
    if (root.contains(element)) element.remove();
    normalizeRoot(root);
    emit();
  }

  function openLink() {
    const range = savedRange.current;
    const anchor = range ? closestAnchor(range.startContainer) : null;
    setLinkDraft({
      href: anchor?.getAttribute("href") ?? "",
      needsText: Boolean(range?.collapsed) && !anchor,
      existing: Boolean(anchor),
    });
  }

  function applyLink(href: string, text: string) {
    setLinkDraft(null);
    restoreSelection();
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const anchor = range ? closestAnchor(range.startContainer) : null;
    if (anchor && range?.collapsed) {
      const whole = document.createRange();
      whole.selectNodeContents(anchor);
      selection?.removeAllRanges();
      selection?.addRange(whole);
    }
    if (!href) {
      document.execCommand("unlink");
    } else if (selection && !selection.isCollapsed) {
      document.execCommand("createLink", false, href);
    } else {
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${escapeHtml(href)}">${escapeHtml(text || href)}</a>&nbsp;`
      );
    }
    afterCommand();
  }

  function handlePick(media: {
    id: string;
    url: string;
    alt: string;
    filename?: string;
    width?: number | null;
    height?: number | null;
  }) {
    const target = picker;
    setPicker(null);
    if (!media.id) return;
    const details: InlineMedia = {
      url: media.url,
      alt: media.alt,
      filename: media.filename ?? "",
      width: media.width ?? null,
      height: media.height ?? null,
    };
    mediaCache.set(media.id, details);

    if (target?.mode === "replace") {
      const current = islands.current.get(target.id);
      if (current?.type === "image") {
        updateIsland(target.id, { ...current, mediaId: media.id, ...details });
      }
      return;
    }
    const block: ImageIsland = {
      id: newBlockId(),
      type: "image",
      mediaId: media.id,
      caption: "",
      ...details,
    };
    islands.current.set(block.id, block);
    insertBlock(islandHtml(block));
  }

  function saveHtml(html: string) {
    const draft = htmlDraft;
    setHtmlDraft(null);
    if (!draft) return;
    if (draft.id) {
      const current = islands.current.get(draft.id);
      if (current?.type === "html") updateIsland(draft.id, { ...current, html });
      return;
    }
    const block: IslandBlock = { id: newBlockId(), type: "html", html };
    islands.current.set(block.id, block);
    insertBlock(islandHtml(block));
  }

  function onIslandAction(event: React.MouseEvent<HTMLDivElement>) {
    const button = (event.target as HTMLElement).closest<HTMLElement>("button[data-action]");
    const island = button?.closest<HTMLElement>("[data-block-id]");
    if (!button || !island || !rootRef.current?.contains(island)) return;
    event.preventDefault();
    const id = island.dataset.blockId ?? "";
    const block = islands.current.get(id);
    const action = button.dataset.action;
    if (action === "remove") removeIsland(island);
    else if (action === "replace") setPicker({ mode: "replace", id });
    else if (action === "edit" && block?.type === "image") setImageDraft(block);
    else if (action === "edit" && block?.type === "html") setHtmlDraft({ id, html: block.html });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const mod = event.ctrlKey || event.metaKey;
    if (mod && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openLink();
      return;
    }
    if (mod && event.altKey && /^Digit[0-4]$/.test(event.code)) {
      event.preventDefault();
      const level = event.code.slice(-1);
      applyStyle(level === "0" ? "paragraph" : (`h${level}` as StyleValue));
      return;
    }
    if (mod && event.shiftKey && (event.code === "Digit7" || event.code === "Digit8")) {
      event.preventDefault();
      applyList(event.code === "Digit7");
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && !mod) {
      const top = currentTop();
      if (top instanceof HTMLElement && /^(H[1-6]|BLOCKQUOTE|PRE)$/.test(top.tagName)) {
        if (caretAtEnd(top)) {
          event.preventDefault();
          const paragraph = newParagraph();
          top.after(paragraph);
          placeCaret(paragraph, false);
          afterCommand();
        } else if (top.tagName === "PRE") {
          event.preventDefault();
          document.execCommand("insertLineBreak");
        }
      }
    }
  }

  function onPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");
    const clean = html ? sanitizeHtml(html) : "";
    if (clean && clean.replace(/<[^>]+>/g, "").trim()) {
      document.execCommand("insertHTML", false, clean);
      return;
    }
    if (!text) return;
    const paragraphs = text.replace(/\r\n?/g, "\n").split(/\n{2,}/);
    if (paragraphs.length > 1) {
      document.execCommand(
        "insertHTML",
        false,
        paragraphs.map((part) => `<p>${escapeHtml(part).replace(/\n/g, "<br>")}</p>`).join("")
      );
    } else {
      document.execCommand("insertText", false, text);
    }
  }

  return (
    <TooltipProvider delayDuration={400}>
      <div
        className={cn(
          "rounded-xl border border-border bg-card shadow-sm",
          error && "border-destructive/60"
        )}
      >
        <div
          role="toolbar"
          aria-label="Formatting"
          className="sticky top-0 z-30 space-y-1.5 rounded-t-xl border-b border-border bg-card/95 px-3 py-2.5 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center gap-1">
            <ToolbarButton icon={Undo2} label="Undo" shortcut="Ctrl+Z" onAction={() => run("undo")} />
            <ToolbarButton icon={Redo2} label="Redo" shortcut="Ctrl+Y" onAction={() => run("redo")} />
            <ToolbarDivider />
            <StyleButton
              icon={Type}
              label="Normal"
              pressed={toolbar.style === "paragraph" && !toolbar.list}
              onAction={() => applyStyle("paragraph")}
            />
            <StyleButton
              icon={Heading1}
              label="Heading 1"
              pressed={toolbar.style === "h1"}
              onAction={() => applyStyle("h1")}
            />
            <StyleButton
              icon={Heading2}
              label="Heading 2"
              pressed={toolbar.style === "h2"}
              onAction={() => applyStyle("h2")}
            />
            <StyleButton
              icon={Heading3}
              label="Heading 3"
              pressed={toolbar.style === "h3"}
              onAction={() => applyStyle("h3")}
            />
            <StyleButton
              icon={Quote}
              label="Quote"
              pressed={toolbar.style === "quote"}
              onAction={() => applyStyle("quote")}
            />
            <Select
              value={toolbar.style}
              onValueChange={(next) => {
                requestAnimationFrame(() => applyStyle(next as StyleValue));
              }}
            >
              <SelectTrigger
                size="sm"
                aria-label="More text styles"
                className="h-8 w-[8.5rem] border-transparent shadow-none hover:bg-muted"
                onMouseDown={(event) => event.preventDefault()}
              >
                <SelectValue placeholder="More styles" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="z-[60]"
                onCloseAutoFocus={(event) => event.preventDefault()}
              >
                {STYLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <ToolbarButton icon={Bold} label="Bold" shortcut="Ctrl+B" pressed={toolbar.bold} onAction={() => run("bold")} />
            <ToolbarButton icon={Italic} label="Italic" shortcut="Ctrl+I" pressed={toolbar.italic} onAction={() => run("italic")} />
            <ToolbarButton icon={Underline} label="Underline" shortcut="Ctrl+U" pressed={toolbar.underline} onAction={() => run("underline")} />
            <ToolbarButton icon={Link2} label="Link" shortcut="Ctrl+K" pressed={toolbar.link} onAction={openLink} />
            <ToolbarButton icon={RemoveFormatting} label="Clear formatting" onAction={() => run("removeFormat")} />
            <ToolbarDivider />
            <StyleButton
              icon={List}
              label="Bullets"
              pressed={toolbar.list === "bullet"}
              onAction={() => applyList(false)}
            />
            <StyleButton
              icon={ListOrdered}
              label="Numbered"
              pressed={toolbar.list === "number"}
              onAction={() => applyList(true)}
            />
            <ToolbarDivider />
            <StyleButton
              icon={ImagePlus}
              label="Image"
              onAction={() => setPicker({ mode: "insert" })}
            />
            <StyleButton
              icon={Table}
              label="Table"
              onAction={() => setHtmlDraft({ id: null, html: "" })}
            />
            <StyleButton icon={Minus} label="Divider" onAction={() => insertBlock("<hr>")} />
          </div>
        </div>

        <div className="bg-muted/40 px-2 py-4 sm:px-6 sm:py-8">
          <div className="relative mx-auto max-w-3xl rounded-lg border border-border/70 bg-background shadow-sm">
            {stats.empty ? (
              <p
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 px-5 py-6 text-base leading-7 text-muted-foreground sm:px-12 sm:py-10"
              >
                Start writing here. Use Heading 1–3, bullets, or numbered lists from the toolbar — everything stays in this document.
              </p>
            ) : null}
            <div
              ref={rootRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-multiline="true"
              aria-label="Article content"
              aria-invalid={error ? true : undefined}
              spellCheck
              className={cn(
                "min-h-[28rem] px-5 py-6 text-base leading-7 text-body outline-none sm:px-12 sm:py-10",
                "[&>*:first-child]:mt-0 [&>p]:my-3",
                "[&>h1]:mt-8 [&>h1]:mb-3 [&>h1]:font-heading [&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:tracking-tight [&>h1]:text-ink",
                "[&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-ink",
                "[&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:font-heading [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-ink",
                "[&>h4]:mt-5 [&>h4]:mb-2 [&>h4]:font-heading [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-ink",
                "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:ps-7 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:ps-7 [&_li]:my-1.5 [&_li]:ps-1 [&_li]:marker:text-ink",
                "[&>blockquote]:my-5 [&>blockquote]:rounded-md [&>blockquote]:border-s-4 [&>blockquote]:border-brand [&>blockquote]:bg-surface-alt [&>blockquote]:px-5 [&>blockquote]:py-3 [&>blockquote]:italic [&>blockquote]:text-ink",
                "[&>pre]:my-4 [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:bg-ink [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:whitespace-pre-wrap [&>pre]:text-white",
                "[&>hr]:my-8 [&>hr]:border-border",
                "[&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4",
                "[&_strong]:font-semibold [&_strong]:text-ink [&_b]:font-semibold [&_b]:text-ink"
              )}
              onFocus={() => document.execCommand("defaultParagraphSeparator", false, "p")}
              onInput={afterCommand}
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              onDrop={(event) => event.preventDefault()}
              onMouseDown={(event) => {
                if ((event.target as HTMLElement).closest("button[data-action]")) {
                  event.preventDefault();
                }
              }}
              onClick={onIslandAction}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-b-xl border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span>
            {stats.words} {stats.words === 1 ? "word" : "words"}
          </span>
          <span className="hidden sm:inline">
            Enter starts a new paragraph · Shift + Enter adds a line break · Ctrl + K adds a link
          </span>
        </div>
      </div>

      {error ? (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Write the article in this one document, like Word. Apply headings, bullets and numbered lists from the toolbar — there are no separate boxes for each block. Images are stored in Media.
        </p>
      )}

      {picker ? (
        <MediaPicker
          dialogOnly
          startOpen
          label="Article image"
          value=""
          onChange={handlePick}
          onDismiss={() => setPicker(null)}
        />
      ) : null}

      <ImageDetailsDialog
        block={imageDraft}
        onClose={() => setImageDraft(null)}
        onSave={(next) => {
          setImageDraft(null);
          updateIsland(next.id, next);
        }}
      />
      <HtmlDialog draft={htmlDraft} onClose={() => setHtmlDraft(null)} onSave={saveHtml} />
      <LinkDialog draft={linkDraft} onClose={() => setLinkDraft(null)} onSave={applyLink} />
    </TooltipProvider>
  );
}

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden />;
}

function StyleButton({
  icon: Icon,
  label,
  pressed,
  onAction,
}: {
  icon: ComponentType;
  label: string;
  pressed?: boolean;
  onAction: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={label}
          aria-pressed={pressed}
          className={cn("h-8 gap-1 px-2", pressed && "bg-muted text-ink")}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onAction}
        >
          <Icon />
          <span className="hidden text-xs font-medium sm:inline">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  shortcut,
  pressed,
  onAction,
}: {
  icon: ComponentType;
  label: string;
  shortcut?: string;
  pressed?: boolean;
  onAction: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          aria-pressed={pressed}
          className={cn(pressed && "bg-muted text-ink")}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onAction}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{shortcut ? `${label} (${shortcut})` : label}</TooltipContent>
    </Tooltip>
  );
}

function ImageDetailsDialog({
  block,
  onClose,
  onSave,
}: {
  block: ImageIsland | null;
  onClose: () => void;
  onSave: (next: ImageIsland) => void;
}) {
  return (
    <Dialog open={Boolean(block)} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogContent className="sm:max-w-lg" onCloseAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Image details</DialogTitle>
          <DialogDescription>
            Alt text describes the image for screen readers and search engines. The caption is shown under the image.
          </DialogDescription>
        </DialogHeader>
        {block ? <ImageDetailsForm key={block.id} block={block} onClose={onClose} onSave={onSave} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function ImageDetailsForm({
  block,
  onClose,
  onSave,
}: {
  block: ImageIsland;
  onClose: () => void;
  onSave: (next: ImageIsland) => void;
}) {
  const [alt, setAlt] = useState(block.alt ?? "");
  const [caption, setCaption] = useState(block.caption ?? "");
  const wrongSize =
    block.width &&
    block.height &&
    (block.width !== BLOG_IMAGE_SIZE.width || block.height !== BLOG_IMAGE_SIZE.height);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSave({ ...block, alt: alt.trim(), caption: caption.trim() });
      }}
    >
      {block.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={block.url} alt="" className="max-h-48 w-full rounded-md bg-muted object-contain" />
      ) : null}
      {wrongSize ? (
        <p className="text-xs text-amber-800">
          This image is {block.width} × {block.height}. Blog images should be {BLOG_IMAGE_SIZE.width} × {BLOG_IMAGE_SIZE.height}.
        </p>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="editor-image-alt">Alt text</Label>
        <Input
          id="editor-image-alt"
          value={alt}
          maxLength={200}
          placeholder="Describe what the image shows"
          onChange={(event) => setAlt(event.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="editor-image-caption">Caption (optional)</Label>
        <Input
          id="editor-image-caption"
          value={caption}
          maxLength={300}
          placeholder="Shown under the image"
          onChange={(event) => setCaption(event.target.value)}
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save details</Button>
      </DialogFooter>
    </form>
  );
}

function HtmlDialog({
  draft,
  onClose,
  onSave,
}: {
  draft: HtmlDraft | null;
  onClose: () => void;
  onSave: (html: string) => void;
}) {
  return (
    <Dialog open={Boolean(draft)} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogContent className="sm:max-w-2xl" onCloseAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{draft?.id ? "Edit table or HTML" : "Insert table or HTML"}</DialogTitle>
          <DialogDescription>
            Paste a table or other HTML. Tables use the shared blog table style on the website.
          </DialogDescription>
        </DialogHeader>
        {draft ? <HtmlForm key={draft.id ?? "new"} initial={draft.html} onClose={onClose} onSave={onSave} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function HtmlForm({
  initial,
  onClose,
  onSave,
}: {
  initial: string;
  onClose: () => void;
  onSave: (html: string) => void;
}) {
  const [html, setHtml] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!html.trim()) {
          setError("Enter the HTML to insert.");
          return;
        }
        onSave(html.trim());
      }}
    >
      <Textarea
        value={html}
        aria-label="HTML"
        aria-invalid={error ? true : undefined}
        className="max-h-[50vh] min-h-48 font-mono text-xs md:text-xs"
        placeholder={'<table class="blog-table"><thead><tr><th>Column</th></tr></thead><tbody><tr><td>Value</td></tr></tbody></table>'}
        onChange={(event) => {
          setHtml(event.target.value);
          setError(null);
        }}
      />
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{initial ? "Save HTML" : "Insert"}</Button>
      </DialogFooter>
    </form>
  );
}

function LinkDialog({
  draft,
  onClose,
  onSave,
}: {
  draft: LinkDraft | null;
  onClose: () => void;
  onSave: (href: string, text: string) => void;
}) {
  return (
    <Dialog open={Boolean(draft)} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogContent className="sm:max-w-md" onCloseAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{draft?.existing ? "Edit link" : "Add link"}</DialogTitle>
          <DialogDescription>
            Use a full web address, an email (mailto:) or a page on this site such as /services.
          </DialogDescription>
        </DialogHeader>
        {draft ? <LinkForm draft={draft} onClose={onClose} onSave={onSave} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function LinkForm({
  draft,
  onClose,
  onSave,
}: {
  draft: LinkDraft;
  onClose: () => void;
  onSave: (href: string, text: string) => void;
}) {
  const [href, setHref] = useState(draft.href);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const safe = safeHref(href);
        if (!safe) {
          setError("Enter a valid link, for example https://example.com.");
          return;
        }
        onSave(safe, text.trim());
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="editor-link-url">Link address</Label>
        <Input
          id="editor-link-url"
          autoFocus
          value={href}
          placeholder="https://"
          aria-invalid={error ? true : undefined}
          onChange={(event) => {
            setHref(event.target.value);
            setError(null);
          }}
        />
        {error ? (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      {draft.needsText ? (
        <div className="grid gap-2">
          <Label htmlFor="editor-link-text">Text to show</Label>
          <Input
            id="editor-link-text"
            value={text}
            placeholder="Leave blank to show the address"
            onChange={(event) => setText(event.target.value)}
          />
        </div>
      ) : null}
      <DialogFooter className="sm:justify-between">
        {draft.existing ? (
          <Button type="button" variant="ghost" className="text-destructive" onClick={() => onSave("", "")}>
            Remove link
          </Button>
        ) : (
          <span />
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{draft.existing ? "Update link" : "Add link"}</Button>
        </div>
      </DialogFooter>
    </form>
  );
}

function initialBlocks(value: unknown, mediaById?: Record<string, InlineMedia>) {
  return lexicalToBlocks(value, { ...Object.fromEntries(mediaCache), ...(mediaById ?? {}) }).filter(
    (block) => !isEmptyTextBlock(block)
  );
}

function isEmptyTextBlock(block: EditorBlock) {
  if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") {
    return !hasText(block.spans);
  }
  return false;
}

function measure(blocks: EditorBlock[]) {
  const text = blocks
    .map((block) => {
      if ("spans" in block) return block.spans.map((span) => span.text).join("");
      if (block.type === "list") return block.items.map((item) => item.map((span) => span.text).join("")).join(" ");
      if (block.type === "code") return block.text;
      if (block.type === "image") return block.caption ?? "";
      return "";
    })
    .join(" ");
  return { words: (text.match(/\S+/g) ?? []).length, empty: blocks.length === 0 };
}

function readToolbar(root: HTMLElement): ToolbarState {
  const selection = window.getSelection();
  const node = selection?.anchorNode ?? null;
  if (!node || !root.contains(node)) return IDLE_TOOLBAR;
  const top = topBlock(root, node, selection?.anchorOffset ?? 0);
  const tag = top?.nodeName ?? "P";
  const style: StyleValue =
    tag === "H1" ? "h1"
    : tag === "H2" ? "h2"
    : tag === "H3" ? "h3"
    : tag === "H4" || tag === "H5" || tag === "H6" ? "h4"
    : tag === "BLOCKQUOTE" ? "quote"
    : tag === "PRE" ? "code"
    : "paragraph";
  const anchor = closestAnchor(node);
  return {
    style,
    list: tag === "UL" ? "bullet" : tag === "OL" ? "number" : null,
    bold: commandState("bold"),
    italic: commandState("italic"),
    underline: commandState("underline"),
    link: Boolean(anchor && root.contains(anchor)),
  };
}

function sameToolbar(prev: ToolbarState, next: ToolbarState) {
  const same = (Object.keys(prev) as (keyof ToolbarState)[]).every((key) => prev[key] === next[key]);
  return same ? prev : next;
}

function commandState(command: string) {
  try {
    return document.queryCommandState(command);
  } catch {
    return false;
  }
}

function closestAnchor(node: Node | null) {
  const element = node?.nodeType === 1 ? (node as Element) : node?.parentElement;
  return element?.closest("a") ?? null;
}

function isIsland(node: Node | null): boolean {
  return node instanceof HTMLElement && node.hasAttribute("data-block-id");
}

function topBlock(root: HTMLElement, node: Node, offset: number): Node | null {
  if (node === root) {
    return root.childNodes[Math.max(0, offset - 1)] ?? root.firstChild;
  }
  let current: Node | null = node;
  while (current && current.parentNode !== root) current = current.parentNode;
  return current;
}

function placeCaret(node: Node, atEnd: boolean) {
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(!atEnd);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function caretAtEnd(block: HTMLElement) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  if (!range.collapsed) return false;
  try {
    const tail = document.createRange();
    tail.selectNodeContents(block);
    tail.setStart(range.endContainer, range.endOffset);
    return tail.toString().replace(/[\u200b\n]/g, "").trim() === "";
  } catch {
    return false;
  }
}

function newParagraph() {
  const paragraph = document.createElement("p");
  paragraph.append(document.createElement("br"));
  return paragraph;
}

function isEmptyParagraph(node: Node) {
  return (
    node.nodeName === "P" &&
    (node.textContent ?? "").replace(/[\u200b\u00a0]/g, "").trim() === ""
  );
}

function ensureEdges(root: HTMLElement) {
  if (!root.firstChild || isIsland(root.firstChild)) root.prepend(newParagraph());
  const last = root.lastChild;
  if (last && (isIsland(last) || last.nodeName === "HR" || last.nodeName === "PRE")) {
    root.append(newParagraph());
  }
}

function normalizeRoot(root: HTMLElement) {
  if (
    !root.firstChild ||
    (root.childNodes.length === 1 && root.firstChild.nodeName === "BR")
  ) {
    root.replaceChildren(newParagraph());
    placeCaret(root.firstChild!, false);
    return;
  }
  const selection = window.getSelection();
  const anchor = selection?.anchorNode ?? null;
  const offset = selection?.anchorOffset ?? 0;
  let group: HTMLElement | null = null;
  let moved = false;
  for (const node of Array.from(root.childNodes)) {
    const isText = node.nodeType === Node.TEXT_NODE;
    if (isText && !(node.textContent ?? "").trim() && node !== anchor) {
      node.remove();
      continue;
    }
    const inline =
      isText ||
      (node instanceof HTMLElement && !BLOCK_TAGS.has(node.tagName) && !isIsland(node));
    if (!inline) {
      group = null;
      continue;
    }
    if (!group) {
      group = document.createElement("p");
      root.insertBefore(group, node);
    }
    group.append(node);
    moved = true;
  }
  if (moved && anchor && root.contains(anchor)) {
    const max = anchor.nodeType === Node.TEXT_NODE ? (anchor.textContent ?? "").length : anchor.childNodes.length;
    selection?.collapse(anchor, Math.min(offset, max));
  }
}

function hasText(spans: InlineSpan[]) {
  return spans.some((span) => span.text.trim().length > 0);
}

function cleanSpans(spans: InlineSpan[]): InlineSpan[] {
  const out = spans
    .map((span) => ({ ...span, text: span.text.replace(/\u00a0/g, " ").replace(/\u200b/g, "") }))
    .filter((span) => span.text.length > 0);
  while (out.length) {
    const last = out[out.length - 1];
    const text = last.text.replace(/\n+$/, "");
    if (text === last.text) break;
    if (text) {
      out[out.length - 1] = { ...last, text };
      break;
    }
    out.pop();
  }
  while (out.length) {
    const first = out[0];
    const text = first.text.replace(/^\n+/, "");
    if (text === first.text) break;
    if (text) {
      out[0] = { ...first, text };
      break;
    }
    out.shift();
  }
  return out;
}

function inlineSpans(element: Element): InlineSpan[] {
  const segments: InlineSpan[][] = [];
  let buffer = "";
  const flush = () => {
    if (buffer) segments.push(htmlToSpans(buffer));
    buffer = "";
  };
  for (const child of Array.from(element.childNodes)) {
    if (child instanceof HTMLElement && BLOCK_TAGS.has(child.tagName)) {
      flush();
      if (child.tagName === "UL" || child.tagName === "OL") {
        for (const item of Array.from(child.children)) segments.push(inlineSpans(item));
      } else {
        segments.push(inlineSpans(child));
      }
    } else if (child.nodeType === Node.TEXT_NODE) {
      buffer += escapeHtml(child.textContent ?? "");
    } else if (child instanceof HTMLElement) {
      buffer += child.outerHTML;
    }
  }
  flush();
  const joined: InlineSpan[] = [];
  segments
    .map(cleanSpans)
    .filter((segment) => segment.length > 0)
    .forEach((segment, index) => {
      if (index > 0) joined.push({ text: "\n" });
      joined.push(...segment);
    });
  return joined;
}

function domToBlocks(root: HTMLElement, islands: Map<string, IslandBlock>): EditorBlock[] {
  const blocks: EditorBlock[] = [];
  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? "").replace(/\u00a0/g, " ");
      if (text.trim()) blocks.push({ id: newBlockId(), type: "paragraph", spans: [{ text }] });
      continue;
    }
    if (!(node instanceof HTMLElement)) continue;
    if (isIsland(node)) {
      const island = islands.get(node.dataset.blockId ?? "");
      if (island) blocks.push(island);
      continue;
    }
    const tag = node.tagName;
    const id = newBlockId();
    if (tag === "HR") {
      blocks.push({ id, type: "hr" });
      continue;
    }
    if (tag === "PRE") {
      const text = node.innerText.replace(/\u00a0/g, " ").replace(/\n+$/, "");
      if (text.trim()) blocks.push({ id, type: "code", text });
      continue;
    }
    if (tag === "UL" || tag === "OL") {
      const items = Array.from(node.children).map(inlineSpans).filter(hasText);
      if (items.length) blocks.push({ id, type: "list", ordered: tag === "OL", items });
      continue;
    }
    if (tag === "TABLE") {
      blocks.push({ id, type: "html", html: node.outerHTML });
      continue;
    }
    const spans = inlineSpans(node);
    if (!hasText(spans)) continue;
    const heading = /^H([1-6])$/.exec(tag);
    if (heading) {
      const level = Math.min(4, Number(heading[1])) as HeadingLevel;
      blocks.push({ id, type: "heading", level, spans });
    } else if (tag === "BLOCKQUOTE") {
      blocks.push({ id, type: "quote", spans });
    } else {
      blocks.push({ id, type: "paragraph", spans });
    }
  }
  return blocks;
}

function blockToHtml(block: EditorBlock, islands: Map<string, IslandBlock>): string {
  switch (block.type) {
    case "paragraph":
      return `<p>${spansToHtml(block.spans) || "<br>"}</p>`;
    case "heading":
      return `<h${block.level}>${spansToHtml(block.spans) || "<br>"}</h${block.level}>`;
    case "quote":
      return `<blockquote>${spansToHtml(block.spans) || "<br>"}</blockquote>`;
    case "list": {
      const tag = block.ordered ? "ol" : "ul";
      const items = block.items.map((item) => `<li>${spansToHtml(item) || "<br>"}</li>`).join("");
      return `<${tag}>${items}</${tag}>`;
    }
    case "code":
      return `<pre>${escapeHtml(block.text) || "<br>"}</pre>`;
    case "hr":
      return "<hr>";
    default:
      islands.set(block.id, block);
      return islandHtml(block);
  }
}

const ISLAND_CLASS = "relative my-6 select-none rounded-lg border border-border bg-muted/30 p-3";
const ACTION_CLASS =
  "inline-flex h-7 cursor-pointer items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium text-ink transition-colors hover:bg-muted";
const DANGER_CLASS =
  "inline-flex h-7 cursor-pointer items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10";

function islandActions(actions: [string, string][]) {
  const buttons = actions
    .map(
      ([action, label]) =>
        `<button type="button" data-action="${action}" class="${action === "remove" ? DANGER_CLASS : ACTION_CLASS}">${label}</button>`
    )
    .join("");
  return `<div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5">${buttons}</div>`;
}

function islandHtml(block: IslandBlock): string {
  const attrs = `contenteditable="false" data-block-id="${escapeHtml(block.id)}"`;
  if (block.type === "image") {
    const image = block.url
      ? `<img src="${escapeHtml(block.url)}" alt="${escapeHtml(block.alt ?? "")}" draggable="false" class="mx-auto block h-auto max-h-[28rem] w-auto max-w-full rounded-md bg-muted">`
      : `<div class="rounded-md bg-destructive/5 px-3 py-8 text-center text-sm text-destructive">This image could not be loaded. Replace it or remove it.</div>`;
    const caption = block.caption?.trim()
      ? escapeHtml(block.caption.trim())
      : `<span class="italic">No caption</span>`;
    return `<figure ${attrs} class="${ISLAND_CLASS}">${image}<div class="mt-3 flex flex-wrap items-center justify-between gap-2"><figcaption class="min-w-0 flex-1 text-sm text-muted-foreground">${caption}</figcaption>${islandActions([["edit", "Edit details"], ["replace", "Replace"], ["remove", "Remove"]])}</div></figure>`;
  }
  if (block.type === "html") {
    const preview = escapeHtml(block.html.slice(0, 600));
    return `<div ${attrs} class="${ISLAND_CLASS}"><div class="flex flex-wrap items-center justify-between gap-2"><span class="text-xs font-semibold text-muted-foreground">Table / HTML embed</span>${islandActions([["edit", "Edit HTML"], ["remove", "Remove"]])}</div><div class="mt-2 max-h-28 overflow-hidden rounded-md bg-background p-2 font-mono text-xs break-all whitespace-pre-wrap text-body">${preview}</div></div>`;
  }
  return `<div ${attrs} class="relative my-6 select-none rounded-lg border border-amber-200 bg-amber-50 p-3"><div class="flex flex-wrap items-center justify-between gap-2"><span class="text-sm text-amber-950">This part of the article uses formatting the editor cannot change. It is kept exactly as it appears on the website.</span>${islandActions([["remove", "Remove"]])}</div></div>`;
}

function safeHref(value: string) {
  const href = value.trim();
  if (!href) return "";
  if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) {
    return href;
  }
  if (/^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(href)) return `https://${href}`;
  return "";
}

const PASTE_ALLOWED = new Set([
  "P", "H1", "H2", "H3", "H4", "UL", "OL", "LI", "BLOCKQUOTE", "PRE",
  "STRONG", "B", "EM", "I", "U", "A", "BR", "CODE", "HR",
]);
const PASTE_DROPPED = new Set([
  "SCRIPT", "STYLE", "META", "LINK", "TITLE", "IMG", "PICTURE", "SVG", "IFRAME", "OBJECT",
  "EMBED", "VIDEO", "AUDIO", "CANVAS", "INPUT", "BUTTON", "SELECT", "TEXTAREA", "FORM",
  "NOSCRIPT", "TEMPLATE", "HEAD",
]);

function sanitizeHtml(html: string) {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const out = document.createElement("div");
  for (const child of Array.from(parsed.body.childNodes)) appendClean(child, out);
  return out.innerHTML;
}

function appendClean(node: Node, parent: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    parent.appendChild(document.createTextNode(node.textContent ?? ""));
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const element = node as Element;
  const tag = element.tagName.toUpperCase();
  if (PASTE_DROPPED.has(tag)) return;

  const style = (element.getAttribute("style") ?? "").toLowerCase();
  let mapped = tag === "H5" || tag === "H6" ? "H4" : tag;
  if (tag === "DIV" || tag === "TR") {
    mapped = element.querySelector("p,div,h1,h2,h3,h4,h5,h6,ul,ol,blockquote,pre,table") ? "" : "P";
  }
  if (tag === "B" && /font-weight:\s*(normal|400)/.test(style)) mapped = "";

  let target: Node = parent;
  if (PASTE_ALLOWED.has(mapped)) {
    const href = mapped === "A" ? safeHref(element.getAttribute("href") ?? "") : "";
    if (mapped !== "A" || href) {
      const clean = document.createElement(mapped.toLowerCase());
      if (href) clean.setAttribute("href", href);
      parent.appendChild(clean);
      target = clean;
    }
  } else {
    const marks: string[] = [];
    if (/font-weight:\s*(bold|[6-9]00)/.test(style)) marks.push("strong");
    if (/font-style:\s*italic/.test(style)) marks.push("em");
    if (/text-decoration[^;]*underline/.test(style)) marks.push("u");
    for (const mark of marks) {
      const wrapper = document.createElement(mark);
      target.appendChild(wrapper);
      target = wrapper;
    }
  }
  for (const child of Array.from(element.childNodes)) appendClean(child, target);
  if (tag === "TD" || tag === "TH") target.appendChild(document.createTextNode(" "));
}
