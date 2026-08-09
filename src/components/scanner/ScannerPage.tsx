"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";

import {
  lookupProductByBarcode,
  analyzeIngredientText,
} from "@/data/product-data";
import { getScannerLabels } from "@/data/scanner-labels";
import { ScanMethodSelector } from "./ScanMethodSelector";
import { BarcodeScanner } from "./BarcodeScanner";
import { IngredientScanner } from "./IngredientScanner";
import { CategorySelector } from "./CategorySelector";
import { ProductFoundCard } from "./ProductFoundCard";
import { ProductNotFound } from "./ProductNotFound";
import { ScanLoading } from "./ScanLoading";
import { ScanError } from "./ScanError";
import { ScanTips } from "./ScanTips";

type ScannerPhase =
  | "idle"
  | "permission"
  | "scanning"
  | "loading"
  | "product_found"
  | "product_not_found"
  | "error";

type ScannerPageProps = {
  lang?: string;
};

export function ScannerPage({ lang = "en" }: ScannerPageProps) {
  const labels = getScannerLabels(lang);
  const router = useRouter();

  const [activeMethod, setActiveMethod] = useState<"barcode" | "ingredients">(
    "barcode",
  );
  const [phase, setPhase] = useState<ScannerPhase>("idle");
  const [foundBarcode, setFoundBarcode] = useState<string | null>(null);
  const [showCategory, setShowCategory] = useState(false);
  const [pasteInput, setPasteInput] = useState<string | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const resetToIdle = useCallback(() => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = null;
    }
    setPhase("idle");
    setFoundBarcode(null);
    setShowCategory(false);
    setPasteInput(null);
  }, []);

  const handleSimulateScan = useCallback(() => {
    setPhase("scanning");
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      setPhase("loading");
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = setTimeout(() => {
        const barcodes = ["8901234567890", "8901234567891", "8901234567892"];
        const randomBarcode =
          barcodes[Math.floor(Math.random() * barcodes.length)];
        const product = lookupProductByBarcode(randomBarcode);
        if (product) {
          setFoundBarcode(randomBarcode);
          setPhase("product_found");
        } else {
          setPhase("product_not_found");
        }
      }, 1500);
    }, 2000);
  }, []);

  const handleManualBarcodeSearch = useCallback((barcode: string) => {
    setPhase("loading");
    setTimeout(() => {
      const product = lookupProductByBarcode(barcode);
      if (product) {
        setFoundBarcode(barcode);
        setPhase("product_found");
      } else {
        setPhase("product_not_found");
      }
    }, 1200);
  }, []);

  const handleIngredientAnalyze = useCallback(
    (text: string) => {
      setPasteInput(text);
      setPhase("loading");
      setTimeout(() => {
        setPhase("product_found");
      }, 1500);
    },
    [],
  );

  const handleCategorySelect = useCallback(
    () => {
      setShowCategory(false);
      setPhase("loading");
      setTimeout(() => {
        setPhase("product_found");
      }, 1500);
    },
    [],
  );

  const handleAnalyze = useCallback(
    (barcode: string) => {
      router.push(`/analysis?barcode=${encodeURIComponent(barcode)}`);
    },
    [router],
  );

  const renderPhaseContent = () => {
    switch (phase) {
      case "scanning":
      case "idle":
        return activeMethod === "barcode" ? (
          <div className="flex flex-col gap-5">
            <BarcodeScanner
              alignText={labels.barcode.viewport.alignBarcode}
              scanningText={labels.barcode.viewport.scanningForProduct}
              simulateLabel={labels.barcode.viewport.simulateScan}
              manualLabel={labels.barcode.manual.title}
              manualPlaceholder={labels.barcode.manual.inputPlaceholder}
              searchLabel={labels.barcode.manual.searchButton}
              isScanning={phase === "scanning"}
              onSimulateScan={handleSimulateScan}
              onManualSearch={handleManualBarcodeSearch}
            />
            <ScanTips title={labels.tips.title} items={labels.tips.items} />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <IngredientScanner
              cameraTitle={labels.ingredient.camera.title}
              cameraDescription={labels.ingredient.camera.description}
              takePhotoLabel={labels.ingredient.camera.takePhoto}
              uploadLabel={labels.ingredient.camera.uploadImage}
              pasteLabel={labels.ingredient.paste.title}
              pastePlaceholder={labels.ingredient.paste.inputPlaceholder}
              analyzeLabel={labels.ingredient.paste.analyzeButton}
              onAnalyze={handleIngredientAnalyze}
            />
            <ScanTips title={labels.tips.title} items={labels.tips.items} />
          </div>
        );

      case "loading":
        return (
          <ScanLoading
            message={
              activeMethod === "barcode"
                ? labels.loading.identifying
                : labels.loading.analyzing
            }
          />
        );

      case "error":
        return (
          <ScanError
            title={labels.error.title}
            description={labels.error.description}
            tryAgainLabel={labels.error.tryAgain}
            enterManuallyLabel={labels.error.enterManually}
            onTryAgain={resetToIdle}
            onEnterManually={() => {
              resetToIdle();
              setActiveMethod("barcode");
            }}
          />
        );

      case "product_found":
        if (pasteInput) {
          const product = analyzeIngredientText(pasteInput);
          return (
            <div className="flex flex-col gap-5">
              <ProductFoundCard
                product={product}
                title={labels.barcode.productFound.title}
                analyzeButton={labels.barcode.productFound.analyzeButton}
                scanAgainButton={labels.barcode.productFound.scanAgain}
                onAnalyze={handleAnalyze}
                onScanAgain={resetToIdle}
              />
              <ScanTips title={labels.tips.title} items={labels.tips.items} />
            </div>
          );
        }
        if (foundBarcode) {
          const product = lookupProductByBarcode(foundBarcode);
          if (product) {
            return (
              <div className="flex flex-col gap-5">
                <ProductFoundCard
                  product={product}
                  title={labels.barcode.productFound.title}
                  analyzeButton={labels.barcode.productFound.analyzeButton}
                  scanAgainButton={labels.barcode.productFound.scanAgain}
                  onAnalyze={handleAnalyze}
                  onScanAgain={resetToIdle}
                />
                <ScanTips title={labels.tips.title} items={labels.tips.items} />
              </div>
            );
          }
        }
        return (
          <div className="flex flex-col gap-5">
            <ProductNotFound
              title={labels.barcode.notFound.title}
              description={labels.barcode.notFound.description}
              scanIngredientLabel={labels.barcode.notFound.scanIngredient}
              enterManuallyLabel={labels.barcode.notFound.enterManually}
              tryAnotherLabel={labels.barcode.notFound.tryAnother}
              onScanIngredient={() => {
                resetToIdle();
                setActiveMethod("ingredients");
              }}
              onEnterManually={() => setPhase("idle")}
              onTryAnother={resetToIdle}
            />
            <ScanTips title={labels.tips.title} items={labels.tips.items} />
          </div>
        );

      case "product_not_found":
        return (
          <div className="flex flex-col gap-5">
            <ProductNotFound
              title={labels.barcode.notFound.title}
              description={labels.barcode.notFound.description}
              scanIngredientLabel={labels.barcode.notFound.scanIngredient}
              enterManuallyLabel={labels.barcode.notFound.enterManually}
              tryAnotherLabel={labels.barcode.notFound.tryAnother}
              onScanIngredient={() => {
                resetToIdle();
                setActiveMethod("ingredients");
              }}
              onEnterManually={() => setPhase("idle")}
              onTryAnother={resetToIdle}
            />
            {showCategory && (
              <CategorySelector
                title={labels.category.title}
                description={labels.category.description}
                categories={{
                  food: labels.category.food,
                  cosmetics: labels.category.cosmetics,
                  personalCare: labels.category.personalCare,
                  household: labels.category.household,
                  other: labels.category.other,
                }}
                onSelect={handleCategorySelect}
              />
            )}
            <ScanTips title={labels.tips.title} items={labels.tips.items} />
          </div>
        );

      default:
        return null;
    }
  };

  const showMethodSelector =
    phase === "idle" || phase === "scanning" || phase === "error";

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {labels.header.backButton}
          </Link>
          <h1 className="text-sm font-semibold text-foreground">
            {labels.header.title}
          </h1>
          <Link
            href="/history"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <History className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{labels.header.historyButton}</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <p className="mb-5 text-center text-sm text-muted-foreground">
          {labels.header.subtitle}
        </p>
        {showMethodSelector && (
          <div className="mb-5">
            <ScanMethodSelector
              barcodeLabel={labels.tabs.barcode}
              ingredientsLabel={labels.tabs.ingredients}
              activeMethod={activeMethod}
              onMethodChange={(m) => {
                resetToIdle();
                setActiveMethod(m);
              }}
            />
          </div>
        )}
        {renderPhaseContent()}
      </main>
    </div>
  );
}
