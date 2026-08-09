"use client";

import { cn } from "@/lib/utils";
import type { HistoryLabels } from "@/data/history-labels";

type CategoryTabsProps = {
  labels: HistoryLabels["tabs"];
  active: "all" | "high" | "moderate" | "low";
  onChange: (tab: "all" | "high" | "moderate" | "low") => void;
};

const TABS = ["all", "high", "moderate", "low"] as const;

const TAB_ACTIVE_COLORS: Record<string, string> = {
  high: "bg-red-50 border-red-200 text-red-700",
  moderate: "bg-amber-50 border-amber-200 text-amber-700",
  low: "bg-green-50 border-green-200 text-green-700",
};

export function CategoryTabs({ labels, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {TABS.map((tab) => {
        const isActive = tab === active;
        const label = labels[tab];
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isActive
                ? TAB_ACTIVE_COLORS[tab]
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
