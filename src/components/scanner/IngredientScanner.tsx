"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Clipboard, X } from "lucide-react";
import { ScannerViewport } from "./ScannerViewport";

type IngredientScannerProps = {
  cameraTitle: string;
  cameraDescription: string;
  takePhotoLabel: string;
  uploadLabel: string;
  pasteLabel: string;
  pastePlaceholder: string;
  analyzeLabel: string;
  onAnalyze: (text: string) => void;
};

export function IngredientScanner({
  cameraTitle,
  cameraDescription,
  takePhotoLabel,
  uploadLabel,
  pasteLabel,
  pastePlaceholder,
  analyzeLabel,
  onAnalyze,
}: IngredientScannerProps) {
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = useCallback((imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setShowCamera(true);
  }, []);

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        setCapturedImage(result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  const handleTakePhoto = useCallback(() => {
    setCapturedImage(null);
    setShowCamera(true);
  }, []);

  const handleAnalyze = () => {
    const trimmed = pasteText.trim();
    if (trimmed) {
      onAnalyze(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showCamera && !capturedImage && (
        <div className="flex flex-col gap-4">
          <ScannerViewport
            alignText={cameraDescription}
            scanningText="Capturing..."
            isScanning={false}
            showCamera={true}
            onCapture={handleCapture}
            captureLabel={takePhotoLabel}
          />
          <button
            type="button"
            onClick={() => setShowCamera(false)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-4" aria-hidden="true" />
            Cancel
          </button>
        </div>
      )}

      {capturedImage && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative rounded-xl overflow-hidden bg-black">
            <img
              src={capturedImage}
              alt="Captured ingredient label"
              className="w-full h-auto max-h-80 object-contain"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Camera className="size-4" aria-hidden="true" />
              Retake
            </button>
            <button
              type="button"
              onClick={() => {
                setCapturedImage(null);
                setShowPaste(true);
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Use This Image
            </button>
          </div>
        </div>
      )}

      {!showCamera && !capturedImage && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-base font-semibold text-foreground">{cameraTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">{cameraDescription}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleTakePhoto}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Camera className="size-4" aria-hidden="true" />
              {takePhotoLabel}
            </button>
            <button
              type="button"
              onClick={handleFileUpload}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Upload className="size-4" aria-hidden="true" />
              {uploadLabel}
            </button>
          </div>
        </div>
      )}

      {!showCamera && !capturedImage && (
        <button
          type="button"
          onClick={() => setShowPaste(!showPaste)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Clipboard className="size-4" aria-hidden="true" />
          {pasteLabel}
        </button>
      )}

      {showPaste && (
        <div className="flex flex-col gap-3">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={pastePlaceholder}
            rows={6}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          />
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!pasteText.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {analyzeLabel}
          </button>
        </div>
      )}
    </div>
  );
}
