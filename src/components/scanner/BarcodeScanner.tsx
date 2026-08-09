"use client";

import { Zap } from "lucide-react";
import { ScannerViewport } from "./ScannerViewport";
import { ManualBarcodeInput } from "./ManualBarcodeInput";

type BarcodeScannerProps = {
  alignText: string;
  scanningText: string;
  simulateLabel: string;
  manualLabel: string;
  manualPlaceholder: string;
  searchLabel: string;
  isScanning: boolean;
  onSimulateScan: () => void;
  onManualSearch: (barcode: string) => void;
};

export function BarcodeScanner({
  alignText,
  scanningText,
  simulateLabel,
  manualLabel,
  manualPlaceholder,
  searchLabel,
  isScanning,
  onSimulateScan,
  onManualSearch,
}: BarcodeScannerProps) {
  const handleCapture = () => {
    onSimulateScan();
  };

  return (
    <div className="flex flex-col gap-5">
      <ScannerViewport
        alignText={alignText}
        scanningText={scanningText}
        isScanning={isScanning}
        showCamera={true}
        onCapture={handleCapture}
        captureLabel={simulateLabel}
      />
      <button
        type="button"
        onClick={onSimulateScan}
        disabled={isScanning}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      >
        <Zap className="size-4" aria-hidden="true" />
        {simulateLabel}
      </button>
      <div className="border-t border-border pt-5">
        <ManualBarcodeInput
          label={manualLabel}
          placeholder={manualPlaceholder}
          buttonLabel={searchLabel}
          onSubmit={onManualSearch}
        />
      </div>
    </div>
  );
}
