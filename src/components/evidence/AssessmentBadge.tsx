"use client";

import { AlertTriangle, Minus, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssessmentLevel } from "@/data/analysis-data";

type AssessmentBadgeProps = {
  level: AssessmentLevel;
};

const config: Record<
  AssessmentLevel,
  {
    icon: typeof AlertTriangle;
    label: string;
    colors: { bg: string; text: string; border: string };
  }
> = {
  low: {
    icon: CheckCircle,
    label: "Low Concern",
    colors: { bg: "bg-green-50 dark:bg-green-950/40", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-900/50" },
  },
  moderate: {
    icon: Minus,
    label: "Moderate Attention",
    colors: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-900/50" },
  },
  high: {
    icon: AlertTriangle,
    label: "High Attention",
    colors: { bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-900/50" },
  },
  insufficient: {
    icon: HelpCircle,
    label: "Insufficient Evidence",
    colors: { bg: "bg-gray-50 dark:bg-gray-900/40", text: "text-gray-600 dark:text-gray-400", border: "border-gray-200 dark:border-gray-800" },
  },
};

export function AssessmentBadge({ level }: AssessmentBadgeProps) {
  const c = config[level] ?? config.low;
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        c.colors.bg,
        c.colors.text,
        c.colors.border,
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {c.label}
    </span>
  );
}
