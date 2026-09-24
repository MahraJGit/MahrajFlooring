"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ExternalLink, EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { deleteService } from "@/actions/services";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PublishStatus } from "@/lib/cms/types";

export function ServiceActions({
  id,
  title,
  slug,
  status,
}: {
  id: string;
  title: string;
  slug: string;
  status: PublishStatus;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const published = status === "published";
  const canView = published && Boolean(slug);

  function onOpenChange(next: boolean) {
    if (pending) return;
    setOpen(next);
    if (!next) setError(null);
  }

  function remove() {
    start(async () => {
      setError(null);
      const result = await deleteService(id);
      if (result.error || !result.href) {
        setError(result.error ?? "The service could not be deleted. Please try again.");
        return;
      }
      router.push(result.href);
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-w-9"
            aria-label={`Actions for ${title}`}
            disabled={pending}
          >
            <MoreHorizontal className="sm:hidden" />
            <span className="hidden sm:inline">{pending ? "Working…" : "Actions"}</span>
            <ChevronDown className="hidden sm:inline" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          {canView ? (
            <DropdownMenuItem asChild>
              <a href={`/services/${slug}`} target="_blank" rel="noreferrer">
                <ExternalLink />
                View
              </a>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>
              <EyeOff />
              <span className="flex min-w-0 flex-col items-start">
                <span>View</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {published ? "No public URL yet" : "Drafts stay off the website"}
                </span>
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href={`/admin/services/${id}`}>
              <Pencil />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => onOpenChange(true)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="overflow-hidden [&>*]:min-w-0">
          <AlertDialogHeader className="min-w-0">
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription className="break-words">
              <span className="font-medium text-foreground [overflow-wrap:anywhere]">“{title}”</span>{" "}
              will be removed from the menu and its public page will stop working. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <Button type="button" variant="destructive" disabled={pending} onClick={remove}>
              {pending ? "Deleting…" : "Delete service"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
