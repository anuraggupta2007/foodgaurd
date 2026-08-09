"use client";

import { useState } from "react";
import { BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceSourceDetail, SourceCategory } from "@/data/evidence-data";
import type { EvidenceLabels } from "@/data/evidence-labels";

type EvidenceListProps = {
  sources: EvidenceSourceDetail[];
  labels: EvidenceLabels["evidenceList"];
  filterLabels: EvidenceLabels["filters"];
  priorityLabels: EvidenceLabels["sourcePriority"];
  onViewSource: (source: EvidenceSourceDetail) => void;
};

const sourceTypeColors: Record<SourceCategory, string> = {
  government: "bg-blue-50 text-blue-700",
  regulatory: "bg-purple-50 text-purple-700",
  scientific: "bg-teal-50 text-teal-700",
  product_information: "bg-gray-50 text-gray-600",
  food_database: "bg-orange-50 text-orange-700",
};

const authorityOrder: Record<string, number> = {
  primary: 0,
  scientific: 1,
  supporting: 2,
};

export function EvidenceList({
  sources,
  labels,
  filterLabels,
  priorityLabels,
  onViewSource,
}: EvidenceListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters: { key: string; label: string }[] = [
    { key: "all", label: filterLabels.all },
    { key: "regulatory", label: filterLabels.regulatory },
    { key: "scientific", label: filterLabels.scientific },
    { key: "product_information", label: filterLabels.productInfo },
    { key: "food_database", label: filterLabels.regulatory },
    { key: "government", label: filterLabels.regulatory },
  ];

  const uniqueFilters = [
    { key: "all", label: filterLabels.all },
    { key: "regulatory", label: filterLabels.regulatory },
    { key: "scientific", label: filterLabels.scientific },
    { key: "product_information", label: filterLabels.productInfo },
  ];

  const filtered =
    activeFilter === "all"
      ? sources
      : sources.filter((s) => s.sourceType === activeFilter);

  const sorted = [...filtered].sort(
    (a, b) => (authorityOrder[a.authority] ?? 3) - (authorityOrder[b.authority] ?? 3),
  );

  const grouped = sorted.reduce(
    (acc, source) => {
      const key = source.authority;
      if (!acc[key]) acc[key] = [];
      acc[key].push(source);
      return acc;
    },
    {} as Record<string, EvidenceSourceDetail[]>,
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <BookOpen className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{labels.title}</h2>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {uniqueFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              activeFilter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sources by authority */}
      <div className="space-y-4">
        {(["primary", "scientific", "supporting"] as const).map((auth) => {
          const items = grouped[auth];
          if (!items || items.length === 0) return null;
          const authLabel =
            auth === "primary"
              ? priorityLabels.primary
              : auth === "scientific"
                ? priorityLabels.scientific
                : priorityLabels.supporting;
          return (
            <div key={auth}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {authLabel}
              </p>
              <div className="space-y-2">
                {items.map((source) => (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => onViewSource(source)}
                    className="flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {source.sourceName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-medium",
                            sourceTypeColors[source.sourceType] ?? "bg-gray-50 text-gray-600",
                          )}
                        >
                          {source.sourceType.replace("_", " ")}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {source.summary}
                      </p>
                      {source.usedFor.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {source.usedFor.map((use) => (
                            <span
                              key={use}
                              className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      className="mt-1 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
