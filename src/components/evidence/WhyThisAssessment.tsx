"use client";

import { HelpCircle, Cpu, BarChart3 } from "lucide-react";
import type { AssessmentFactor } from "@/data/evidence-data";
import type { EvidenceLabels } from "@/data/evidence-labels";

type WhyThisAssessmentProps = {
  factors: AssessmentFactor[];
  labels: EvidenceLabels["whyAssessment"];
};

const categoryIcons: Record<string, typeof HelpCircle> = {
  ingredients: Cpu,
  nutrition: BarChart3,
  data_quality: HelpCircle,
};

export function WhyThisAssessment({ factors, labels }: WhyThisAssessmentProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">{labels.title}</h2>

      <div className="space-y-3">
        {factors.map((factor, i) => {
          const Icon = categoryIcons[factor.category] ?? HelpCircle;
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{factor.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{factor.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
