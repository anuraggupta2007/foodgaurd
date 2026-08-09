"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { lookupNutrition } from "@/data/nutrition-data";
import { getNutritionLabels } from "@/data/nutrition-labels";
import { NutritionProductHeader } from "./NutritionProductHeader";
import { NutritionSummary } from "./NutritionSummary";
import { NutritionBreakdown } from "./NutritionBreakdown";
import { ServingInformation } from "./ServingInformation";
import { NutritionAttentionAreas } from "./NutritionAttentionAreas";
import { PositiveNutritionPoints } from "./PositiveNutritionPoints";
import { NutritionContext } from "./NutritionContext";
import { NutritionDataQuality } from "./NutritionDataQuality";
import { NutritionSource } from "./NutritionSource";
import { NutritionActions } from "./NutritionActions";

type NutritionPageProps = {
  barcode: string;
  lang?: string;
};

export function NutritionPage({ barcode, lang = "en" }: NutritionPageProps) {
  const router = useRouter();
  const labels = getNutritionLabels(lang);
  const product = lookupNutrition(barcode);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-3xl items-center px-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {labels.header.backToAnalysis}
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nutrition data not available for this product.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {labels.header.backToAnalysis}
          </button>
          <h1 className="ml-4 text-sm font-semibold text-foreground">
            {labels.header.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl space-y-4 px-4 pt-5 sm:space-y-5 sm:px-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {labels.header.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {labels.header.subtitle}
          </p>
        </div>

        {/* Product header */}
        <NutritionProductHeader
          product={product}
          labels={labels.product}
        />

        {/* Nutrition Summary */}
        <NutritionSummary
          nutrition={product.nutrition}
          labels={labels.summary}
        />

        {/* Desktop: two-column layout */}
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-5">
          {/* Left column */}
          <div className="space-y-4 sm:space-y-5">
            <NutritionBreakdown
              nutrition={product.nutrition}
              labels={labels.breakdown}
            />

            <ServingInformation
              servingSize={product.servingSize}
              servingsPerContainer={product.servingsPerContainer}
              labels={labels.serving}
            />
          </div>

          {/* Right column */}
          <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5 lg:mt-0">
            <NutritionAttentionAreas
              areas={product.attentionAreas}
              labels={labels.attention}
            />

            <PositiveNutritionPoints
              points={product.positivePoints}
              labels={labels.positive}
            />

            <NutritionContext
              context={product.context}
              labels={labels.context}
            />
          </div>
        </div>

        {/* Full-width sections */}
        <NutritionDataQuality
          level={product.dataQuality}
          explanation={product.dataQualityExplanation}
          labels={labels.dataQuality}
        />

        <NutritionSource
          source={product.source}
          labels={labels.source}
        />

        <NutritionActions
          barcode={product.barcode}
          labels={labels.actions}
        />
      </main>
    </div>
  );
}
