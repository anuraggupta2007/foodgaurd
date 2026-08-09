"use client";

import { Scale, ShieldCheck, ShieldAlert, ShieldOff, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegulatoryInfo, RegulatoryStatus } from "@/data/ingredient-data";
import type { IngredientLabels } from "@/data/ingredient-labels";

type RegulatoryInfoProps = {
  regulatory: RegulatoryInfo;
  labels: IngredientLabels["regulatory"];
};

const statusConfig: Record<
  RegulatoryStatus,
  {
    icon: typeof ShieldCheck;
    label: string;
    colors: { bg: string; text: string; border: string };
  }
> = {
  permitted: {
    icon: ShieldCheck,
    label: "Permitted",
    colors: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  },
  restricted: {
    icon: ShieldAlert,
    label: "Restricted",
    colors: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  },
  banned: {
    icon: ShieldOff,
    label: "Banned",
    colors: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  },
  under_review: {
    icon: ShieldQuestion,
    label: "Under Review",
    colors: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  },
  unknown: {
    icon: ShieldOff,
    label: "Unknown",
    colors: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  },
};

export function RegulatoryInformation({
  regulatory,
  labels,
}: RegulatoryInfoProps) {
  const config = statusConfig[regulatory.status];
  const Icon = config.icon;
  const statusText = labels[`status${regulatory.status.charAt(0).toUpperCase() + regulatory.status.slice(1).replace("_", "")}` as keyof typeof labels] ?? config.label;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <Scale className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{labels.title}</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5">
          <span className="text-sm text-muted-foreground">{labels.statusLabel}</span>
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
              config.colors.bg,
              config.colors.border,
            )}
          >
            <Icon className={cn("size-3.5", config.colors.text)} aria-hidden="true" />
            <span className={cn("text-xs font-medium", config.colors.text)}>
              {statusText}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-3.5">
          <span className="text-sm text-muted-foreground">{labels.authorityLabel}</span>
          <p className="mt-1 text-sm font-medium text-foreground">{regulatory.authority}</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-3.5">
          <p className="text-sm leading-relaxed text-muted-foreground">{regulatory.details}</p>
        </div>
      </div>
    </div>
  );
}
