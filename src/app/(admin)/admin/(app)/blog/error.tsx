"use client";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="font-heading text-lg font-semibold">Could not load this page</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || "Something went wrong while reading the database."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 text-sm font-medium text-brand hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
