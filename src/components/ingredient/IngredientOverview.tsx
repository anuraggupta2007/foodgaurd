"use client";

import { AlertTriangle, Minus, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssessmentLevel } from "@/data/analysis-data";
import type { IngredientDetail } from "@/data/ingredient-data";
import type { IngredientLabels } from "@/data/ingredient-labels";

type IngredientOverviewProps = {
  ingredient: IngredientDetail;
  labels: IngredientLabels["overview"];
  assessmentLabels: IngredientLabels["assessment"];
};

const assessmentConfig: Record<
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
    colors: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  },
  moderate: {
    icon: Minus,
    label: "Moderate Attention",
    colors: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  },
  high: {
    icon: AlertTriangle,
    label: "High Attention",
    colors: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  },
  insufficient: {
    icon: HelpCircle,
    label: "Insufficient Evidence",
    colors: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  },
};

export function IngredientOverview({
  ingredient,
  labels,
  assessmentLabels,
}: IngredientOverviewProps) {
  const config = assessmentConfig[ingredient.assessment];
  const Icon = config.icon;
  const assessmentText =
    assessmentLabels[ingredient.assessment] ?? config.label;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {ingredient.name}
        </h1>
        {ingredient.insCode && (
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {ingredient.insCode}
          </p>
        )}
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{labels.categoryLabel}:</span>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground">
          {ingredient.category}
        </span>
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
          {assessmentText}
        </span>
      </div>
    </div>
  );
}
