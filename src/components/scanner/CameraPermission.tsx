"use client";


import { Camera, Upload } from "lucide-react";

type CameraPermissionProps = {
  title: string;
  description: string;
  allowLabel: string;
  uploadLabel: string;
  onAllow: () => void;
  onUpload: () => void;
};

export function CameraPermission({
  title,
  description,
  allowLabel,
  uploadLabel,
  onAllow,
  onUpload,
}: CameraPermissionProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Camera className="size-8 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{description}</p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={onAllow}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Camera className="size-4" aria-hidden="true" />
          {allowLabel}
        </button>
        <button
          type="button"
          onClick={onUpload}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Upload className="size-4" aria-hidden="true" />
          {uploadLabel}
        </button>
      </div>
    </div>
  );
}
