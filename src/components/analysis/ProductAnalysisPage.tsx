"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { lookupAnalysisByBarcode } from "@/data/analysis-data";
import { getAnalysisLabels } from "@/data/analysis-labels";
import { ProductHeader } from "./ProductHeader";
import { AssessmentCard } from "./AssessmentCard";
import { PositivePoints } from "./PositivePoints";
import { AttentionPoints } from "./AttentionPoints";
import { IngredientAnalysisSection } from "./IngredientAnalysisSection";
import { NutritionAnalysis } from "./NutritionAnalysis";
import { EvidenceSources } from "./EvidenceSources";
import { AlternativeSuggestions } from "./AlternativeSuggestions";
import { Disclaimer } from "./Disclaimer";
import { AnalysisActions } from "./AnalysisActions";
import { AnalysisLoading } from "./AnalysisLoading";
import { AnalysisError } from "./AnalysisError";

type AnalysisPhase = "loading" | "result" | "error";

type ProductAnalysisPageProps = {
  barcode: string;
  lang?: string;
};

export function ProductAnalysisPage({
  barcode,
  lang = "en",
}: ProductAnalysisPageProps) {
  const labels = getAnalysisLabels(lang);
  const [phase, setPhase] = useState<AnalysisPhase>("loading");
  const mountedRef = useRef(true);

  const product = lookupAnalysisByBarcode(barcode);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setPhase(product ? "result" : "error");
      }
    }, labels.loading.stages.length * 1200);
    return () => clearTimeout(timer);
  }, [phase, product, labels.loading.stages.length]);

  const handleTryAgain = useCallback(() => {
    setPhase("loading");
  }, []);

  if (phase === "loading") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
            <Link
              href="/scan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {labels.header.backButton}
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
          <AnalysisLoading
            title={labels.loading.title}
            description={labels.loading.description}
            stages={labels.loading.stages}
          />
        </main>
      </div>
    );
  }

  if (phase === "error" || !product) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
            <Link
              href="/scan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {labels.header.backButton}
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
          <AnalysisError
            title={labels.error.title}
            description={labels.error.description}
            tryAgainLabel={labels.error.tryAgain}
            viewIngredientsLabel={labels.error.viewIngredients}
            onTryAgain={handleTryAgain}
            onViewIngredients={() => setPhase("result")}
          />
        </main>
      </div>
    );
  }

  const assessmentLabels: Record<string, { label: string; description: string }> = {
    low: { label: labels.assessment.low, description: labels.assessment.lowDescription },
    moderate: { label: labels.assessment.moderate, description: labels.assessment.moderateDescription },
    high: { label: labels.assessment.high, description: labels.assessment.highDescription },
    insufficient: { label: labels.assessment.insufficient, description: labels.assessment.insufficientDescription },
  };

  const assessmentData = assessmentLabels[product.assessment] ?? assessmentLabels.low;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link
            href="/scan"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {labels.header.backButton}
          </Link>
          <h1 className="ml-4 text-sm font-semibold text-foreground">
            {labels.header.title}
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full flex-1 px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* Left column — primary analysis */}
            <div className="flex flex-col gap-6">
              <ProductHeader
                name={product.name}
                brand={product.brand}
                category={product.category}
                barcode={product.barcode}
                scanDate={product.scanDate}
                imageUrl={product.imageUrl}
                backButton={labels.header.backButton}
                scanDateLabel={labels.header.scanDate}
              />
              <AssessmentCard
                level={product.assessment}
                label={assessmentData.label}
                description={assessmentData.description}
                score={product.score}
              />
              <PositivePoints
                title={labels.positive.title}
                points={product.positivePoints}
              />
              <AttentionPoints
                title={labels.attention.title}
                points={product.attentionPoints}
              />
            </div>

            {/* Right column — supporting information */}
            <div className="flex flex-col gap-6">
              {product.nutrition && (
                <NutritionAnalysis
                  title={labels.nutrition.title}
                  labels={{
                    calories: labels.nutrition.calories,
                    sugar: labels.nutrition.sugar,
                    sodium: labels.nutrition.sodium,
                    saturatedFat: labels.nutrition.saturatedFat,
                    protein: labels.nutrition.protein,
                    fibre: labels.nutrition.fibre,
                    servingSize: labels.nutrition.servingSize,
                  }}
                  nutrition={product.nutrition}
                  barcode={product.barcode}
                  viewDetailsLabel="View Nutrition Details"
                />
              )}
              <EvidenceSources
                title={labels.evidence.title}
                labels={{
                  sourceType: labels.evidence.sourceType,
                  summary: labels.evidence.summary,
                  viewSource: labels.evidence.viewSource,
                }}
                sources={product.evidenceSources}
              />
              <AlternativeSuggestions
                title={labels.alternatives.title}
                description={labels.alternatives.description}
                copyButton={labels.alternatives.copyButton}
                copiedLabel={labels.alternatives.copied}
                pasteNote={labels.alternatives.pasteNote}
                suggestions={product.alternativeSuggestions}
                ingredientList={product.ingredients.map((i) => i.name)}
              />
            </div>
          </div>

          {/* Full-width sections */}
          <div className="mt-6 flex flex-col gap-6">
            <IngredientAnalysisSection
              title={labels.ingredients.title}
              labels={{
                function: labels.ingredients.function,
                assessment: labels.ingredients.assessment,
                explanation: labels.ingredients.explanation,
                evidence: labels.ingredients.evidence,
                source: labels.ingredients.source,
                viewDetails: labels.ingredients.viewDetails,
              }}
              ingredients={product.ingredients}
              productBarcode={product.barcode}
            />
            <Disclaimer text={labels.disclaimer} />
            <AnalysisActions
              saveLabel={labels.actions.saveHistory}
              scanLabel={labels.actions.scanAnother}
              searchLabel={labels.actions.searchProducts}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
