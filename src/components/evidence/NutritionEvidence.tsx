"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import type { NutritionEvidenceItem } from "@/data/evidence-data";
import type { EvidenceLabels } from "@/data/evidence-labels";

type NutritionEvidenceProps = {
  items: NutritionEvidenceItem[];
  labels: EvidenceLabels["nutritionEvidence"];
  productBarcode: string;
};

export function NutritionEvidence({
  items,
  labels,
  productBarcode,
}: NutritionEvidenceProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">{labels.title}</h2>
        <Link
          href={`/nutrition?barcode=${encodeURIComponent(productBarcode)}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {labels.viewDetails}
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                {labels.nutrient}
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                {labels.value}
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                {labels.source}
              </th>
              <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">
                {labels.usedInAssessment}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5 font-medium text-foreground">
                  {item.nutrient}
                </td>
                <td className="px-4 py-2.5 text-foreground">{item.value}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{item.source}</td>
                <td className="px-4 py-2.5 text-center">
                  {item.usedInAssessment ? (
                    <CheckCircle className="mx-auto size-4 text-green-600" aria-label="Yes" />
                  ) : (
                    <Circle className="mx-auto size-4 text-muted-foreground/40" aria-label="No" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
