"use client";

import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceLabels } from "@/data/evidence-labels";

type DataQualityProps = {
  level: "high" | "medium" | "low";
  explanation: string;
  labels: EvidenceLabels["dataQuality"];
};

const levelConfig: Record<
  string,
  { colors: { bg: string; text: string; border: string } }
> = {
  high: {
    colors: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  },
  medium: {
    colors: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  },
  low: {
    colors: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  },
};

export function DataQuality({ level, explanation, labels }: DataQualityProps) {
  const config = levelConfig[level] ?? levelConfig.medium;
  const labelText = labels[level] ?? level;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <BarChart3 className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{labels.title}</h2>
      </div>

      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
          config.colors.bg,
          config.colors.text,
          config.colors.border,
        )}
      >
        {labelText}
      </span>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {explanation}
      </p>
    </div>
  );
}
