"use client";

import { useState } from "react";
import { Bookmark, Check, ScanLine, Search } from "lucide-react";
import Link from "next/link";

type AnalysisActionsProps = {
  saveLabel: string;
  scanLabel: string;
  searchLabel: string;
};

export function AnalysisActions({
  saveLabel,
  scanLabel,
  searchLabel,
}: AnalysisActionsProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/scan"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ScanLine className="size-4" aria-hidden="true" />
          {scanLabel}
        </Link>
        <Link
          href="/search"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Search className="size-4" aria-hidden="true" />
          {searchLabel}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setSaved(true)}
        disabled={saved}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
      >
        {saved ? (
          <>
            <Check className="size-4 text-green-600" aria-hidden="true" />
            Saved
          </>
        ) : (
          <>
            <Bookmark className="size-4" aria-hidden="true" />
            {saveLabel}
          </>
        )}
      </button>
    </div>
  );
}
