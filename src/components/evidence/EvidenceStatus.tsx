"use client";

import { Shield, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceLabels } from "@/data/evidence-labels";

type EvidenceStatusProps = {
  status: "sufficient" | "limited" | "insufficient";
  explanation: string;
  labels: EvidenceLabels["evidenceStatus"];
};

const statusConfig: Record<
  string,
  {
    icon: typeof CheckCircle;
    colors: { bg: string; text: string; border: string };
  }
> = {
  sufficient: {
    icon: CheckCircle,
    colors: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  },
  limited: {
    icon: AlertCircle,
    colors: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  },
  insufficient: {
    icon: HelpCircle,
    colors: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  },
};

export function EvidenceStatus({ status, explanation, labels }: EvidenceStatusProps) {
  const config = statusConfig[status] ?? statusConfig.sufficient;
  const Icon = config.icon;
  const statusLabel = labels[status] ?? status;
  const descriptionLabel = labels[`${status}Description` as keyof typeof labels] ?? explanation;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-foreground">{labels.title}</h2>
      </div>

      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
          config.colors.bg,
          config.colors.border,
        )}
      >
        <Icon className={cn("size-4", config.colors.text)} aria-hidden="true" />
        <span className={cn("text-sm font-medium", config.colors.text)}>
          {statusLabel}
        </span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {explanation}
      </p>
    </div>
  );
}
