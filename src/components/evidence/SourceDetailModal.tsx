"use client";

import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceSourceDetail, SourceCategory } from "@/data/evidence-data";
import type { EvidenceLabels } from "@/data/evidence-labels";

type SourceDetailModalProps = {
  source: EvidenceSourceDetail;
  labels: EvidenceLabels["sourceDetail"];
  onClose: () => void;
};

const sourceTypeColors: Record<SourceCategory, string> = {
  government: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  regulatory: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  scientific: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
  product_information: "bg-gray-50 text-gray-600 dark:bg-gray-900/40 dark:text-gray-400",
  food_database: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
};

export function SourceDetailModal({
  source,
  labels,
  onClose,
}: SourceDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-t-2xl border border-border bg-card shadow-xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold text-foreground">
            {labels.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={labels.close}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 px-5 py-4">
          <div>
            <p className="text-base font-medium text-foreground">{source.sourceName}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  sourceTypeColors[source.sourceType] ?? "bg-gray-50 text-gray-600",
                )}
              >
                {source.sourceType.replace("_", " ")}
              </span>
              {source.lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  {labels.lastUpdated}: {source.lastUpdated}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {labels.relevantInformation}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {source.relevantInformation}
            </p>
          </div>

          {source.usedFor.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {labels.usedFor}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {source.usedFor.map((use) => (
                  <span
                    key={use}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Summary
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {source.summary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {labels.close}
          </button>
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {labels.visitSource}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
