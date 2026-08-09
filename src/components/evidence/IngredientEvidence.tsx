"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AssessmentBadge } from "./AssessmentBadge";
import type { IngredientEvidenceItem } from "@/data/evidence-data";
import type { EvidenceLabels } from "@/data/evidence-labels";

type IngredientEvidenceProps = {
  items: IngredientEvidenceItem[];
  labels: EvidenceLabels["ingredientEvidence"];
  productBarcode: string;
};

export function IngredientEvidence({
  items,
  labels,
  productBarcode,
}: IngredientEvidenceProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">{labels.title}</h2>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <AssessmentBadge level={item.assessment} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.function}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.evidence}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Source: {item.source}
                </p>
              </div>
            </div>
            <Link
              href={`/ingredient?id=${encodeURIComponent(item.id)}&product=${encodeURIComponent(productBarcode)}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {labels.viewDetails}
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
